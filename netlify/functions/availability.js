import { getStore } from "@netlify/blobs";
import webpush from "web-push";

const ADMIN_KEY = process.env.ADMIN_KEY;
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails("mailto:admin@nsrcearlybirds.app", VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function slug(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (Math.imul(31, h) + str.charCodeAt(i)) | 0; }
  return (h >>> 0).toString(36);
}

async function notifySubscribers(store, bodyText) {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.log("notifySubscribers: VAPID keys not configured, skipping.");
    return;
  }
  const { blobs } = await store.list({ prefix: "push-sub:" });
  console.log(`notifySubscribers: found ${blobs.length} subscription(s).`);
  if (blobs.length === 0) return;
  const payload = JSON.stringify({ title: "NSRC Early Birds", body: bodyText });
  await Promise.all(blobs.map(async (b) => {
    const sub = await store.get(b.key, { type: "json" });
    if (!sub) return;
    try {
      await webpush.sendNotification(sub, payload);
      console.log(`notifySubscribers: sent to ${b.key}`);
    } catch (err) {
      console.log(`notifySubscribers: failed for ${b.key} — ${err && err.statusCode} ${err && err.message}`);
      // Stale/expired subscription (device unsubscribed, browser data cleared, etc.) — clean it up.
      if (err && (err.statusCode === 404 || err.statusCode === 410)) {
        await store.delete(b.key);
      }
      // Any other error: don't fail the save just because a push notification failed.
    }
  }));
}

const DEFAULT_PLAYERS = ["Alex", "Billy", "Bob", "Greg", "Igal", "Joe", "Lewis", "Peter"];

async function getPlayers(store) {
  const players = await store.get("players", { type: "json" });
  if (players) return players;
  await store.setJSON("players", DEFAULT_PLAYERS);
  return DEFAULT_PLAYERS;
}

export default async (req, context) => {
  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  const week = url.searchParams.get("week");
  const weekExemptActions = ["subscribe", "addPlayer", "removePlayer"];
  if (!week && !weekExemptActions.includes(action)) return json({ error: "missing week" }, 400);

  const store = getStore({ name: "tennis-availability", consistency: "strong" });

  if (action === "subscribe") {
    const key = url.searchParams.get("key");
    if (!ADMIN_KEY || key !== ADMIN_KEY) return json({ error: "unauthorized" }, 403);
    const subJson = url.searchParams.get("subscription");
    if (!subJson) return json({ error: "missing subscription" }, 400);
    let sub;
    try { sub = JSON.parse(subJson); } catch (e) { return json({ error: "invalid subscription" }, 400); }
    if (!sub.endpoint) return json({ error: "invalid subscription" }, 400);
    await store.setJSON(`push-sub:${hashString(sub.endpoint)}`, sub);
    return json({ ok: true });
  }

  if (action === "list") {
    const { blobs } = await store.list({ prefix: `resp:${week}:` });
    const responses = [];
    for (const b of blobs) {
      const val = await store.get(b.key, { type: "json" });
      if (val) responses.push(val);
    }
    responses.sort((a, b) => a.name.localeCompare(b.name));
    const closedDays = (await store.get(`closed:${week}`, { type: "json" })) || [];
    const actualResults = (await store.get(`actual:${week}`, { type: "json" })) || {};
    const players = await getPlayers(store);
    return json({ responses, closedDays, actualResults, players });
  }

  if (action === "save") {
    const name = (url.searchParams.get("name") || "").trim();
    if (!name) return json({ error: "missing name" }, 400);
    const daysParam = url.searchParams.get("days") || "";
    const out = url.searchParams.get("out") === "true";
    const maxstreak = url.searchParams.get("maxstreak");
    const maxweekly = url.searchParams.get("maxweekly");
    const respKey = `resp:${week}:${slug(name)}`;
    const previous = await store.get(respKey, { type: "json" });
    const value = {
      name,
      days: daysParam ? daysParam.split(",").filter(Boolean).map(Number) : [],
      note: (url.searchParams.get("note") || "").trim(),
      out,
      maxstreak: maxstreak ? Number(maxstreak) : null,
      maxweekly: maxweekly ? Number(maxweekly) : null,
      ts: Date.now()
    };
    await store.setJSON(respKey, value);

    let message = `${name} updated their availability for the week of ${week}.`;
    if (previous) {
      const justWentOut = !previous.out && value.out;
      const droppedDays = (previous.days || []).filter((d) => !value.days.includes(d));
      if (justWentOut) {
        message = `${name} just went OUT for the week — the lineup will auto-adjust who's playing.`;
      } else if (!value.out && droppedDays.length > 0) {
        message = `${name} dropped some previously-marked days — check if the lineup shifted.`;
      }
    }
    context.waitUntil(notifySubscribers(store, message));
    return json({ ok: true });
  }

  if (action === "clear") {
    const key = url.searchParams.get("key");
    if (!ADMIN_KEY || key !== ADMIN_KEY) return json({ error: "unauthorized" }, 403);
    const { blobs } = await store.list({ prefix: `resp:${week}:` });
    await Promise.all(blobs.map((b) => store.delete(b.key)));
    return json({ ok: true });
  }

  if (action === "setClosed") {
    const key = url.searchParams.get("key");
    if (!ADMIN_KEY || key !== ADMIN_KEY) return json({ error: "unauthorized" }, 403);
    const closedParam = url.searchParams.get("closedDays") || "";
    const closedDays = closedParam ? closedParam.split(",").filter((x) => x !== "").map(Number) : [];
    await store.setJSON(`closed:${week}`, closedDays);
    return json({ ok: true });
  }

  if (action === "setActual") {
    const key = url.searchParams.get("key");
    if (!ADMIN_KEY || key !== ADMIN_KEY) return json({ error: "unauthorized" }, 403);
    const dayIdx = url.searchParams.get("dayIdx");
    if (dayIdx === null) return json({ error: "missing dayIdx" }, 400);
    const playersParam = url.searchParams.get("players");
    const current = (await store.get(`actual:${week}`, { type: "json" })) || {};
    if (playersParam === null || playersParam === "") {
      delete current[dayIdx];
    } else {
      current[dayIdx] = playersParam.split(",").filter(Boolean);
    }
    await store.setJSON(`actual:${week}`, current);
    return json({ ok: true });
  }

  if (action === "addPlayer") {
    const key = url.searchParams.get("key");
    if (!ADMIN_KEY || key !== ADMIN_KEY) return json({ error: "unauthorized" }, 403);
    const name = (url.searchParams.get("name") || "").trim();
    if (!name) return json({ error: "missing name" }, 400);
    const players = await getPlayers(store);
    if (!players.some((p) => p.toLowerCase() === name.toLowerCase())) {
      players.push(name);
      await store.setJSON("players", players);
    }
    return json({ ok: true, players });
  }

  if (action === "removePlayer") {
    const key = url.searchParams.get("key");
    if (!ADMIN_KEY || key !== ADMIN_KEY) return json({ error: "unauthorized" }, 403);
    const name = url.searchParams.get("name") || "";
    const players = (await getPlayers(store)).filter((p) => p !== name);
    await store.setJSON("players", players);
    return json({ ok: true, players });
  }

  return json({ error: "unknown action" }, 400);
};

export const config = { path: "/api/availability" };

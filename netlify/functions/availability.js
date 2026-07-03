import { getStore } from "@netlify/blobs";

const ADMIN_KEY = process.env.ADMIN_KEY;

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function slug(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default async (req) => {
  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  const week = url.searchParams.get("week");
  if (!week) return json({ error: "missing week" }, 400);

  const store = getStore({ name: "tennis-availability", consistency: "strong" });

  if (action === "list") {
    const { blobs } = await store.list({ prefix: `resp:${week}:` });
    const responses = [];
    for (const b of blobs) {
      const val = await store.get(b.key, { type: "json" });
      if (val) responses.push(val);
    }
    responses.sort((a, b) => a.name.localeCompare(b.name));
    const closedDays = (await store.get(`closed:${week}`, { type: "json" })) || [];
    return json({ responses, closedDays });
  }

  if (action === "save") {
    const name = (url.searchParams.get("name") || "").trim();
    if (!name) return json({ error: "missing name" }, 400);
    const daysParam = url.searchParams.get("days") || "";
    const out = url.searchParams.get("out") === "true";
    const maxstreak = url.searchParams.get("maxstreak");
    const maxweekly = url.searchParams.get("maxweekly");
    const value = {
      name,
      days: daysParam ? daysParam.split(",").filter(Boolean).map(Number) : [],
      note: (url.searchParams.get("note") || "").trim(),
      out,
      maxstreak: maxstreak ? Number(maxstreak) : null,
      maxweekly: maxweekly ? Number(maxweekly) : null,
      ts: Date.now()
    };
    await store.setJSON(`resp:${week}:${slug(name)}`, value);
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

  return json({ error: "unknown action" }, 400);
};

export const config = { path: "/api/availability" };

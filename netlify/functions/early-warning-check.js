import { getStore } from "@netlify/blobs";
import webpush from "web-push";

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails("mailto:admin@nsrcearlybirds.app", VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

async function notifySubscribers(store, bodyText) {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return;
  const { blobs } = await store.list({ prefix: "push-sub:" });
  if (blobs.length === 0) return;
  const payload = JSON.stringify({ title: "NSRC Early Birds", body: bodyText });
  await Promise.all(blobs.map(async (b) => {
    const sub = await store.get(b.key, { type: "json" });
    if (!sub) return;
    try {
      await webpush.sendNotification(sub, payload);
    } catch (err) {
      if (err && (err.statusCode === 404 || err.statusCode === 410)) {
        await store.delete(b.key);
      }
    }
  }));
}

function getWeekStartFor(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const daysSinceSaturday = (d.getDay() + 1) % 7; // Sat=0 ... Fri=6
  d.setDate(d.getDate() - daysSinceSaturday);
  return d;
}

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DEFAULT_CONFIG = { enabled: true, dayOfWeek: 0, hour: 17, timezone: "America/New_York" }; // Sunday 5pm

function getLocalDayAndHour(date, timeZone) {
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", hour: "numeric", hour12: false });
  const parts = fmt.formatToParts(date);
  const weekdayStr = parts.find((p) => p.type === "weekday").value;
  let hour = parseInt(parts.find((p) => p.type === "hour").value, 10);
  if (hour === 24) hour = 0;
  const dowMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { dayOfWeek: dowMap[weekdayStr], hour };
}

export default async () => {
  const store = getStore({ name: "tennis-availability", consistency: "strong" });

  const cfg = { ...DEFAULT_CONFIG, ...((await store.get("earlyWarningConfig", { type: "json" })) || {}) };
  if (!cfg.enabled) return new Response("disabled");

  const now = new Date();
  const local = getLocalDayAndHour(now, cfg.timezone || DEFAULT_CONFIG.timezone);
  if (local.dayOfWeek !== cfg.dayOfWeek || local.hour !== cfg.hour) {
    return new Response("not the configured time");
  }

  const today = now;
  const weekStart = getWeekStartFor(today);
  const weekKey = isoDate(weekStart);

  // Belt-and-suspenders: even if this hour matches and somehow runs twice,
  // don't send the same week's alerts more than once per day slot.
  const runKey = `earlywarning:ran:${weekKey}:${local.dayOfWeek}:${local.hour}`;
  if (await store.get(runKey, { type: "json" })) return new Response("already ran this slot");
  await store.setJSON(runKey, true);

  const { blobs } = await store.list({ prefix: `resp:${weekKey}:` });
  const responses = [];
  for (const b of blobs) {
    const val = await store.get(b.key, { type: "json" });
    if (val) responses.push(val);
  }
  const closedDays = (await store.get(`closed:${weekKey}`, { type: "json" })) || [];

  const todayDateOnly = new Date(today);
  todayDateOnly.setHours(0, 0, 0, 0);

  for (let idx = 0; idx <= 4; idx++) {
    if (closedDays.includes(idx)) continue;

    const dayDate = new Date(weekStart);
    dayDate.setDate(weekStart.getDate() + idx + 2); // Monday = +2 ... Friday = +6
    const dayDateOnly = new Date(dayDate);
    dayDateOnly.setHours(0, 0, 0, 0);

    // Only warn about days that haven't happened yet — no point warning
    // about today or the past.
    if (dayDateOnly.getTime() <= todayDateOnly.getTime()) continue;

    // Raw headcount only — this deliberately doesn't replicate the caps/
    // fairness logic the live scheduler uses, to keep this simple and low-risk.
    const available = responses.filter((r) => !r.out && r.days.includes(idx));
    if (available.length >= 4) continue;

    // Only warn once per day per week, even if the configured slot somehow triggers more than once.
    const warnKey = `warned:${weekKey}:${idx}`;
    const alreadyWarned = await store.get(warnKey, { type: "json" });
    if (alreadyWarned) continue;

    const dayLabel = `${DOW[dayDate.getDay()]} ${dayDate.getMonth() + 1}/${dayDate.getDate()}`;
    const names = available.map((r) => r.name).join(", ") || "nobody yet";
    await notifySubscribers(
      store,
      `Heads up: ${dayLabel} only has ${available.length} signed up so far (${names}) — needs 4.`
    );
    await store.setJSON(warnKey, true);
  }

  return new Response("ok");
};

// Runs every hour; the function itself decides whether it's actually the
// configured alert time before doing anything else. This lets the day/hour
// be changed from the admin panel without needing a redeploy.
export const config = { schedule: "0 * * * *" };

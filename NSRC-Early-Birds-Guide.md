# NSRC Early Birds — Feature Guide

A quick reference for everyone in the group, plus a separate section for the admin.

---

## For Players

### Getting started
- Open the link and pick your name from the dropdown at the top.
- The app remembers your name on your device after your first save — it'll pre-fill next time you open it.
- If you've already submitted something for the current week, selecting your name automatically loads what you entered so you can review or change it.
- **Filling in for someone one-off?** Pick **"+ Add a substitute"** at the bottom of the name dropdown instead, and type their name. They won't be added to the permanent roster, but once they've submitted, their name reappears in the dropdown (labeled "(sub)") for the rest of that week so they — or an admin on their behalf — can go back and change it. It resets to just "+ Add a substitute" again the following week.
- **Subs only fill actual gaps.** A sub is never scheduled ahead of a core player who's available and eligible that day — the fairness rotation only reaches into the sub pool when the core players available that day can't fill all 4 spots on their own. If core players alone already cover the day, a sub who signed up just shows up as an alternate instead of playing.

### Setting your availability
- Tap the days you're free (Monday–Friday only — no weekend play).
- A new week opens up starting each **Saturday**, for the following Monday–Friday. The board automatically resets itself every Saturday — nobody has to do anything to "start" a new week.
- **Notes (optional):** free text for anything not covered elsewhere — "only after 6pm," "can sub last minute," etc. This is just informational; nothing reads or acts on it automatically.

### Setting limits on yourself
- **Max days in a row (optional):** e.g. enter `1` if you never want to play two consecutive days. This is a hard limit — the app will never schedule you past it, even if that means a day comes up short of 4 players.
- **Max days to play this week (optional):** caps your total games for the week, even if you marked more days as available. Also a hard limit, same reasoning.
- Leave either blank for no limit.

### If you're out for the week
- Tap **"I'm out this week"** instead of leaving your days blank — it's clearer than an empty response, since it shows on the board as a distinct "OUT" tag next to your name rather than looking like you just haven't responded yet.

### Reading the board
- **Scoreboard table:** shows everyone's marked days at a glance.
- **Once you've picked your name**, it's highlighted throughout the board — your row in the scoreboard, and your name wherever it appears in the lineup below — so you can spot "am I actually playing this week?" at a glance without reading every line. This is layered on top of the shared view, not a replacement for it — everyone still sees the same full board regardless of whose name is selected.
- **IN / OUT stamp per day:** whether that day has 4 confirmed players.
- **"This week's lineup":** the actual day-by-day plan — who's playing, who's sitting out, and the start time for each day. Once a day's match is over — the same 9am cutoff used everywhere else in the app, including today — it automatically collapses into a small dimmed "Earlier this week" summary at the bottom, so the panel always leads with what's actually still ahead.
  - Start time is **6:30am**, except **6:15am** on any day Igal is playing. Always wraps up by **7:45am**.
  - A **"✓ confirmed"** tag means the admin has recorded the real outcome for that day — that's ground truth, not a projection.
  - If a day shows fewer than 4 despite people being available, it means someone's stated limit would've been broken to fill it — the app won't do that, so the day may run short instead.
- **"Still waiting on..."** banner at the top tells you who hasn't responded yet.

### Useful extras
- **"+ Calendar"** next to any confirmed day downloads a calendar invite for it.
- **Indoor comfort estimate** shows under each day in "This week's lineup" — pulled from the outdoor forecast for the club's address at both the start (~6am) and finish (~8am) of the session, showing how conditions shift across the match. Translated into a rough heat/humidity expectation, since conditions inside tend to track the outdoor weather closely. Always labeled "(estimate)" since it's based on outdoor conditions, not an actual indoor reading — think of it as a heads-up, not a guarantee.
- **"Suggested teams"** shows under each confirmed day's lineup — a default doubles pairing (Alex & Lewis play together whenever both are in that day's four; otherwise pairing is decided automatically and stays consistent). It's a starting suggestion, not locked in — swap on the court if you'd rather play differently that day.
- **"Copy lineup to clipboard"** grabs the whole week's confirmed days (including suggested pairings) as plain text, ready to paste into the group chat.
- **Add to Home Screen:** on iPhone, tap the Share icon in Safari → Add to Home Screen, for a proper app icon instead of a bookmark.
- The board **auto-refreshes** every 45 seconds while you're looking at it, so you don't need to manually reload to see new responses come in.

### How fairness works (so "why did I get bumped?" makes sense)
- If more than 4 people want to play a day, priority goes to whoever's played **fewer days so far that week**.
- If that's still tied, priority goes to whoever has **fewer remaining chances to play this week** — how that's measured depends on the admin's chosen rotation mode (see the admin section below), but the idea either way is the same: someone with limited options gets priority over someone who's still flexible, since the flexible player has other chances to get picked and the constrained player doesn't.
- If it's still a genuine tie after that, the app uses a well-mixed, date-seeded shuffle to decide — not alphabetical, and not the same people favored every week.
- Nothing carries over between weeks — every week starts even.

### Season Stats
A small **"📊 Season Stats"** link sits at the bottom of the main page, visible to everyone. It shows, per person:
- Games played this season (since June 1)
- Cost per game so far, based on that person's actual season payment (defaults to $795 unless the admin set something different for them)
- How that compares to paying the $20/day drop-in rate — positive means their payment has already paid for itself vs. paying per visit
- Progress toward their personal break-even point (varies by person if their payment differs from the $795 default)

**Games by day of week.** Below the main table, a second table breaks down each person's real recorded games by weekday (Mon–Fri), with a **Spread** column (that person's busiest day minus their quietest day) so it's easy to see at a glance whether anyone's games are still clustering on particular days rather than spreading out across the week. Only shows players with at least one recorded game this season. This one only counts real recorded weeks — it doesn't include the pre-tracking estimated baseline the main table uses, since there's no way to know which specific days someone played before tracking existed.

**Resets automatically each June 1** — no action needed. The page always figures out "this season" based on today's date, so it naturally rolls over to the new season the moment the calendar hits June, and correctly stays anchored to the *previous* June's season all the way through the following May.

**Past seasons stay viewable.** Small ← / → links at the top let you step back to any previous season (as far back as real data exists) or forward again — nothing is ever lost once a new season starts. Both tables — totals and the day-of-week breakdown — move together when you step through seasons.

**Roster changes are handled correctly per season.** If someone's removed from the group, their real recorded games still show up for any season they actually played in — they just won't get the pre-tracking estimate for that season anymore, since there's no way to know how long they were around before tracking began. If someone's newly added, they only get credit for weeks they actually appear in — never a phantom estimate for a past season before they joined.

**No look-ahead credit.** Being scheduled for a day that hasn't happened yet doesn't count toward your total. A day only counts once it's actually in the past — or, for today specifically, once it's past 9am (matches start time, so by then the match is either underway or decided). The one exception: if the admin has already recorded that day's actual result, it counts immediately regardless of timing — admin confirmation always overrides the cutoff, and any later correction to it updates the stats the next time the page loads, automatically.

**No manual entry required, ever, for the games themselves.** For weeks before detailed tracking was in place, games are estimated at 2.5/week (scaled down for anyone paying for fewer than 12 months). For every week since, it's calculated automatically from the actual recorded lineups already generated by normal weekly use — nobody needs to log attendance separately. Payment amounts and months are the one thing that do need a one-time setup per person (see "Manage payments" above) if they differ from the $795 / 12-month default.

### Demand Patterns
A small **"📈 Demand Patterns"** link sits next to Season Stats, also visible to everyone. It shows, for each weekday (Monday–Friday) across the season: the average number of people who sign up, what percent of weeks that day is oversubscribed (more than 4 — someone has to sit out) versus short (fewer than 4 — the day was at risk). Useful for spotting which days consistently run tight, e.g. if you're ever weighing whether a second court day is worth pursuing. Entirely derived from existing weekly sign-ups — nothing new to enter, and it looks at raw headcount rather than the fairness-adjusted lineup.

### Early Warning Alerts
If admin push notifications are enabled, you'll now also get an automatic heads-up if an upcoming day in the current week has fewer than 4 people signed up. **Timing is configurable** — in the admin panel, under "Early warning alert timing," pick a day and hour (defaults to Sunday 5pm) and hit Save. No redeploy needed to change it; the check runs quietly every hour in the background and only actually does anything during the hour you've configured. Each day only triggers one alert per week (it won't repeat-notify you about the same shortfall every time it checks), giving you time to nudge people before it's too late to fill the day. This uses raw sign-up counts, the same simple measure as Demand Patterns — not the full fairness/caps logic — so it's possible (though unlikely) for a day to still come up short for reasons this alert doesn't catch, like too many people hitting their personal limits.

---

## For the Admin

### Getting into admin mode
- Your private link looks like `[site]/?admin=yourcode`.
- On a phone home-screen icon (no address bar available there), tap the small **"Admin"** link at the very bottom of the page and enter your code once — the device remembers it after that.
- If the code ever changes, or you mistype it, tap **"Re-enter admin code"** (same spot, relabels itself once you're already in admin mode) to fix it — no need to remove and re-add the home screen icon.

### The Admin tools panel
Collapsed by default to keep the page clean — tap the **"▸ show"** next to "Admin tools" to expand it, "▾ hide" to tuck it away again. It remembers whichever state you leave it in.

Inside, you'll find:

**Manage players**
- Add someone new by typing their name and tapping **Add** — they'll immediately appear in everyone's name dropdown, no code changes or redeploying needed.
- Remove someone with the **×** next to their name. Their past responses stay on record (nothing gets deleted), they just stop appearing as a selectable name going forward.

**Manage payments**
- Every player defaults to $795 / 12 months. Only edit the fields for people whose actual payment differs — you don't need to touch anyone who's on the standard rate.
- One **"Save payments"** button saves everyone's fields at once, not per-row.
- Both fields feed into Season Stats: the dollar amount drives cost-per-game and break-even, and months paid scales down the pre-tracking games estimate for anyone who didn't play the full season (e.g. skipped summer) — someone on 9 months gets a proportionally lower early-season estimate than someone on the full 12.
- **Payments are tracked per season**, not as one global number. Editing payments always edits the *current* season — past seasons keep whatever was set for them at the time, and a new season starts fresh at the $795/12 default until you set exceptions for it.

**Notifications**
- **"Enable notifications on this device"** — turns on push alerts any time someone saves or updates their availability. Works on your phone (via the home-screen icon) and desktop browsers. Every device you want alerts on needs this tapped separately.
- Updates now say exactly what changed — e.g. "Bob updated: removed Tue 7/21, added Fri 7/24" or "Alex updated: going OUT for the week" — rather than a generic "updated" message. A first-time submission for the week just says who submitted.

**Setting up notifications on iPhone (Safari)**
If you tap "Enable notifications" and see *"notifications not supported on this device,"* it's because iOS only allows push notifications for the home-screen-installed version of a site — never a regular Safari tab, and never any browser other than Safari. Fix it with these steps, in order:
1. Open the site in **Safari** (not Chrome, not any other browser)
2. Tap the **Share icon** (square with an arrow pointing up)
3. Scroll down and tap **Add to Home Screen** → **Add**
4. **Fully close Safari**, then open the app from its new icon on your home screen — not from a Safari tab or bookmark
5. From the admin panel, tap **"Enable notifications on this device"** and allow the permission prompt

This has to be done once per device/person — sharing the admin link with a co-admin doesn't automatically give their phone notifications; they need to go through these same steps themselves.

**Rotation algorithm**
- A **"Rotation algorithm"** dropdown lets you pick between **Balanced** (default) and **Classic** — this is the tiebreak used in "How fairness works" above, for the second round when players are tied on games-played-so-far.
- **Balanced** looks at each person's *remaining* available days from today onward, which defers people who are free later in the week too — so flexible players' games spread out across Mon–Fri instead of clustering into the first days the app fills.
- **Classic** looks at each person's *total* available days for the whole week — the original behavior, which can front-load flexible players into early days.
- Saved server-side and applies immediately for everyone, not just your device.
- Days already recorded via "Mark who actually played a day" are never recalculated regardless of which mode is active — that data is ground truth either way.

**Auto-promotion is automatic — no admin action needed**
- If a confirmed player later marks themselves out (or removes that day), the board recalculates from scratch every time it loads — so the next-fairest alternate is already seamlessly slotted in on its own. You don't need to do anything to make that happen; the notification above is just there so you notice it occurred.

**Mark club-closed days**
- Select any day(s) the club itself is closed. That day is fully excluded from scheduling — no lineup gets built for it, and it doesn't count against anyone's weekly limit or streak.

**Mark who actually played a day**
- This is the important one: pick a day, check off who *really* played (which can differ from what the app projected — no-shows, subs, etc.), and save.
- Once marked, that becomes ground truth. Every later day's math (streaks, weekly counts) is calculated from what actually happened, not a re-guessed projection.
- **"Clear recorded result"** reverts a day back to normal projection if you need to undo it.

**Clear all responses for this week**
- Wipes everyone's submissions for the current week. Used for starting over, not something you'll need often since the board already resets automatically each Saturday.

---

### Personal Snapshot
Once you pick your name, a small card appears showing your next confirmed day this week, along with its start time (6:15am if Igal's playing that day, 6:30am otherwise — same rule as the rest of the app). "Next" uses the same 9am same-day cutoff as the rest of the app — if you're playing both today and tomorrow, it shows today until 9am, then switches to tomorrow, since by then today's match is considered done. Loads instantly — no season data needed for this one.

### Shareable Weekly Graphic
Next to "Copy lineup to clipboard," a **"📸 Share weekly graphic"** button generates a nicely formatted image of the week — every day, who's playing, suggested teams, and weather. On phones, this opens your device's native share sheet directly — pick Messages or your group text and it's attached in a couple taps, no downloading or hunting through Photos first. On desktop browsers that don't support that, it just downloads the image instead. Nothing gets sent automatically; it's always something you choose to share.

## A couple of things worth knowing
- The little version number under the header (e.g. `v4.11`) helps us confirm you're looking at the latest deployed version if something ever seems off — Season Stats has its own separate version number in the same spot.
- If a feature seems to be behaving unexpectedly, the most useful details to bring back are: your name, the exact day involved, and what limits (if any) you had set that week.

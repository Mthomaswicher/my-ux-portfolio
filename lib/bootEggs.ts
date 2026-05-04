/**
 * Hidden boot-screen lines that surface based on the current time, the
 * date, or how many times the visitor has booted MTW.ARCADE in this
 * browser. All optional — none of these gate functionality, they just
 * sneak extra personality into the BIOS log.
 */

const VISIT_STORAGE_KEY = "mtw.boots";

/** Increment + read the per-browser boot counter. SSR-safe. */
export function bumpVisitCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(VISIT_STORAGE_KEY);
    const n = raw ? Number.parseInt(raw, 10) : 0;
    const next = Number.isFinite(n) && n > 0 ? n + 1 : 1;
    window.localStorage.setItem(VISIT_STORAGE_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

/**
 * Pick a visit-milestone line. Returns null when the count doesn't hit
 * a celebrated number. Round numbers + a couple of "lifer" markers.
 */
function visitLine(count: number): string | null {
  if (count <= 0) return null;
  if (count === 1) return "FIRST BOOT ░ WELCOME";
  if (count === 5) return "★ 5 BOOTS · NICE";
  if (count === 10) return "WELCOME BACK, REGULAR ░ 10 BOOTS";
  if (count === 25) return "VIP STATUS · ACTIVE";
  if (count === 50) return "SAVE FILE LOADED · 50 BOOTS";
  if (count === 100) return "★ HALL OF FAMER · 100 BOOTS";
  if (count > 100 && count % 100 === 0)
    return `★ ${count} BOOTS · YOU OK?`;
  return null;
}

/**
 * Pick a single time/date-based line if today's date or the current
 * time matches one of our hidden triggers. Returns null otherwise.
 * Only one line at a time so we don't drown the BIOS log in cuteness.
 */
function timeLine(now: Date): string | null {
  const hour = now.getHours();
  const minute = now.getMinutes();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();

  // Date-based holidays (checked first so they win over time triggers)
  if (month === 1 && day === 1)
    return `NEW GAME + ░ ${now.getFullYear()}`;
  if (month === 10 && day === 31) return "HALLOWEEN ░ SPOOKY MODE";
  if (month === 12 && day === 25) return "MERRY XMAS ░ HOLIDAY DLC";
  if (month === 12 && day === 31) return "FINAL BOSS ░ NEW YEAR'S EVE";
  if (month === 7 && day === 4) return "USA-1 ░ INDEPENDENCE PATCH";

  // Specific minute-precision easter eggs
  if (hour === 11 && minute === 11) return "11:11 ░ MAKE A WISH";
  if (hour === 23 && minute === 11) return "11:11 ░ MAKE A WISH";
  if (hour === 4 && minute === 20) return "4:20 ░ CALIBRATING";
  if (hour === 16 && minute === 20) return "4:20 ░ CALIBRATING";
  if (hour === 13 && minute === 37) return "1337 ░ ELITE MODE";
  // Pi day at 1:59 (3.14159…) on March 14
  if (month === 3 && day === 14 && hour === 1 && minute === 59)
    return "π DAY ░ 3.14159 OK";

  // Hour-band atmosphere
  if (hour >= 0 && hour < 5) return "MIDNIGHT BUILD ▌ LATE SHIFT";
  if (hour === 5) return "DAWN PATROL ░ COFFEE MOUNTING";

  return null;
}

/**
 * Compose extra BIOS lines for this boot. Returns 0–2 lines that the
 * caller splices into the static line list. Order matters — we prepend
 * the visit milestone (first ever / round number) and append the
 * time-based line so it lands closer to "READY.".
 */
export function eggBootLines(visitCount: number, now: Date = new Date()): {
  prepend: string[];
  append: string[];
} {
  const prepend: string[] = [];
  const append: string[] = [];
  const v = visitLine(visitCount);
  if (v) prepend.push(v);
  const t = timeLine(now);
  if (t) append.push(t);
  return { prepend, append };
}

/**
 * Global session counter. One row per browser session is inserted into
 * the `site_sessions` table; the displayed total is the count of rows.
 *
 * REQUIRED SUPABASE SETUP (run once in the SQL editor):
 *
 *   create table if not exists public.site_sessions (
 *     id bigserial primary key,
 *     created_at timestamptz not null default now()
 *   );
 *   alter table public.site_sessions enable row level security;
 *   create policy "anon insert sessions"
 *     on public.site_sessions for insert
 *     to anon with check (true);
 *   create policy "anon read sessions"
 *     on public.site_sessions for select
 *     to anon using (true);
 *
 * If the table is missing or RLS blocks access, tickVisitorCounter()
 * silently returns null and <VisitorCounter /> renders nothing. The
 * site keeps working.
 */

import { getPublicClient } from "./supabase";

const SESSION_FLAG_KEY = "mtw.session.counted";

/**
 * Insert a row for this browser session (only once per session) and
 * return the current global count. Gated by sessionStorage so reloads
 * and client-side nav don't double-count within the same tab.
 */
export async function tickVisitorCounter(): Promise<number | null> {
  const client = getPublicClient();
  if (!client) return null;
  if (typeof window === "undefined") return null;

  let alreadyCounted = false;
  try {
    alreadyCounted = sessionStorage.getItem(SESSION_FLAG_KEY) === "1";
  } catch {
    /* ignore */
  }

  if (!alreadyCounted) {
    try {
      const { error } = await client.from("site_sessions").insert({});
      if (!error) {
        try {
          sessionStorage.setItem(SESSION_FLAG_KEY, "1");
        } catch {
          /* ignore */
        }
      }
    } catch {
      /* ignore — table missing or RLS blocks */
    }
  }

  try {
    const { count, error } = await client
      .from("site_sessions")
      .select("*", { count: "exact", head: true });
    if (error) return null;
    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}

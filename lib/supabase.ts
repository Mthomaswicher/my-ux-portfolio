import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

export const supabaseConfigured = Boolean(url && anonKey);

let _public: SupabaseClient | null = null;
let _admin: SupabaseClient | null = null;

export function getPublicClient(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (!_public) _public = createClient(url!, anonKey!, { auth: { persistSession: false } });
  return _public;
}

export function getAdminClient(): SupabaseClient | null {
  if (!url) return null;
  const key = serviceKey || anonKey;
  if (!key) return null;
  if (!_admin) _admin = createClient(url, key, { auth: { persistSession: false } });
  return _admin;
}

/**
 * How long to wait on Supabase before treating the backend as unreachable.
 *
 * supabase-js retries failed requests with exponential backoff (~0.4s, 1.4s,
 * 3.4s, …). Left alone, a dead project leaves the guestbook spinning on
 * "LOADING…" for ~10s — long enough that visitors read it as broken.
 *
 * Reads and writes get different budgets on purpose:
 *
 * - READ is short. Falling back to locally-stored entries is harmless and
 *   self-corrects on the next load, so bailing after one retry is the right
 *   trade for a responsive page.
 * - WRITE is long. Giving up early means someone's signature lands only in
 *   their own browser and never reaches the shared wall, so it's worth
 *   riding out a slow mobile connection before falling back.
 *
 * Built from AbortController rather than AbortSignal.timeout() so this also
 * works on Safari < 16.
 */
export const SUPABASE_READ_TIMEOUT_MS = 3000;
export const SUPABASE_WRITE_TIMEOUT_MS = 8000;

export function timeoutSignal(
  ms: number = SUPABASE_READ_TIMEOUT_MS,
): AbortSignal {
  const ac = new AbortController();
  setTimeout(() => ac.abort(), ms);
  return ac.signal;
}

export type GuestbookRow = {
  id: number;
  tag: string;
  name: string | null;
  color: "magenta" | "cyan" | "lime" | "amber";
  signature_png: string;
  card_number: number;
  created_at: string;
};

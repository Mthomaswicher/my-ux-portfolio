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

export type GuestbookRow = {
  id: number;
  tag: string;
  name: string | null;
  color: "magenta" | "cyan" | "lime" | "amber";
  signature_png: string;
  card_number: number;
  created_at: string;
};

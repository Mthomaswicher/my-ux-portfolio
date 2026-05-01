import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getAdminClient, getPublicClient, supabaseConfigured, GuestbookRow } from "@/lib/supabase";
import { normalizeTag, sanitizeName } from "@/lib/visitorTags";

export const runtime = "nodejs";

const VALID_COLORS = new Set(["magenta", "cyan", "lime", "amber"]);

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 5 * 60 * 1000;

function ipHashFromRequest(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd?.split(",")[0]?.trim() || "local";
  return createHash("sha256").update(ip + ":mtw.arcade").digest("hex").slice(0, 24);
}

export async function GET() {
  const client = getPublicClient();
  if (!client) {
    return NextResponse.json({ entries: [], stats: emptyStats(), configured: false });
  }
  const { data, error } = await client
    .from("guestbook_entries")
    .select("id, tag, name, color, signature_png, card_number, created_at")
    .order("created_at", { ascending: false })
    .limit(120);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const entries = (data ?? []) as GuestbookRow[];
  return NextResponse.json({ entries, stats: computeStats(entries), configured: true });
}

export async function POST(req: NextRequest) {
  if (!supabaseConfigured) {
    return NextResponse.json(
      { error: "Supabase not configured. Falling back to localStorage on the client." },
      { status: 503 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tag = normalizeTag(body?.tag);
  const name = sanitizeName(body?.name) || null;
  const color = String(body?.color || "");
  const signature_png = String(body?.signature_png || "");

  if (!VALID_COLORS.has(color)) {
    return NextResponse.json({ error: "Invalid color" }, { status: 400 });
  }
  if (!signature_png.startsWith("data:image/")) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  if (signature_png.length > 180_000) {
    return NextResponse.json({ error: "Signature too large" }, { status: 413 });
  }

  const ip_hash = ipHashFromRequest(req);
  const lastAt = recentSubmissions.get(ip_hash) ?? 0;
  if (Date.now() - lastAt < RATE_LIMIT_MS) {
    return NextResponse.json(
      { error: "You just signed in. Try again in a few minutes." },
      { status: 429 }
    );
  }

  const admin = getAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Server unavailable" }, { status: 500 });
  }

  const { data, error } = await admin
    .from("guestbook_entries")
    .insert({ tag, name, color, signature_png, ip_hash })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  recentSubmissions.set(ip_hash, Date.now());
  return NextResponse.json({ entry: data });
}

function emptyStats() {
  return {
    total: 0,
    colors: { magenta: 0, cyan: 0, lime: 0, amber: 0 },
    latestAt: null as string | null,
  };
}

function computeStats(entries: GuestbookRow[]) {
  const stats = emptyStats();
  stats.total = entries.length;
  for (const e of entries) {
    if (e.color in stats.colors) {
      stats.colors[e.color] = (stats.colors[e.color] ?? 0) + 1;
    }
  }
  stats.latestAt = entries[0]?.created_at ?? null;
  return stats;
}

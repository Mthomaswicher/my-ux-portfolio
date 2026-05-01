-- MTW.ARCADE. Guestbook schema
-- Paste this into the Supabase SQL editor for your project once.

create table if not exists public.guestbook_entries (
  id bigserial primary key,
  tag text not null check (length(tag) between 3 and 6),
  name text,
  color text not null check (color in ('magenta','cyan','lime','amber')),
  signature_png text not null,
  card_number bigserial,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists guestbook_created_at_idx
  on public.guestbook_entries (created_at desc);

create index if not exists guestbook_ip_hash_idx
  on public.guestbook_entries (ip_hash);

alter table public.guestbook_entries enable row level security;

drop policy if exists "anon read" on public.guestbook_entries;
create policy "anon read"
  on public.guestbook_entries
  for select
  using (true);

drop policy if exists "anon insert" on public.guestbook_entries;
create policy "anon insert"
  on public.guestbook_entries
  for insert
  with check (
    length(signature_png) < 200000
    and length(coalesce(name, '')) <= 40
    and length(tag) between 3 and 6
  );

-- ─── RoamPet pickup counter ─────────────────────────────────────────────
-- One row per unique visitor who picks up the site mascot. Used to surface
-- "you're the Nth person to pick me up" in a speech bubble.

create table if not exists public.pet_pokes (
  visitor_id text primary key,
  first_poke_at timestamptz not null default now()
);

create index if not exists pet_pokes_first_poke_idx
  on public.pet_pokes (first_poke_at);

alter table public.pet_pokes enable row level security;

drop policy if exists "anon read pokes" on public.pet_pokes;
create policy "anon read pokes"
  on public.pet_pokes
  for select
  using (true);

drop policy if exists "anon insert pokes" on public.pet_pokes;
create policy "anon insert pokes"
  on public.pet_pokes
  for insert
  with check (length(visitor_id) between 8 and 64);

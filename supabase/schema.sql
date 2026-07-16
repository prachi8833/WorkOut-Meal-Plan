-- Prachi.Hub schema — paste this whole file into Supabase SQL Editor and click RUN.

create table if not exists public.hub (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.hub enable row level security;

create policy "own row select" on public.hub for select using (auth.uid() = user_id);
create policy "own row insert" on public.hub for insert with check (auth.uid() = user_id);
create policy "own row update" on public.hub for update using (auth.uid() = user_id);

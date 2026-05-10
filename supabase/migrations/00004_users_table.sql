-- ============================================================
-- Media CRM - Users table
-- ============================================================

create table if not exists users (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  first_name text not null default '',
  last_name  text not null default '',
  created_dt timestamptz not null default now(),
  updated_dt timestamptz not null default now()
);

create trigger trg_users_updated_dt
  before update on users
  for each row execute function update_updated_dt();

alter table users enable row level security;

create policy "Users can view their own profile"
  on users for select
  using (id = auth.uid());

create policy "Users can insert their own profile"
  on users for insert
  with check (id = auth.uid());

create policy "Users can update their own profile"
  on users for update
  using (id = auth.uid());

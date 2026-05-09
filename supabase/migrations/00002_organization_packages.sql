-- ============================================================
-- Add organization_id to packages and fix RLS for public booking
-- ============================================================

alter table packages add column if not exists organization_id uuid references organizations(id) on delete cascade;

create index if not exists idx_packages_organization_id on packages (organization_id);

-- Drop old restrictive package RLS policies
drop policy if exists "Users can view packages linked to their org" on packages;
drop policy if exists "Users can manage their own packages" on packages;

drop policy if exists "Anyone can view packages" on packages;
create policy "Anyone can view packages"
  on packages for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can insert packages" on packages;
create policy "Authenticated users can insert packages"
  on packages for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update packages" on packages;
create policy "Authenticated users can update packages"
  on packages for update
  to authenticated
  using (true);

drop policy if exists "Authenticated users can delete packages" on packages;
create policy "Authenticated users can delete packages"
  on packages for delete
  to authenticated
  using (true);

-- Allow public access to organizations for booking page
drop policy if exists "Users can view their own organization" on organizations;
drop policy if exists "Anyone can view organizations" on organizations;

create policy "Anyone can view organizations"
  on organizations for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can insert their organization" on organizations;
create policy "Authenticated users can insert their organization"
  on organizations for insert
  to authenticated
  with check (id = auth.uid());

drop policy if exists "Authenticated users can update their organization" on organizations;
create policy "Authenticated users can update their organization"
  on organizations for update
  to authenticated
  using (id = auth.uid());

-- Contracts are globally accessible by everyone
alter table contracts disable row level security;

-- Allow public to insert requests (booking flow)
drop policy if exists "Users can view requests for their org" on requests;
drop policy if exists "Users can manage requests for their org" on requests;

drop policy if exists "Anyone can insert requests" on requests;
create policy "Anyone can insert requests"
  on requests for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated users can view requests" on requests;
create policy "Authenticated users can view requests"
  on requests for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can update requests" on requests;
create policy "Authenticated users can update requests"
  on requests for update
  to authenticated
  using (true);

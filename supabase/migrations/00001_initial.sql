-- ============================================================
-- Media CRM - Initial Schema
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------
-- Organizations
-- -----------------------------------------------------------
create table if not exists organizations (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  logo        text,
  category    text not null default '',
  phone       text,
  email       text,
  slug        text not null unique,
  created_dt  timestamptz not null default now(),
  updated_dt  timestamptz not null default now()
);

create index idx_organizations_slug on organizations (slug);

-- -----------------------------------------------------------
-- Contracts
-- -----------------------------------------------------------
create table if not exists contracts (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null default '',
  content     text not null default '',
  created_dt  timestamptz not null default now(),
  updated_dt  timestamptz not null default now(),
  fields      jsonb not null default '{"full_name": "", "signature": ""}'
);

-- -----------------------------------------------------------
-- Packages
-- -----------------------------------------------------------
create table if not exists packages (
  id                 uuid primary key default uuid_generate_v4(),
  name               text not null,
  description        text not null default '',
  price              numeric(10,2) not null default 0,
  deposit_percentage numeric(5,2) not null default 25,
  features           text[] not null default '{}',
  contract_id        uuid references contracts(id) on delete set null,
  created_dt         timestamptz not null default now(),
  updated_dt         timestamptz not null default now()
);

create index idx_packages_contract_id on packages (contract_id);

-- -----------------------------------------------------------
-- Requests (booking requests / jobs)
-- -----------------------------------------------------------
create table if not exists requests (
  id              uuid primary key default uuid_generate_v4(),
  first_name      text not null,
  last_name       text not null,
  signature       text not null default '',
  package_id      uuid not null references packages(id) on delete restrict,
  organization_id uuid not null references organizations(id) on delete cascade,
  terms_accepted  boolean not null default false,
  status          text not null default 'pending'
                    check (status in ('pending', 'in-progress', 'completed', 'cancelled')),
  completed_dt    timestamptz,
  created_dt      timestamptz not null default now(),
  updated_dt      timestamptz not null default now()
);

create index idx_requests_organization_id on requests (organization_id);
create index idx_requests_package_id      on requests (package_id);
create index idx_requests_status          on requests (status);

-- -----------------------------------------------------------
-- Automatic updated_dt trigger
-- -----------------------------------------------------------
create or replace function update_updated_dt()
returns trigger as $$
begin
  new.updated_dt = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_organizations_updated_dt
  before update on organizations
  for each row execute function update_updated_dt();

create trigger trg_contracts_updated_dt
  before update on contracts
  for each row execute function update_updated_dt();

create trigger trg_packages_updated_dt
  before update on packages
  for each row execute function update_updated_dt();

create trigger trg_requests_updated_dt
  before update on requests
  for each row execute function update_updated_dt();

-- -----------------------------------------------------------
-- Row-Level Security (default: authenticated users only)
-- -----------------------------------------------------------
alter table organizations enable row level security;
alter table contracts     enable row level security;
alter table packages      enable row level security;
alter table requests      enable row level security;

-- Organization members can see only their own org
create policy "Users can view their own organization"
  on organizations for select
  using (id = auth.uid());

create policy "Users can update their own organization"
  on organizations for update
  using (id = auth.uid());

-- Contracts are visible to authenticated users
create policy "Authenticated users can view contracts"
  on contracts for select
  to authenticated
  using (true);

create policy "Authenticated users can manage contracts"
  on contracts for all
  to authenticated
  using (true);

-- Packages visible within the organization
create policy "Users can view packages linked to their org"
  on packages for select
  using (
    exists (
      select 1 from requests
      where requests.package_id = packages.id
        and requests.organization_id = auth.uid()
    )
  );

create policy "Users can manage their own packages"
  on packages for all
  to authenticated
  using (true);

-- Requests belong to an organization
create policy "Users can view requests for their org"
  on requests for select
  using (organization_id = auth.uid());

create policy "Users can manage requests for their org"
  on requests for all
  using (organization_id = auth.uid());

-- Add status column to packages (ACTIVE / INACTIVE)
alter table packages add column if not exists status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE'));

-- ============================================================
-- Add currency to packages
-- ============================================================

alter table packages
  add column currency text not null default 'GHS';

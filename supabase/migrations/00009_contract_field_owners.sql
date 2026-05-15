-- Distinguish between user (provider) fields and client (signer) fields
-- Each contract's fields are now split into user and client objects.
-- Also add contract_fields to packages for storing provider-filled values.

alter table contracts alter column fields set default '{"internal": [], "external": ["first_name", "last_name"]}';

alter table packages add column if not exists contract_fields jsonb not null default '{}';

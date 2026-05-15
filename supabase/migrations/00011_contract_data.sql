-- Store client-filled external contract field values
alter table requests add column if not exists contract_data jsonb not null default '{}';

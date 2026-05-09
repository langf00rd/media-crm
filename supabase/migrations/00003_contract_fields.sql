-- Update contracts fields default to include first_name, last_name, signature
alter table contracts alter column fields set default '{"first_name": "", "last_name": "", "signature": ""}';

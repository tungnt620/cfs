--! Previous: sha1:cafec6ed9718e455971c0bc67753c93f5689f63b
--! Hash: sha1:694a8b2ce43a7ee653bdaf029145876a65167f98

--! split: 1-current.sql
-- Enter migration here
ALTER TABLE app_public.confession
  ALTER updated_at TYPE timestamptz
    USING '2000-01-01 00:00:00+07'::timestamptz,
  ALTER  updated_at SET NOT NULL,
  alter column updated_at set default now();

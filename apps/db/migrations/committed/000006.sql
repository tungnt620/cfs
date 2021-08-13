--! Previous: sha1:79e51b915df82767090b806473b15958b218d6e6
--! Hash: sha1:cafec6ed9718e455971c0bc67753c93f5689f63b

--! split: 1-current.sql
-- Enter migration here
ALTER TABLE app_public.confession
  ALTER created_at TYPE timestamptz
    USING '2000-01-01 00:00:00+07'::timestamptz,
  ALTER  created_at SET NOT NULL,
  alter column created_at set default now();

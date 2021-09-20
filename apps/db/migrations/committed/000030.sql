--! Previous: sha1:b608c902a9831bdd4b56a83469e631af5488c2d0
--! Hash: sha1:b4fdd27c1677450b1d365d5a0795b2b12ee4a79f

--! split: 1-current.sql
-- Enter migration here
alter table app_public.users
  DROP CONSTRAINT IF EXISTS users_username_check,
  add constraint users_username_check check ((length((username)::text) >= 2) AND (length((username)::text) <= 24));

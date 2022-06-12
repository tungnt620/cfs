--! Previous: sha1:05bd97543e2b166192f65947bbeb82b567922bd5
--! Hash: sha1:4ebed47608fe96a5840b8d0300ff74fa0afb5dfa

--! split: 1-current.sql
-- Enter migration here

drop function if exists app_public.is_user_logged_in();

create function app_public.is_user_logged_in() returns boolean as $$
  select id is not null from app_public.users where id = app_public.current_user_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;

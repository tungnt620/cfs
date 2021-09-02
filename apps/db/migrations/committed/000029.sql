--! Previous: sha1:db5f78f7327b51f0e81b10b7b48bd8d00f5c5f7b
--! Hash: sha1:b608c902a9831bdd4b56a83469e631af5488c2d0

--! split: 1-current.sql
-- Enter migration here

 DROP FUNCTION if exists get_relative_confessions(integer);

CREATE OR REPLACE FUNCTION app_public.get_relative_confessions(target_confession_id INTEGER)
		RETURNS SETOF app_public.confession
AS $$
  select * from app_public.confession where id in (
   select confession_id from app_public.confession_category where confession_id < target_confession_id and category_id in (
      select category_id from app_public.confession_category where confession_id = target_confession_id limit 1
   )
   order by confession_id desc
   limit 3
  )
  order by id desc;
$$
LANGUAGE sql STABLE;

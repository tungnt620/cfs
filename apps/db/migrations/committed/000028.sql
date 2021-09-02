--! Previous: sha1:2e7bd0999a080704499c7d5c8b8648d349f32142
--! Hash: sha1:db5f78f7327b51f0e81b10b7b48bd8d00f5c5f7b

--! split: 1-current.sql
-- Enter migration here
DROP FUNCTION create_or_update_confession_reaction(integer,reaction_type) ;
DROP FUNCTION create_or_update_comment_reaction(integer,reaction_type) ;

CREATE OR REPLACE FUNCTION app_public.create_or_update_confession_reaction (confession_id INTEGER, react_type reaction_type)
	RETURNS app_public.confession AS $$
declare
  v_confession app_public.confession;
begin
	 INSERT INTO app_public.user_confession_reaction (confession_id, react_type)
   VALUES(confession_id, react_type)
   ON CONFLICT ON CONSTRAINT user_id_confession_id_unique_key
   DO
      UPDATE SET react_type = EXCLUDED.react_type;

   select * into v_confession from app_public.confession where id = confession_id;
   return v_confession;
end;
$$
LANGUAGE plpgsql VOLATILE STRICT SECURITY DEFINER set search_path from current;

CREATE OR REPLACE FUNCTION app_public.create_or_update_comment_reaction (comment_id INTEGER, react_type reaction_type)
	RETURNS app_public.comment AS $$
declare
  v_comment app_public.comment;
begin
	 INSERT INTO app_public.user_comment_reaction (comment_id, react_type)
   VALUES(comment_id, react_type)
   ON CONFLICT ON CONSTRAINT user_id_comment_id_unique_key
   DO
      UPDATE SET react_type = EXCLUDED.react_type;

   select * into v_comment from app_public.comment where id = comment_id;
   return v_comment;
end;
$$
LANGUAGE plpgsql VOLATILE STRICT SECURITY DEFINER set search_path from current;

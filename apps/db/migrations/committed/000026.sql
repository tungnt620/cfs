--! Previous: sha1:349bdf61d2b8e2d26eb83b1c79e0c4897eb1d4d8
--! Hash: sha1:f0241016b11f4efbe705993dea7d3c2987b712f8

--! split: 1-current.sql
-- Enter migration here

alter table app_public.user_confession_reaction
  drop constraint if exists user_id_confession_id_unique_key;

alter table app_public.user_comment_reaction
  drop constraint if exists user_id_comment_id_unique_key;

alter table app_public.user_confession_reaction
      ADD CONSTRAINT user_id_confession_id_unique_key UNIQUE (user_id, confession_id);

alter table app_public.user_comment_reaction
      ADD CONSTRAINT user_id_comment_id_unique_key UNIQUE (user_id, comment_id);

CREATE OR REPLACE FUNCTION app_public.create_or_update_confession_reaction (confession_id INTEGER, react_type reaction_type)
	RETURNS void AS $$
begin
	 INSERT INTO app_public.user_confession_reaction (confession_id, react_type)
   VALUES(confession_id, react_type)
   ON CONFLICT ON CONSTRAINT user_id_confession_id_unique_key
   DO
      UPDATE SET react_type = EXCLUDED.react_type where app_public.user_confession_reaction.id = EXCLUDED.id;
end;
$$
LANGUAGE plpgsql VOLATILE STRICT SECURITY DEFINER;

CREATE OR REPLACE FUNCTION app_public.create_or_update_comment_reaction (comment_id INTEGER, react_type reaction_type)
	RETURNS void AS $$
begin
	 INSERT INTO app_public.user_confession_reaction (comment_id, react_type)
   VALUES(comment_id, react_type)
   ON CONFLICT ON CONSTRAINT user_id_comment_id_unique_key
   DO
      UPDATE SET react_type = EXCLUDED.react_type where app_public.user_comment_reaction.id = EXCLUDED.id;
end;
$$
LANGUAGE plpgsql VOLATILE STRICT SECURITY DEFINER;

REVOKE ALL
ON TABLE app_public.user_confession_reaction
FROM cfs_visitor;

REVOKE ALL
ON TABLE app_public.user_comment_reaction
FROM cfs_visitor;

REVOKE insert
ON TABLE app_public.confession_category
FROM cfs_visitor;

revoke delete
on table app_public.category
from cfs_visitor;



 drop trigger if exists update_total_reaction on app_public.user_comment_reaction;
 drop trigger if exists update_total_reaction on app_public.user_confession_reaction;

drop function if exists tg__update_total_reaction;
create function app_private.tg__update_total_reaction() returns trigger as $$
declare
    arg_table_name varchar;
    react_count integer := 0;
begin
    arg_table_name   := TG_ARGV[0];

  if NEW.react_type = 'up' then
    react_count = 1;
  elseif NEW.react_type = 'down' then
    react_count = -1;
  end if;

  if arg_table_name = 'confession' then
    update app_public.confession set total_reaction = total_reaction + react_count where id = NEW.confession_id;
  elseif arg_table_name = 'comment' then
    update app_public.comment set total_reaction = total_reaction + react_count where id = NEW.comment_id;
  END if;

  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

 create trigger update_total_reaction before insert or update on app_public.user_comment_reaction for each row execute procedure app_private.tg__update_total_reaction('comment');

 create trigger update_total_reaction before insert or update on app_public.user_confession_reaction for each row execute procedure app_private.tg__update_total_reaction('confession');

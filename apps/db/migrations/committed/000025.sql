--! Previous: sha1:9880d60713c0ace22832e7875817ff9eea466c97
--! Hash: sha1:349bdf61d2b8e2d26eb83b1c79e0c4897eb1d4d8

--! split: 1-current.sql
-- Enter migration here

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
    update app_public.confession set total_reaction = total_reaction + react_count;
  elseif arg_table_name = 'comment' then
    update app_public.comment set total_reaction = total_reaction + react_count;
  END if;

  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

 create trigger update_total_reaction before insert or update on app_public.user_comment_reaction for each row execute procedure app_private.tg__update_total_reaction('comment');

 create trigger update_total_reaction before insert or update on app_public.user_confession_reaction for each row execute procedure app_private.tg__update_total_reaction('confession');

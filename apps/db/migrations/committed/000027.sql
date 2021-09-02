--! Previous: sha1:f0241016b11f4efbe705993dea7d3c2987b712f8
--! Hash: sha1:2e7bd0999a080704499c7d5c8b8648d349f32142

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
      if OLD.react_type = 'up' then
        react_count = 0;
      elseif OLD.react_type = 'down' then
        react_count = 2;
      else
        react_count = 1;
      end if;
  elseif NEW.react_type = 'down' then
      if OLD.react_type = 'down' then
        react_count = 0;
      elseif OLD.react_type = 'up' then
        react_count = -2;
      else
        react_count = -1;
      end if;
  elseif NEW.react_type = 'none' then
    if OLD.react_type = 'up' then
      react_count = -1;
    elseif OLD.react_type = 'down' then
      react_count = 1;
    end if;
  end if;

  if arg_table_name = 'confession' then
    update app_public.confession set total_reaction = total_reaction + react_count where id = NEW.confession_id;
  elseif arg_table_name = 'comment' then
    update app_public.comment set total_reaction = total_reaction + react_count where id = NEW.comment_id;
  END if;

  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

 create trigger update_total_reaction after insert or update on app_public.user_confession_reaction for each row execute procedure app_private.tg__update_total_reaction('confession');

 create trigger update_total_reaction after insert or update on app_public.user_comment_reaction for each row execute procedure app_private.tg__update_total_reaction('comment');

grant select
on app_public.user_confession_reaction
to :DATABASE_VISITOR;

grant select
on app_public.user_comment_reaction
to :DATABASE_VISITOR;


DROP POLICY IF EXISTS select_all ON app_public.user_confession_reaction;
DROP POLICY IF EXISTS select_own ON app_public.user_confession_reaction;
DROP POLICY IF EXISTS insert_all ON app_public.user_confession_reaction;

 create policy select_own on app_public.user_confession_reaction for select using (user_id = app_public.current_user_id());
 create policy insert_all on app_public.user_confession_reaction for insert with check (app_public.current_user_id() is not null);

DROP POLICY IF EXISTS select_all ON app_public.user_comment_reaction;
DROP POLICY IF EXISTS select_own ON app_public.user_comment_reaction;
DROP POLICY IF EXISTS insert_all ON app_public.user_comment_reaction;

 create policy select_own on app_public.user_comment_reaction for select  using (user_id = app_public.current_user_id());
 create policy insert_all on app_public.user_comment_reaction for insert with check (app_public.current_user_id() is not null);


CREATE OR REPLACE FUNCTION app_public.create_or_update_confession_reaction (confession_id INTEGER, react_type reaction_type)
	RETURNS void AS $$
begin
	 INSERT INTO app_public.user_confession_reaction (confession_id, react_type)
   VALUES(confession_id, react_type)
   ON CONFLICT ON CONSTRAINT user_id_confession_id_unique_key
   DO
      UPDATE SET react_type = EXCLUDED.react_type;
end;
$$
LANGUAGE plpgsql VOLATILE STRICT SECURITY DEFINER;

CREATE OR REPLACE FUNCTION app_public.create_or_update_comment_reaction (comment_id INTEGER, react_type reaction_type)
	RETURNS void AS $$
begin
	 INSERT INTO app_public.user_comment_reaction (comment_id, react_type)
   VALUES(comment_id, react_type)
   ON CONFLICT ON CONSTRAINT user_id_comment_id_unique_key
   DO
      UPDATE SET react_type = EXCLUDED.react_type;
end;
$$
LANGUAGE plpgsql VOLATILE STRICT SECURITY DEFINER;

--! Previous: sha1:98245d7d85f55e2f42ced4108b5f0af0c73d953f
--! Hash: sha1:0b7f0e978c9fa1dd44f44fc7fc3b837580aa9986

--! split: 1-current.sql
-- Enter migration here

drop table if exists app_public.user_comment_reaction;

 create table app_public.user_comment_reaction (
   id               serial primary key,
   user_id        	uuid default app_public.current_user_id() references app_public.users(id) on delete set null,
   comment_id 	  INTEGER not null REFERENCES app_public.comment(id) on DELETE CASCADE,
   react_type		reaction_type not null,
   created_at       timestamptz not null default now(),
   updated_at       timestamptz not null default now()
 );
 alter table app_public.user_comment_reaction enable row level security;
 create index on app_public.user_comment_reaction (user_id);
 create index on app_public.user_comment_reaction (comment_id);

  drop trigger if exists _100_timestamps on app_public.user_comment_reaction;
 create trigger _100_timestamps before insert or update on app_public.user_comment_reaction for each row execute procedure app_private.tg__timestamps();

 grant
   select,
   insert (comment_id, react_type),
   update (comment_id, react_type)
 on app_public.user_comment_reaction to :DATABASE_VISITOR;


DROP POLICY IF EXISTS select_all ON app_public.user_comment_reaction;
DROP POLICY IF EXISTS manage_own ON app_public.user_comment_reaction;
DROP POLICY IF EXISTS manage_as_admin ON app_public.user_comment_reaction;

 create policy select_all on app_public.user_comment_reaction for select using (true);
 create policy manage_own on app_public.user_comment_reaction for all using (user_id = app_public.current_user_id());
 create policy manage_as_admin on app_public.user_comment_reaction for all using (exists (select 1 from app_public.users where is_admin is true and id = app_public.current_user_id()));

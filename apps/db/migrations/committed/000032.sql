--! Previous: sha1:358f714e389d614761897f0fb1f2f1dad0f619e1
--! Hash: sha1:3ae2d55a9aa198c7b6fd68f0f0723701091e2caf

--! split: 1-current.sql
-- Enter migration here
drop table if exists app_public.feedback;

 create table app_public.feedback (
   id               serial primary key,
   user_id        	uuid default app_public.current_user_id() references app_public.users(id) on delete set null,
   content          varchar(512) not null,
   parent_id        integer,
   created_at       timestamptz not null default now(),
   updated_at       timestamptz not null default now()
 );
 alter table app_public.feedback enable row level security;
 create index on app_public.feedback (user_id);
 create index on app_public.feedback (parent_id);

  drop trigger if exists _100_timestamps on app_public.feedback;
 create trigger _100_timestamps before insert or update on app_public.feedback for each row execute procedure app_private.tg__timestamps();

 grant
   select,
   insert (content, parent_id),
   update (content, parent_id)
 on app_public.feedback to :DATABASE_VISITOR;

DROP POLICY IF EXISTS select_own ON app_public.feedback;
DROP POLICY IF EXISTS manage_own ON app_public.feedback;
DROP POLICY IF EXISTS manage_as_admin ON app_public.feedback;

 create policy select_own on app_public.feedback for select using (user_id = app_public.current_user_id());
 create policy manage_own on app_public.feedback for all using (user_id = app_public.current_user_id());
 create policy manage_as_admin on app_public.feedback for all using (exists (select 1 from app_public.users where is_admin is true and id = app_public.current_user_id()));

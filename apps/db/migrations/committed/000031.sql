--! Previous: sha1:b4fdd27c1677450b1d365d5a0795b2b12ee4a79f
--! Hash: sha1:358f714e389d614761897f0fb1f2f1dad0f619e1

--! split: 1-current.sql
-- Enter migration here

ALTER TABLE app_public.comment DROP CONSTRAINT fk_confession;
ALTER TABLE app_public.comment ADD CONSTRAINT "fk_confession" FOREIGN KEY ("confession_id") REFERENCES "app_public"."confession"("id") ON DELETE CASCADE;

ALTER TABLE app_public.comment DROP CONSTRAINT comment_user_id_fkey;
ALTER TABLE app_public.comment ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_public"."users"("id");

ALTER TABLE app_public.confession DROP CONSTRAINT confession_user_id_fkey;
ALTER TABLE app_public.confession ADD CONSTRAINT "confession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_public"."users"("id");

drop function if exists app_public.delete_cfs;

create function app_public.delete_cfs(confession_id integer) returns void as $$
begin
  if exists(
    select 1
    from app_public.confession
    where (
      user_id = app_public.current_user_id()
      or exists ( select * from app_public.users where id = app_public.current_user_id() and is_admin = true )
    )
    and id = confession_id
  ) then
    delete from app_public.confession where id = confession_id;
  end if;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

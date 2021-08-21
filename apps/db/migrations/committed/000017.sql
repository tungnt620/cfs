--! Previous: sha1:96cd85788b1e041ca46ba0a6d7ad38a6f1e147b5
--! Hash: sha1:172743c58b28f29e2a3970606c394a5303491df0

--! split: 1-current.sql
-- Enter migration here
CREATE OR REPLACE FUNCTION app_public.create_cfs(title VARCHAR, content VARCHAR, slug VARCHAR, cat_id INTEGER, image VARCHAR)
	RETURNS app_public.confession
	AS $$
	DECLARE
		v_unique_slug app_public.confession.slug%type;
		v_current_user_id app_public.users.id%type;
		v_new_cfs app_public.confession;
	BEGIN
		v_unique_slug = slug || '-' || floor(random() * 100000)::VARCHAR;
		v_current_user_id = app_public.current_user_id();

    if v_current_user_id is null then
      raise exception 'Missing current_user_id' using errcode = 'MISSING_USER';
    end if;

		insert into app_public.confession(title, slug, content, image, user_id) values
		(title, v_unique_slug, content, image, v_current_user_id) RETURNING * INTO v_new_cfs;

		INSERT into app_public.confession_category(confession_id, category_id) values
		(v_new_cfs.id, cat_id);

		return v_new_cfs;
	end;
	$$
-- TODO: remove security definer
LANGUAGE plpgsql VOLATILE STRICT SECURITY DEFINER;

DROP POLICY IF EXISTS insert_own ON app_public.confession;
DROP POLICY IF EXISTS update_own ON app_public.confession;
DROP POLICY IF EXISTS insert_own ON app_public.comment;
DROP POLICY IF EXISTS update_own ON app_public.comment;
DROP POLICY IF EXISTS insert_own ON app_public.confession_category;
DROP POLICY IF EXISTS update_own ON app_public.confession_category;

create policy insert_own on app_public.confession for insert with check (user_id = app_public.current_user_id());
create policy update_own on app_public.confession for update using (user_id = app_public.current_user_id());
create policy insert_own on app_public.comment for insert with check (user_id = app_public.current_user_id());
create policy update_own on app_public.comment for update using (user_id = app_public.current_user_id());

create policy insert_own on app_public.confession_category for insert with check (EXISTS(select id from app_public.confession where id = confession_id and user_id = app_public.current_user_id()));
create policy update_own on app_public.confession_category for update using (EXISTS(select id from app_public.confession where id = confession_id and user_id = app_public.current_user_id()));

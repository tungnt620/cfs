--! Previous: sha1:7093e81f535e876fcddd5fdaa6a22e37f2987ee2
--! Hash: sha1:05bd97543e2b166192f65947bbeb82b567922bd5

--! split: 1-current.sql
-- Enter migration here
drop function if exists app_public.delete_cfs;

alter table app_public.confession
drop column if EXISTS deleted_at;

ALTER TABLE app_public.confession
ADD COLUMN deleted_at timestamptz;
create index on app_public.confession (deleted_at);

create function app_public.delete_cfs(p_confession_id integer) returns void as $$
begin
  if exists(
    select 1
    from app_public.confession
    where (
      user_id = app_public.current_user_id()
      or exists ( select * from app_public.users where id = app_public.current_user_id() and is_admin = true )
      -- Can delete confessions belong communities which created by current user
      or exists (
        select * from app_public.confession c
        left join app_public.confession_category cc on c.id = cc.confession_id
        LEFT join app_public.category ca on cc.category_id = ca.id
        where c.id = p_confession_id and ca.created_by = app_public.current_user_id()
      )
    )
    and id = p_confession_id
  ) then
    update app_public.confession set deleted_at = now() where id = p_confession_id;
  end if;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;


DROP FUNCTION if exists get_relative_confessions(integer);

CREATE OR REPLACE FUNCTION app_public.get_relative_confessions(target_confession_id INTEGER)
		RETURNS SETOF app_public.confession
AS $$
  select * from app_public.confession where id in (
   select confession_id from app_public.confession_category where confession_id < target_confession_id and category_id in (
      select category_id from app_public.confession_category cc
      left join app_public.category ca on cc.category_id = ca.id
      where ca.deleted_at is null and confession_id = target_confession_id limit 1
   ) and deleted_at is null
   order by confession_id desc
   limit 3
  )
  order by id desc;
$$
LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION app_public.get_cfs_by_cat (cat_id INTEGER)
	RETURNS SETOF app_public.confession
	AS $$
	SELECT
		c.*
	FROM
		app_public.confession c
	LEFT JOIN app_public.confession_category cc ON c.id = cc.confession_id
	left join app_public.category ca on cc.category_id = ca.id
WHERE
  c.deleted_at is null
  and ca.deleted_at is null
	and (cat_id = 0 or cc.category_id = cat_id)
ORDER BY
	c.id DESC;
$$
LANGUAGE sql
STABLE;

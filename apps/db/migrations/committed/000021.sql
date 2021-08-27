--! Previous: sha1:71ce2ee96af83039593ebab08e0f00005dc85cf1
--! Hash: sha1:a6b884de5da9bb2ea8f5b7db40dbb1be149d6611

--! split: 1-current.sql
-- Enter migration here
CREATE OR REPLACE FUNCTION app_public.get_cfs_by_cat_slug (cat_slug VARCHAR)
	RETURNS SETOF app_public.confession
	AS $$
	SELECT
		c.*
	FROM
		app_public.confession c
	LEFT JOIN app_public.confession_category cc ON c.id = cc.confession_id
	LEFT JOIN app_public.category cat ON cat.id = cc.category_id
WHERE
	cat.slug = cat_slug
ORDER BY
	c.id DESC;
$$
LANGUAGE sql
STABLE;

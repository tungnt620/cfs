--! Previous: sha1:ed54181eacc116186180e69b64794a806b23b33a
--! Hash: sha1:96cd85788b1e041ca46ba0a6d7ad38a6f1e147b5

--! split: 1-current.sql
-- Enter migration here
CREATE OR REPLACE FUNCTION app_public.get_cfs_by_cat (cat_id INTEGER)
	RETURNS SETOF app_public.confession
	AS $$
	SELECT
		c.*
	FROM
		app_public.confession c
	LEFT JOIN app_public.confession_category cc ON c.id = cc.confession_id
WHERE
	cat_id = 0 or cc.category_id = cat_id
ORDER BY
	c.id DESC;
$$
LANGUAGE sql
STABLE;

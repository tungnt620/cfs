--! Previous: sha1:a95581c474b20088c8551d72a1ba330b80b5dd78
--! Hash: sha1:71ce2ee96af83039593ebab08e0f00005dc85cf1

--! split: 1-current.sql
-- Enter migration here
create index if not exists idx_category_slug on app_public.category USING btree (slug);

alter table app_public.category
  drop constraint if exists category_slug_key;
ALTER TABLE ONLY app_public.category
    ADD CONSTRAINT category_slug_key UNIQUE (slug);

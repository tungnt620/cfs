--! Previous: sha1:150a9e3e03a799c6508c5dbc112b13f23a62a88f
--! Hash: sha1:9999c56768e62b31ec978169c5cd545e629cd283

--! split: 1-current.sql
-- Enter migration here

alter table app_public.comment
add column if not exists user_id uuid default app_public.current_user_id() references app_public.users on delete cascade;

create index if not exists idx_comment_user on app_public.comment (user_id);

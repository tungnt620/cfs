--! Previous: sha1:9999c56768e62b31ec978169c5cd545e629cd283
--! Hash: sha1:5af9886ddc8469ce1c1cab168022fd47e3f338e2

--! split: 1-current.sql
-- Enter migration here
alter table app_public.comment
drop column if exists author;

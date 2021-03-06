--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: app_hidden; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_hidden;


--
-- Name: app_private; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_private;


--
-- Name: app_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_public;


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: reaction_type; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.reaction_type AS ENUM (
    'none',
    'up',
    'down'
);


--
-- Name: assert_valid_password(text); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.assert_valid_password(new_password text) RETURNS void
    LANGUAGE plpgsql
    AS $$
begin
  -- TODO: add better assertions!
  if length(new_password) < 8 then
    raise exception 'Password is too weak' using errcode = 'WEAKP';
  end if;
end;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username public.citext NOT NULL,
    name text,
    avatar_url text,
    is_admin boolean DEFAULT false NOT NULL,
    is_verified boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    role character varying(255),
    CONSTRAINT users_avatar_url_check CHECK ((avatar_url ~ '^https?://[^/]+'::text)),
    CONSTRAINT users_username_check CHECK (((length((username)::text) >= 2) AND (length((username)::text) <= 24)))
);


--
-- Name: TABLE users; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.users IS 'A user who can log in to the application.';


--
-- Name: COLUMN users.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.id IS 'Unique identifier for the user.';


--
-- Name: COLUMN users.username; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.username IS 'Public-facing username (or ''handle'') of the user.';


--
-- Name: COLUMN users.name; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.name IS 'Public-facing name (or pseudonym) of the user.';


--
-- Name: COLUMN users.avatar_url; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.avatar_url IS 'Optional avatar URL.';


--
-- Name: COLUMN users.is_admin; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.is_admin IS 'If true, the user has elevated privileges.';


--
-- Name: link_or_register_user(uuid, character varying, character varying, json, json); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.link_or_register_user(f_user_id uuid, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json) RETURNS app_public.users
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
  v_matched_user_id uuid;
  v_matched_authentication_id uuid;
  v_email citext;
  v_name text;
  v_avatar_url text;
  v_user app_public.users;
  v_user_email app_public.user_emails;
begin
  -- See if a user account already matches these details
  select id, user_id
    into v_matched_authentication_id, v_matched_user_id
    from app_public.user_authentications
    where service = f_service
    and identifier = f_identifier
    limit 1;

  if v_matched_user_id is not null and f_user_id is not null and v_matched_user_id <> f_user_id then
    raise exception 'A different user already has this account linked.' using errcode = 'TAKEN';
  end if;

  v_email = f_profile ->> 'email';
  v_name := f_profile ->> 'name';
  v_avatar_url := f_profile ->> 'avatar_url';

  if v_matched_authentication_id is null then
    if f_user_id is not null then
      -- Link new account to logged in user account
      insert into app_public.user_authentications (user_id, service, identifier, details) values
        (f_user_id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
      insert into app_private.user_authentication_secrets (user_authentication_id, details) values
        (v_matched_authentication_id, f_auth_details);
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'linked_account',
          'user_id', f_user_id,
          'extra1', f_service,
          'extra2', f_identifier,
          'current_user_id', app_public.current_user_id()
        ));
    elsif v_email is not null then
      -- See if the email is registered
      select * into v_user_email from app_public.user_emails where email = v_email and is_verified is true;
      if v_user_email is not null then
        -- User exists!
        insert into app_public.user_authentications (user_id, service, identifier, details) values
          (v_user_email.user_id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
        insert into app_private.user_authentication_secrets (user_authentication_id, details) values
          (v_matched_authentication_id, f_auth_details);
        perform graphile_worker.add_job(
          'user__audit',
          json_build_object(
            'type', 'linked_account',
            'user_id', f_user_id,
            'extra1', f_service,
            'extra2', f_identifier,
            'current_user_id', app_public.current_user_id()
          ));
      end if;
    end if;
  end if;
  if v_matched_user_id is null and f_user_id is null and v_matched_authentication_id is null then
    -- Create and return a new user account
    return app_private.register_user(f_service, f_identifier, f_profile, f_auth_details, true);
  else
    if v_matched_authentication_id is not null then
      update app_public.user_authentications
        set details = f_profile
        where id = v_matched_authentication_id;
      update app_private.user_authentication_secrets
        set details = f_auth_details
        where user_authentication_id = v_matched_authentication_id;
      update app_public.users
        set
          name = coalesce(users.name, v_name),
          avatar_url = coalesce(users.avatar_url, v_avatar_url)
        where id = v_matched_user_id
        returning  * into v_user;
      return v_user;
    else
      -- v_matched_authentication_id is null
      -- -> v_matched_user_id is null (they're paired)
      -- -> f_user_id is not null (because the if clause above)
      -- -> v_matched_authentication_id is not null (because of the separate if block above creating a user_authentications)
      -- -> contradiction.
      raise exception 'This should not occur';
    end if;
  end if;
end;
$$;


--
-- Name: FUNCTION link_or_register_user(f_user_id uuid, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.link_or_register_user(f_user_id uuid, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json) IS 'If you''re logged in, this will link an additional OAuth login to your account if necessary. If you''re logged out it may find if an account already exists (based on OAuth details or email address) and return that, or create a new user account if necessary.';


--
-- Name: sessions; Type: TABLE; Schema: app_private; Owner: -
--

CREATE TABLE app_private.sessions (
    uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_active timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: login(public.citext, text); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.login(username public.citext, password text) RETURNS app_private.sessions
    LANGUAGE plpgsql STRICT
    AS $$
declare
  v_user app_public.users;
  v_user_secret app_private.user_secrets;
  v_login_attempt_window_duration interval = interval '5 minutes';
  v_session app_private.sessions;
begin
  if username like '%@%' then
    -- It's an email
    select users.* into v_user
    from app_public.users
    inner join app_public.user_emails
    on (user_emails.user_id = users.id)
    where user_emails.email = login.username
    order by
      user_emails.is_verified desc, -- Prefer verified email
      user_emails.created_at asc -- Failing that, prefer the first registered (unverified users _should_ verify before logging in)
    limit 1;
  else
    -- It's a username
    select users.* into v_user
    from app_public.users
    where users.username = login.username;
  end if;

  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from app_private.user_secrets
    where user_secrets.user_id = v_user.id;

    -- Have there been too many login attempts?
    if (
      v_user_secret.first_failed_password_attempt is not null
    and
      v_user_secret.first_failed_password_attempt > NOW() - v_login_attempt_window_duration
    and
      v_user_secret.failed_password_attempts >= 3
    ) then
      raise exception 'User account locked - too many login attempts. Try again after 5 minutes.' using errcode = 'LOCKD';
    end if;

    -- Not too many login attempts, let's check the password.
    -- NOTE: `password_hash` could be null, this is fine since `NULL = NULL` is null, and null is falsy.
    if v_user_secret.password_hash = crypt(password, v_user_secret.password_hash) then
      -- Excellent - they're logged in! Let's reset the attempt tracking
      update app_private.user_secrets
      set failed_password_attempts = 0, first_failed_password_attempt = null, last_login_at = now()
      where user_id = v_user.id;
      -- Create a session for the user
      insert into app_private.sessions (user_id) values (v_user.id) returning * into v_session;
      -- And finally return the session
      return v_session;
    else
      -- Wrong password, bump all the attempt tracking figures
      update app_private.user_secrets
      set
        failed_password_attempts = (case when first_failed_password_attempt is null or first_failed_password_attempt < now() - v_login_attempt_window_duration then 1 else failed_password_attempts + 1 end),
        first_failed_password_attempt = (case when first_failed_password_attempt is null or first_failed_password_attempt < now() - v_login_attempt_window_duration then now() else first_failed_password_attempt end)
      where user_id = v_user.id;
      return null; -- Must not throw otherwise transaction will be aborted and attempts won't be recorded
    end if;
  else
    -- No user with that email/username was found
    return null;
  end if;
end;
$$;


--
-- Name: FUNCTION login(username public.citext, password text); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.login(username public.citext, password text) IS 'Returns a user that matches the username/password combo, or null on failure.';


--
-- Name: really_create_user(public.citext, text, boolean, text, text, text); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.really_create_user(username public.citext, email text, email_is_verified boolean, name text, avatar_url text, password text DEFAULT NULL::text) RETURNS app_public.users
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
  v_user app_public.users;
  v_username citext = username;
begin
  if password is not null then
    perform app_private.assert_valid_password(password);
  end if;
  if email is null then
    raise exception 'Email is required' using errcode = 'MODAT';
  end if;

  -- Insert the new user
  insert into app_public.users (username, name, avatar_url) values
    (v_username, name, avatar_url)
    returning * into v_user;

	-- Add the user's email
  insert into app_public.user_emails (user_id, email, is_verified, is_primary)
  values (v_user.id, email, email_is_verified, email_is_verified);

  -- Store the password
  if password is not null then
    update app_private.user_secrets
    set password_hash = crypt(password, gen_salt('bf'))
    where user_id = v_user.id;
  end if;

  -- Refresh the user
  select * into v_user from app_public.users where id = v_user.id;

  return v_user;
end;
$$;


--
-- Name: FUNCTION really_create_user(username public.citext, email text, email_is_verified boolean, name text, avatar_url text, password text); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.really_create_user(username public.citext, email text, email_is_verified boolean, name text, avatar_url text, password text) IS 'Creates a user account. All arguments are optional, it trusts the calling method to perform sanitisation.';


--
-- Name: register_user(character varying, character varying, json, json, boolean); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean DEFAULT false) RETURNS app_public.users
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
  v_user app_public.users;
  v_email citext;
  v_name text;
  v_username citext;
  v_avatar_url text;
  v_user_authentication_id uuid;
begin
  -- Extract data from the user???s OAuth profile data.
  v_email := f_profile ->> 'email';
  v_name := f_profile ->> 'name';
  v_username := f_profile ->> 'username';
  v_avatar_url := f_profile ->> 'avatar_url';

  -- Sanitise the username, and make it unique if necessary.
  if v_username is null then
    v_username = coalesce(v_name, 'user');
  end if;
  v_username = regexp_replace(v_username, '^[^a-z]+', '', 'gi');
  v_username = regexp_replace(v_username, '[^a-z0-9]+', '_', 'gi');
  if v_username is null or length(v_username) < 3 then
    v_username = 'user';
  end if;
  select (
    case
    when i = 0 then v_username
    else v_username || i::text
    end
  ) into v_username from generate_series(0, 1000) i
  where not exists(
    select 1
    from app_public.users
    where users.username = (
      case
      when i = 0 then v_username
      else v_username || i::text
      end
    )
  )
  limit 1;

  -- Create the user account
  v_user = app_private.really_create_user(
    username => v_username,
    email => v_email,
    email_is_verified => f_email_is_verified,
    name => v_name,
    avatar_url => v_avatar_url
  );

  -- Insert the user???s private account data (e.g. OAuth tokens)
  insert into app_public.user_authentications (user_id, service, identifier, details) values
    (v_user.id, f_service, f_identifier, f_profile) returning id into v_user_authentication_id;
  insert into app_private.user_authentication_secrets (user_authentication_id, details) values
    (v_user_authentication_id, f_auth_details);

  return v_user;
end;
$$;


--
-- Name: FUNCTION register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean) IS 'Used to register a user from information gleaned from OAuth. Primarily used by link_or_register_user';


--
-- Name: reset_password(uuid, text, text); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.reset_password(user_id uuid, reset_token text, new_password text) RETURNS boolean
    LANGUAGE plpgsql STRICT
    AS $$
declare
  v_user app_public.users;
  v_user_secret app_private.user_secrets;
  v_token_max_duration interval = interval '3 days';
begin
  select users.* into v_user
  from app_public.users
  where id = user_id;

  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from app_private.user_secrets
    where user_secrets.user_id = v_user.id;

    -- Have there been too many reset attempts?
    if (
      v_user_secret.first_failed_reset_password_attempt is not null
    and
      v_user_secret.first_failed_reset_password_attempt > NOW() - v_token_max_duration
    and
      v_user_secret.failed_reset_password_attempts >= 20
    ) then
      raise exception 'Password reset locked - too many reset attempts' using errcode = 'LOCKD';
    end if;

    -- Not too many reset attempts, let's check the token
    if v_user_secret.reset_password_token = reset_token then
      -- Excellent - they're legit
      perform app_private.assert_valid_password(new_password);
      -- Let's reset the password as requested
      update app_private.user_secrets
      set
        password_hash = crypt(new_password, gen_salt('bf')),
        failed_password_attempts = 0,
        first_failed_password_attempt = null,
        reset_password_token = null,
        reset_password_token_generated = null,
        failed_reset_password_attempts = 0,
        first_failed_reset_password_attempt = null
      where user_secrets.user_id = v_user.id;
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'reset_password',
          'user_id', v_user.id,
          'current_user_id', app_public.current_user_id()
        ));
      return true;
    else
      -- Wrong token, bump all the attempt tracking figures
      update app_private.user_secrets
      set
        failed_reset_password_attempts = (case when first_failed_reset_password_attempt is null or first_failed_reset_password_attempt < now() - v_token_max_duration then 1 else failed_reset_password_attempts + 1 end),
        first_failed_reset_password_attempt = (case when first_failed_reset_password_attempt is null or first_failed_reset_password_attempt < now() - v_token_max_duration then now() else first_failed_reset_password_attempt end)
      where user_secrets.user_id = v_user.id;
      return null;
    end if;
  else
    -- No user with that id was found
    return null;
  end if;
end;
$$;


--
-- Name: tg__add_audit_job(); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.tg__add_audit_job() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $_$
declare
  v_user_id uuid;
  v_type text = TG_ARGV[0];
  v_user_id_attribute text = TG_ARGV[1];
  v_extra_attribute1 text = TG_ARGV[2];
  v_extra_attribute2 text = TG_ARGV[3];
  v_extra_attribute3 text = TG_ARGV[4];
  v_extra1 text;
  v_extra2 text;
  v_extra3 text;
begin
  if v_user_id_attribute is null then
    raise exception 'Invalid tg__add_audit_job call';
  end if;

  execute 'select ($1.' || quote_ident(v_user_id_attribute) || ')::uuid'
    using (case when TG_OP = 'INSERT' then NEW else OLD end)
    into v_user_id;

  if v_extra_attribute1 is not null then
    execute 'select ($1.' || quote_ident(v_extra_attribute1) || ')::text'
      using (case when TG_OP = 'DELETE' then OLD else NEW end)
      into v_extra1;
  end if;
  if v_extra_attribute2 is not null then
    execute 'select ($1.' || quote_ident(v_extra_attribute2) || ')::text'
      using (case when TG_OP = 'DELETE' then OLD else NEW end)
      into v_extra2;
  end if;
  if v_extra_attribute3 is not null then
    execute 'select ($1.' || quote_ident(v_extra_attribute3) || ')::text'
      using (case when TG_OP = 'DELETE' then OLD else NEW end)
      into v_extra3;
  end if;

  if v_user_id is not null then
    perform graphile_worker.add_job(
      'user__audit',
      json_build_object(
        'type', v_type,
        'user_id', v_user_id,
        'extra1', v_extra1,
        'extra2', v_extra2,
        'extra3', v_extra3,
        'current_user_id', app_public.current_user_id(),
        'schema', TG_TABLE_SCHEMA,
        'table', TG_TABLE_NAME
      ));
  end if;

  return NEW;
end;
$_$;


--
-- Name: FUNCTION tg__add_audit_job(); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.tg__add_audit_job() IS 'For notifying a user that an auditable action has taken place. Call with audit event name, user ID attribute name, and optionally another value to be included (e.g. the PK of the table, or some other relevant information). e.g. `tg__add_audit_job(''added_email'', ''user_id'', ''email'')`';


--
-- Name: tg__add_job(); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.tg__add_job() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  perform graphile_worker.add_job(tg_argv[0], json_build_object('id', NEW.id));
  return NEW;
end;
$$;


--
-- Name: FUNCTION tg__add_job(); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.tg__add_job() IS 'Useful shortcut to create a job on insert/update. Pass the task name as the first trigger argument, and optionally the queue name as the second argument. The record id will automatically be available on the JSON payload.';


--
-- Name: tg__timestamps(); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.tg__timestamps() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then NOW() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= NOW() then OLD.updated_at + interval '1 millisecond' else NOW() end);
  return NEW;
end;
$$;


--
-- Name: FUNCTION tg__timestamps(); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.tg__timestamps() IS 'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';


--
-- Name: tg__update_total_reaction(); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.tg__update_total_reaction() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
    arg_table_name varchar;
    react_count integer := 0;
begin
    arg_table_name   := TG_ARGV[0];

  if NEW.react_type = 'up' then
      if OLD.react_type = 'up' then
        react_count = 0;
      elseif OLD.react_type = 'down' then
        react_count = 2;
      else
        react_count = 1;
      end if;
  elseif NEW.react_type = 'down' then
      if OLD.react_type = 'down' then
        react_count = 0;
      elseif OLD.react_type = 'up' then
        react_count = -2;
      else
        react_count = -1;
      end if;
  elseif NEW.react_type = 'none' then
    if OLD.react_type = 'up' then
      react_count = -1;
    elseif OLD.react_type = 'down' then
      react_count = 1;
    end if;
  end if;

  if arg_table_name = 'confession' then
    update app_public.confession set total_reaction = total_reaction + react_count where id = NEW.confession_id;
  elseif arg_table_name = 'comment' then
    update app_public.comment set total_reaction = total_reaction + react_count where id = NEW.comment_id;
  END if;

  return NEW;
end;
$$;


--
-- Name: tg_user_email_secrets__insert_with_user_email(); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.tg_user_email_secrets__insert_with_user_email() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
  v_verification_token text;
begin
  if NEW.is_verified is false then
    v_verification_token = encode(gen_random_bytes(7), 'hex');
  end if;
  insert into app_private.user_email_secrets(user_email_id, verification_token) values(NEW.id, v_verification_token);
  return NEW;
end;
$$;


--
-- Name: FUNCTION tg_user_email_secrets__insert_with_user_email(); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.tg_user_email_secrets__insert_with_user_email() IS 'Ensures that every user_email record has an associated user_email_secret record.';


--
-- Name: tg_user_secrets__insert_with_user(); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.tg_user_secrets__insert_with_user() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  insert into app_private.user_secrets(user_id) values(NEW.id);
  return NEW;
end;
$$;


--
-- Name: FUNCTION tg_user_secrets__insert_with_user(); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.tg_user_secrets__insert_with_user() IS 'Ensures that every user record has an associated user_secret record.';


--
-- Name: change_password(text, text); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.change_password(old_password text, new_password text) RETURNS boolean
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
  v_user app_public.users;
  v_user_secret app_private.user_secrets;
begin
  select users.* into v_user
  from app_public.users
  where id = app_public.current_user_id();

  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from app_private.user_secrets
    where user_secrets.user_id = v_user.id;

    if v_user_secret.password_hash = crypt(old_password, v_user_secret.password_hash) then
      perform app_private.assert_valid_password(new_password);
      -- Reset the password as requested
      update app_private.user_secrets
      set
        password_hash = crypt(new_password, gen_salt('bf'))
      where user_secrets.user_id = v_user.id;
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'change_password',
          'user_id', v_user.id,
          'current_user_id', app_public.current_user_id()
        ));
      return true;
    else
      raise exception 'Incorrect password' using errcode = 'CREDS';
    end if;
  else
    raise exception 'You must log in to change your password' using errcode = 'LOGIN';
  end if;
end;
$$;


--
-- Name: FUNCTION change_password(old_password text, new_password text); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.change_password(old_password text, new_password text) IS 'Enter your old password and a new password to change your password.';


--
-- Name: confirm_account_deletion(text); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.confirm_account_deletion(token text) RETURNS boolean
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
  v_user_secret app_private.user_secrets;
  v_token_max_duration interval = interval '3 days';
begin
  if app_public.current_user_id() is null then
    raise exception 'You must log in to delete your account' using errcode = 'LOGIN';
  end if;

  select * into v_user_secret
    from app_private.user_secrets
    where user_secrets.user_id = app_public.current_user_id();

  if v_user_secret is null then
    -- Success: they're already deleted
    return true;
  end if;

  -- Check the token
  if (
    -- token is still valid
    v_user_secret.delete_account_token_generated > now() - v_token_max_duration
  and
    -- token matches
    v_user_secret.delete_account_token = token
  ) then
    -- Token passes; delete their account :(
    delete from app_public.users where id = app_public.current_user_id();
    return true;
  end if;

  raise exception 'The supplied token was incorrect - perhaps you''re logged in to the wrong account, or the token has expired?' using errcode = 'DNIED';
end;
$$;


--
-- Name: FUNCTION confirm_account_deletion(token text); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.confirm_account_deletion(token text) IS 'If you''re certain you want to delete your account, use `requestAccountDeletion` to request an account deletion token, and then supply the token through this mutation to complete account deletion.';


--
-- Name: current_user_id(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.current_user_id() RETURNS uuid
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
  select user_id from app_private.sessions where uuid = app_public.current_session_id();
$$;


--
-- Name: FUNCTION current_user_id(); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.current_user_id() IS 'Handy method to get the current user ID for use in RLS policies, etc; in GraphQL, use `currentUser{id}` instead.';


--
-- Name: confession; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.confession (
    id integer NOT NULL,
    title character varying(255),
    content text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    slug character varying(120),
    image character varying(255),
    user_id uuid DEFAULT app_public.current_user_id(),
    total_reaction integer DEFAULT 0 NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: create_cfs(character varying, character varying, character varying, integer, character varying); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.create_cfs(title character varying, content character varying, slug character varying, cat_id integer, image character varying) RETURNS app_public.confession
    LANGUAGE plpgsql STRICT SECURITY DEFINER
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
	$$;


--
-- Name: comment; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.comment (
    id integer NOT NULL,
    confession_id integer,
    author_name character varying(255),
    content text,
    created_at bigint,
    image character varying(255),
    updated_at timestamp with time zone DEFAULT now(),
    user_id uuid DEFAULT app_public.current_user_id(),
    parent_id integer,
    total_reaction integer DEFAULT 0 NOT NULL
);


--
-- Name: create_or_update_comment_reaction(integer, app_public.reaction_type); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.create_or_update_comment_reaction(comment_id integer, react_type app_public.reaction_type) RETURNS app_public.comment
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'app_public', 'app_private', 'app_hidden', 'public'
    AS $$
declare
  v_comment app_public.comment;
begin
	 INSERT INTO app_public.user_comment_reaction (comment_id, react_type)
   VALUES(comment_id, react_type)
   ON CONFLICT ON CONSTRAINT user_id_comment_id_unique_key
   DO
      UPDATE SET react_type = EXCLUDED.react_type;

   select * into v_comment from app_public.comment where id = comment_id;
   return v_comment;
end;
$$;


--
-- Name: create_or_update_confession_reaction(integer, app_public.reaction_type); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.create_or_update_confession_reaction(confession_id integer, react_type app_public.reaction_type) RETURNS app_public.confession
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'app_public', 'app_private', 'app_hidden', 'public'
    AS $$
declare
  v_confession app_public.confession;
begin
	 INSERT INTO app_public.user_confession_reaction (confession_id, react_type)
   VALUES(confession_id, react_type)
   ON CONFLICT ON CONSTRAINT user_id_confession_id_unique_key
   DO
      UPDATE SET react_type = EXCLUDED.react_type;

   select * into v_confession from app_public.confession where id = confession_id;
   return v_confession;
end;
$$;


--
-- Name: current_session_id(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.current_session_id() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select nullif(pg_catalog.current_setting('jwt.claims.session_id', true), '')::uuid;
$$;


--
-- Name: FUNCTION current_session_id(); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.current_session_id() IS 'Handy method to get the current session ID.';


--
-- Name: current_user(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public."current_user"() RETURNS app_public.users
    LANGUAGE sql STABLE
    AS $$
  select users.* from app_public.users where id = app_public.current_user_id();
$$;


--
-- Name: FUNCTION "current_user"(); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public."current_user"() IS 'The currently logged in user (or null if not logged in).';


--
-- Name: delete_category(integer); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.delete_category(cat_id integer) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  if exists(
    select 1
    from app_public.category
    where (
      created_by = app_public.current_user_id()
      or exists ( select * from app_public.users where id = app_public.current_user_id() and is_admin = true )
    )
    and id = cat_id
  ) then
    update app_public.category set deleted_at = now() where id = cat_id;
  end if;
end;
$$;


--
-- Name: delete_cfs(integer); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.delete_cfs(p_confession_id integer) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
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
$$;


--
-- Name: forgot_password(public.citext); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.forgot_password(email public.citext) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
  v_user_email app_public.user_emails;
  v_token text;
  v_token_min_duration_between_emails interval = interval '3 minutes';
  v_token_max_duration interval = interval '3 days';
  v_now timestamptz = clock_timestamp(); -- Function can be called multiple during transaction
  v_latest_attempt timestamptz;
begin
  -- Find the matching user_email:
  select user_emails.* into v_user_email
  from app_public.user_emails
  where user_emails.email = forgot_password.email
  order by is_verified desc, id desc;

  -- If there is no match:
  if v_user_email is null then
    -- This email doesn't exist in the system; trigger an email stating as much.

    -- We do not allow this email to be triggered more than once every 15
    -- minutes, so we need to track it:
    insert into app_private.unregistered_email_password_resets (email, latest_attempt)
      values (forgot_password.email, v_now)
      on conflict on constraint unregistered_email_pkey
      do update
        set latest_attempt = v_now, attempts = unregistered_email_password_resets.attempts + 1
        where unregistered_email_password_resets.latest_attempt < v_now - interval '15 minutes'
      returning latest_attempt into v_latest_attempt;

    if v_latest_attempt = v_now then
      perform graphile_worker.add_job(
        'user__forgot_password_unregistered_email',
        json_build_object('email', forgot_password.email::text)
      );
    end if;

    -- TODO: we should clear out the unregistered_email_password_resets table periodically.

    return;
  end if;

  -- There was a match.
  -- See if we've triggered a reset recently:
  if exists(
    select 1
    from app_private.user_email_secrets
    where user_email_id = v_user_email.id
    and password_reset_email_sent_at is not null
    and password_reset_email_sent_at > v_now - v_token_min_duration_between_emails
  ) then
    -- If so, take no action.
    return;
  end if;

  -- Fetch or generate reset token:
  update app_private.user_secrets
  set
    reset_password_token = (
      case
      when reset_password_token is null or reset_password_token_generated < v_now - v_token_max_duration
      then encode(gen_random_bytes(7), 'hex')
      else reset_password_token
      end
    ),
    reset_password_token_generated = (
      case
      when reset_password_token is null or reset_password_token_generated < v_now - v_token_max_duration
      then v_now
      else reset_password_token_generated
      end
    )
  where user_id = v_user_email.user_id
  returning reset_password_token into v_token;

  -- Don't allow spamming an email:
  update app_private.user_email_secrets
  set password_reset_email_sent_at = v_now
  where user_email_id = v_user_email.id;

  -- Trigger email send:
  perform graphile_worker.add_job(
    'user__forgot_password',
    json_build_object('id', v_user_email.user_id, 'email', v_user_email.email::text, 'token', v_token)
  );

end;
$$;


--
-- Name: FUNCTION forgot_password(email public.citext); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.forgot_password(email public.citext) IS 'If you''ve forgotten your password, give us one of your email addresses and we''ll send you a reset token. Note this only works if you have added an email address!';


--
-- Name: get_cfs_by_cat(integer); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_cfs_by_cat(cat_id integer) RETURNS SETOF app_public.confession
    LANGUAGE sql STABLE
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
$$;


--
-- Name: get_cfs_by_cat_slug(character varying); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_cfs_by_cat_slug(cat_slug character varying) RETURNS SETOF app_public.confession
    LANGUAGE sql STABLE
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
$$;


--
-- Name: get_relative_confessions(integer); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.get_relative_confessions(target_confession_id integer) RETURNS SETOF app_public.confession
    LANGUAGE sql STABLE
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
$$;


--
-- Name: is_user_logged_in(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.is_user_logged_in() RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
  select id is not null from app_public.users where id = app_public.current_user_id();
$$;


--
-- Name: logout(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.logout() RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  -- Delete the session
  delete from app_private.sessions where uuid = app_public.current_session_id();
  -- Clear the identifier from the transaction
  perform set_config('jwt.claims.session_id', '', true);
end;
$$;


--
-- Name: user_emails; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.user_emails (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid DEFAULT app_public.current_user_id() NOT NULL,
    email public.citext NOT NULL,
    is_verified boolean DEFAULT false NOT NULL,
    is_primary boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_emails_email_check CHECK ((email OPERATOR(public.~) '[^@]+@[^@]+\.[^@]+'::public.citext)),
    CONSTRAINT user_emails_must_be_verified_to_be_primary CHECK (((is_primary IS FALSE) OR (is_verified IS TRUE)))
);


--
-- Name: TABLE user_emails; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.user_emails IS 'Information about a user''s email address.';


--
-- Name: COLUMN user_emails.email; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_emails.email IS 'The users email address, in `a@b.c` format.';


--
-- Name: COLUMN user_emails.is_verified; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_emails.is_verified IS 'True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise.';


--
-- Name: make_email_primary(uuid); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.make_email_primary(email_id uuid) RETURNS app_public.user_emails
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
  v_user_email app_public.user_emails;
begin
  select * into v_user_email from app_public.user_emails where id = email_id and user_id = app_public.current_user_id();
  if v_user_email is null then
    raise exception 'That''s not your email' using errcode = 'DNIED';
    return null;
  end if;
  if v_user_email.is_verified is false then
    raise exception 'You may not make an unverified email primary' using errcode = 'VRFY1';
  end if;
  update app_public.user_emails set is_primary = false where user_id = app_public.current_user_id() and is_primary is true and id <> email_id;
  update app_public.user_emails set is_primary = true where user_id = app_public.current_user_id() and is_primary is not true and id = email_id returning * into v_user_email;
  return v_user_email;
end;
$$;


--
-- Name: FUNCTION make_email_primary(email_id uuid); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.make_email_primary(email_id uuid) IS 'Your primary email is where we''ll notify of account events; other emails may be used for discovery or login. Use this when you''re changing your email address.';


--
-- Name: request_account_deletion(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.request_account_deletion() RETURNS boolean
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
declare
  v_user_email app_public.user_emails;
  v_token text;
  v_token_max_duration interval = interval '3 days';
begin
  if app_public.current_user_id() is null then
    raise exception 'You must log in to delete your account' using errcode = 'LOGIN';
  end if;

  -- Get the email to send account deletion token to
  select * into v_user_email
    from app_public.user_emails
    where user_id = app_public.current_user_id()
    order by is_primary desc, is_verified desc, id desc
    limit 1;

  -- Fetch or generate token
  update app_private.user_secrets
  set
    delete_account_token = (
      case
      when delete_account_token is null or delete_account_token_generated < NOW() - v_token_max_duration
      then encode(gen_random_bytes(7), 'hex')
      else delete_account_token
      end
    ),
    delete_account_token_generated = (
      case
      when delete_account_token is null or delete_account_token_generated < NOW() - v_token_max_duration
      then now()
      else delete_account_token_generated
      end
    )
  where user_id = app_public.current_user_id()
  returning delete_account_token into v_token;

  -- Trigger email send
  perform graphile_worker.add_job('user__send_delete_account_email', json_build_object('email', v_user_email.email::text, 'token', v_token));
  return true;
end;
$$;


--
-- Name: FUNCTION request_account_deletion(); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.request_account_deletion() IS 'Begin the account deletion flow by requesting the confirmation email';


--
-- Name: resend_email_verification_code(uuid); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.resend_email_verification_code(email_id uuid) RETURNS boolean
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  if exists(
    select 1
    from app_public.user_emails
    where user_emails.id = email_id
    and user_id = app_public.current_user_id()
    and is_verified is false
  ) then
    perform graphile_worker.add_job('user_emails__send_verification', json_build_object('id', email_id));
    return true;
  end if;
  return false;
end;
$$;


--
-- Name: FUNCTION resend_email_verification_code(email_id uuid); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.resend_email_verification_code(email_id uuid) IS 'If you didn''t receive the verification code for this email, we can resend it. We silently cap the rate of resends on the backend, so calls to this function may not result in another email being sent if it has been called recently.';


--
-- Name: tg__graphql_subscription(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.tg__graphql_subscription() RETURNS trigger
    LANGUAGE plpgsql
    AS $_$
declare
  v_process_new bool = (TG_OP = 'INSERT' OR TG_OP = 'UPDATE');
  v_process_old bool = (TG_OP = 'UPDATE' OR TG_OP = 'DELETE');
  v_event text = TG_ARGV[0];
  v_topic_template text = TG_ARGV[1];
  v_attribute text = TG_ARGV[2];
  v_record record;
  v_sub text;
  v_topic text;
  v_i int = 0;
  v_last_topic text;
begin
  for v_i in 0..1 loop
    if (v_i = 0) and v_process_new is true then
      v_record = new;
    elsif (v_i = 1) and v_process_old is true then
      v_record = old;
    else
      continue;
    end if;
     if v_attribute is not null then
      execute 'select $1.' || quote_ident(v_attribute)
        using v_record
        into v_sub;
    end if;
    if v_sub is not null then
      v_topic = replace(v_topic_template, '$1', v_sub);
    else
      v_topic = v_topic_template;
    end if;
    if v_topic is distinct from v_last_topic then
      -- This if statement prevents us from triggering the same notification twice
      v_last_topic = v_topic;
      perform pg_notify(v_topic, json_build_object(
        'event', v_event,
        'subject', v_sub,
        'id', v_record.id
      )::text);
    end if;
  end loop;
  return v_record;
end;
$_$;


--
-- Name: FUNCTION tg__graphql_subscription(); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.tg__graphql_subscription() IS 'This function enables the creation of simple focussed GraphQL subscriptions using database triggers. Read more here: https://www.graphile.org/postgraphile/subscriptions/#custom-subscriptions';


--
-- Name: tg_user_emails__forbid_if_verified(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.tg_user_emails__forbid_if_verified() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  if exists(select 1 from app_public.user_emails where email = NEW.email and is_verified is true) then
    raise exception 'An account using that email address has already been created.' using errcode='EMTKN';
  end if;
  return NEW;
end;
$$;


--
-- Name: tg_user_emails__prevent_delete_last_email(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.tg_user_emails__prevent_delete_last_email() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  if exists (
    with remaining as (
      select user_emails.user_id
      from app_public.user_emails
      inner join deleted
      on user_emails.user_id = deleted.user_id
      -- Don't delete last verified email
      where (user_emails.is_verified is true or not exists (
        select 1
        from deleted d2
        where d2.user_id = user_emails.user_id
        and d2.is_verified is true
      ))
      order by user_emails.id asc

      /*
       * Lock this table to prevent race conditions; see:
       * https://www.cybertec-postgresql.com/en/triggers-to-enforce-constraints/
       */
      for update of user_emails
    )
    select 1
    from app_public.users
    where id in (
      select user_id from deleted
      except
      select user_id from remaining
    )
  )
  then
    raise exception 'You must have at least one (verified) email address' using errcode = 'CDLEA';
  end if;

  return null;
end;
$$;


--
-- Name: tg_user_emails__verify_account_on_verified(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.tg_user_emails__verify_account_on_verified() RETURNS trigger
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  update app_public.users set is_verified = true where id = new.user_id and is_verified is false;
  return new;
end;
$$;


--
-- Name: tg_users__deletion_organization_checks_and_actions(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.tg_users__deletion_organization_checks_and_actions() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  -- Check they're not an organization owner
  if exists(
    select 1
    from app_public.organization_memberships
    where user_id = app_public.current_user_id()
    and is_owner is true
  ) then
    raise exception 'You cannot delete your account until you are not the owner of any organizations.' using errcode = 'OWNER';
  end if;

  -- Reassign billing contact status back to the organization owner
  update app_public.organization_memberships
    set is_billing_contact = true
    where is_owner = true
    and organization_id in (
      select organization_id
      from app_public.organization_memberships my_memberships
      where my_memberships.user_id = app_public.current_user_id()
      and is_billing_contact is true
    );

  return old;
end;
$$;


--
-- Name: users_has_password(app_public.users); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.users_has_password(u app_public.users) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
  select (password_hash is not null) from app_private.user_secrets where user_secrets.user_id = u.id and u.id = app_public.current_user_id();
$$;


--
-- Name: verify_email(uuid, text); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.verify_email(user_email_id uuid, token text) RETURNS boolean
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public', 'pg_temp'
    AS $$
begin
  update app_public.user_emails
  set
    is_verified = true,
    is_primary = is_primary or not exists(
      select 1 from app_public.user_emails other_email where other_email.user_id = user_emails.user_id and other_email.is_primary is true
    )
  where id = user_email_id
  and exists(
    select 1 from app_private.user_email_secrets where user_email_secrets.user_email_id = user_emails.id and verification_token = token
  );
  return found;
end;
$$;


--
-- Name: FUNCTION verify_email(user_email_id uuid, token text); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.verify_email(user_email_id uuid, token text) IS 'Once you have received a verification token for your email, you may call this mutation with that token to make your email verified.';


--
-- Name: connect_pg_simple_sessions; Type: TABLE; Schema: app_private; Owner: -
--

CREATE TABLE app_private.connect_pg_simple_sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp without time zone NOT NULL
);


--
-- Name: unregistered_email_password_resets; Type: TABLE; Schema: app_private; Owner: -
--

CREATE TABLE app_private.unregistered_email_password_resets (
    email public.citext NOT NULL,
    attempts integer DEFAULT 1 NOT NULL,
    latest_attempt timestamp with time zone NOT NULL
);


--
-- Name: TABLE unregistered_email_password_resets; Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON TABLE app_private.unregistered_email_password_resets IS 'If someone tries to recover the password for an email that is not registered in our system, this table enables us to rate-limit outgoing emails to avoid spamming.';


--
-- Name: COLUMN unregistered_email_password_resets.attempts; Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON COLUMN app_private.unregistered_email_password_resets.attempts IS 'We store the number of attempts to help us detect accounts being attacked.';


--
-- Name: COLUMN unregistered_email_password_resets.latest_attempt; Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON COLUMN app_private.unregistered_email_password_resets.latest_attempt IS 'We store the time the last password reset was sent to this email to prevent the email getting flooded.';


--
-- Name: user_authentication_secrets; Type: TABLE; Schema: app_private; Owner: -
--

CREATE TABLE app_private.user_authentication_secrets (
    user_authentication_id uuid NOT NULL,
    details jsonb DEFAULT '{}'::jsonb NOT NULL
);


--
-- Name: user_email_secrets; Type: TABLE; Schema: app_private; Owner: -
--

CREATE TABLE app_private.user_email_secrets (
    user_email_id uuid NOT NULL,
    verification_token text,
    verification_email_sent_at timestamp with time zone,
    password_reset_email_sent_at timestamp with time zone
);


--
-- Name: TABLE user_email_secrets; Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON TABLE app_private.user_email_secrets IS 'The contents of this table should never be visible to the user. Contains data mostly related to email verification and avoiding spamming users.';


--
-- Name: COLUMN user_email_secrets.password_reset_email_sent_at; Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON COLUMN app_private.user_email_secrets.password_reset_email_sent_at IS 'We store the time the last password reset was sent to this email to prevent the email getting flooded.';


--
-- Name: user_secrets; Type: TABLE; Schema: app_private; Owner: -
--

CREATE TABLE app_private.user_secrets (
    user_id uuid NOT NULL,
    password_hash text,
    last_login_at timestamp with time zone DEFAULT now() NOT NULL,
    failed_password_attempts integer DEFAULT 0 NOT NULL,
    first_failed_password_attempt timestamp with time zone,
    reset_password_token text,
    reset_password_token_generated timestamp with time zone,
    failed_reset_password_attempts integer DEFAULT 0 NOT NULL,
    first_failed_reset_password_attempt timestamp with time zone,
    delete_account_token text,
    delete_account_token_generated timestamp with time zone
);


--
-- Name: TABLE user_secrets; Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON TABLE app_private.user_secrets IS 'The contents of this table should never be visible to the user. Contains data mostly related to authentication.';


--
-- Name: category; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.category (
    id integer NOT NULL,
    name character varying(255),
    slug character varying(50),
    image character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone,
    created_by uuid DEFAULT app_public.current_user_id(),
    banner_image character varying(255)
);


--
-- Name: category_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.category_id_seq OWNED BY app_public.category.id;


--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.comment_id_seq OWNED BY app_public.comment.id;


--
-- Name: confession_category; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.confession_category (
    confession_id integer NOT NULL,
    category_id integer NOT NULL
);


--
-- Name: confession_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.confession_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: confession_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.confession_id_seq OWNED BY app_public.confession.id;


--
-- Name: feedback; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.feedback (
    id integer NOT NULL,
    user_id uuid DEFAULT app_public.current_user_id(),
    content character varying(512) NOT NULL,
    parent_id integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.feedback_id_seq OWNED BY app_public.feedback.id;


--
-- Name: user_authentications; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.user_authentications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    service text NOT NULL,
    identifier text NOT NULL,
    details jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: TABLE user_authentications; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.user_authentications IS 'Contains information about the login providers this user has used, so that they may disconnect them should they wish.';


--
-- Name: COLUMN user_authentications.service; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_authentications.service IS 'The login service used, e.g. `twitter` or `github`.';


--
-- Name: COLUMN user_authentications.identifier; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_authentications.identifier IS 'A unique identifier for the user within the login service.';


--
-- Name: COLUMN user_authentications.details; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_authentications.details IS 'Additional profile details extracted from this login method';


--
-- Name: user_comment_reaction; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.user_comment_reaction (
    id integer NOT NULL,
    user_id uuid DEFAULT app_public.current_user_id(),
    comment_id integer NOT NULL,
    react_type app_public.reaction_type NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_comment_reaction_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.user_comment_reaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_comment_reaction_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.user_comment_reaction_id_seq OWNED BY app_public.user_comment_reaction.id;


--
-- Name: user_confession_reaction; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.user_confession_reaction (
    id integer NOT NULL,
    user_id uuid DEFAULT app_public.current_user_id(),
    confession_id integer NOT NULL,
    react_type app_public.reaction_type NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_confession_reaction_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.user_confession_reaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_confession_reaction_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.user_confession_reaction_id_seq OWNED BY app_public.user_confession_reaction.id;


--
-- Name: category id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.category ALTER COLUMN id SET DEFAULT nextval('app_public.category_id_seq'::regclass);


--
-- Name: comment id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.comment ALTER COLUMN id SET DEFAULT nextval('app_public.comment_id_seq'::regclass);


--
-- Name: confession id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.confession ALTER COLUMN id SET DEFAULT nextval('app_public.confession_id_seq'::regclass);


--
-- Name: feedback id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.feedback ALTER COLUMN id SET DEFAULT nextval('app_public.feedback_id_seq'::regclass);


--
-- Name: user_comment_reaction id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_comment_reaction ALTER COLUMN id SET DEFAULT nextval('app_public.user_comment_reaction_id_seq'::regclass);


--
-- Name: user_confession_reaction id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_confession_reaction ALTER COLUMN id SET DEFAULT nextval('app_public.user_confession_reaction_id_seq'::regclass);


--
-- Name: connect_pg_simple_sessions session_pkey; Type: CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.connect_pg_simple_sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (uuid);


--
-- Name: unregistered_email_password_resets unregistered_email_pkey; Type: CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.unregistered_email_password_resets
    ADD CONSTRAINT unregistered_email_pkey PRIMARY KEY (email);


--
-- Name: user_authentication_secrets user_authentication_secrets_pkey; Type: CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.user_authentication_secrets
    ADD CONSTRAINT user_authentication_secrets_pkey PRIMARY KEY (user_authentication_id);


--
-- Name: user_email_secrets user_email_secrets_pkey; Type: CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.user_email_secrets
    ADD CONSTRAINT user_email_secrets_pkey PRIMARY KEY (user_email_id);


--
-- Name: user_secrets user_secrets_pkey; Type: CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.user_secrets
    ADD CONSTRAINT user_secrets_pkey PRIMARY KEY (user_id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: category category_slug_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.category
    ADD CONSTRAINT category_slug_key UNIQUE (slug);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: confession_category confession_category_confession_id_category_id_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.confession_category
    ADD CONSTRAINT confession_category_confession_id_category_id_key UNIQUE (confession_id, category_id);


--
-- Name: confession confession_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.confession
    ADD CONSTRAINT confession_pkey PRIMARY KEY (id);


--
-- Name: confession confession_slug_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.confession
    ADD CONSTRAINT confession_slug_key UNIQUE (slug);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: user_authentications uniq_user_authentications; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_authentications
    ADD CONSTRAINT uniq_user_authentications UNIQUE (service, identifier);


--
-- Name: user_authentications user_authentications_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_authentications
    ADD CONSTRAINT user_authentications_pkey PRIMARY KEY (id);


--
-- Name: user_comment_reaction user_comment_reaction_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_comment_reaction
    ADD CONSTRAINT user_comment_reaction_pkey PRIMARY KEY (id);


--
-- Name: user_confession_reaction user_confession_reaction_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_confession_reaction
    ADD CONSTRAINT user_confession_reaction_pkey PRIMARY KEY (id);


--
-- Name: user_emails user_emails_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails
    ADD CONSTRAINT user_emails_pkey PRIMARY KEY (id);


--
-- Name: user_emails user_emails_user_id_email_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails
    ADD CONSTRAINT user_emails_user_id_email_key UNIQUE (user_id, email);


--
-- Name: user_comment_reaction user_id_comment_id_unique_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_comment_reaction
    ADD CONSTRAINT user_id_comment_id_unique_key UNIQUE (user_id, comment_id);


--
-- Name: user_confession_reaction user_id_confession_id_unique_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_confession_reaction
    ADD CONSTRAINT user_id_confession_id_unique_key UNIQUE (user_id, confession_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: app_private; Owner: -
--

CREATE INDEX sessions_user_id_idx ON app_private.sessions USING btree (user_id);


--
-- Name: category_created_by_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX category_created_by_idx ON app_public.category USING btree (created_by);


--
-- Name: category_deleted_at_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX category_deleted_at_idx ON app_public.category USING btree (deleted_at);


--
-- Name: comment_confession_id_index; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX comment_confession_id_index ON app_public.comment USING btree (confession_id);


--
-- Name: comment_parent_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX comment_parent_id_idx ON app_public.comment USING btree (parent_id);


--
-- Name: confession_category_category_id_index; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX confession_category_category_id_index ON app_public.confession_category USING btree (category_id);


--
-- Name: confession_category_confession_id_index; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX confession_category_confession_id_index ON app_public.confession_category USING btree (confession_id);


--
-- Name: confession_deleted_at_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX confession_deleted_at_idx ON app_public.confession USING btree (deleted_at);


--
-- Name: feedback_parent_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX feedback_parent_id_idx ON app_public.feedback USING btree (parent_id);


--
-- Name: feedback_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX feedback_user_id_idx ON app_public.feedback USING btree (user_id);


--
-- Name: idx_category_slug; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_category_slug ON app_public.category USING btree (slug);


--
-- Name: idx_comment_user; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_comment_user ON app_public.comment USING btree (user_id);


--
-- Name: idx_confession_user; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_confession_user ON app_public.confession USING btree (user_id);


--
-- Name: idx_user_emails_primary; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_user_emails_primary ON app_public.user_emails USING btree (is_primary, user_id);


--
-- Name: idx_user_emails_user; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX idx_user_emails_user ON app_public.user_emails USING btree (user_id);


--
-- Name: uniq_user_emails_primary_email; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX uniq_user_emails_primary_email ON app_public.user_emails USING btree (user_id) WHERE (is_primary IS TRUE);


--
-- Name: uniq_user_emails_verified_email; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX uniq_user_emails_verified_email ON app_public.user_emails USING btree (email) WHERE (is_verified IS TRUE);


--
-- Name: user_authentications_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX user_authentications_user_id_idx ON app_public.user_authentications USING btree (user_id);


--
-- Name: user_comment_reaction_comment_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX user_comment_reaction_comment_id_idx ON app_public.user_comment_reaction USING btree (comment_id);


--
-- Name: user_comment_reaction_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX user_comment_reaction_user_id_idx ON app_public.user_comment_reaction USING btree (user_id);


--
-- Name: user_confession_reaction_confession_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX user_confession_reaction_confession_id_idx ON app_public.user_confession_reaction USING btree (confession_id);


--
-- Name: user_confession_reaction_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX user_confession_reaction_user_id_idx ON app_public.user_confession_reaction USING btree (user_id);


--
-- Name: category _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.category FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: comment _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.comment FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: confession _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.confession FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: feedback _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.feedback FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: user_authentications _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.user_authentications FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: user_comment_reaction _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.user_comment_reaction FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: user_confession_reaction _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.user_confession_reaction FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: user_emails _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.user_emails FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: users _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.users FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: user_emails _200_forbid_existing_email; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_forbid_existing_email BEFORE INSERT ON app_public.user_emails FOR EACH ROW EXECUTE FUNCTION app_public.tg_user_emails__forbid_if_verified();


--
-- Name: user_emails _500_audit_added; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_audit_added AFTER INSERT ON app_public.user_emails FOR EACH ROW EXECUTE FUNCTION app_private.tg__add_audit_job('added_email', 'user_id', 'id', 'email');


--
-- Name: user_authentications _500_audit_removed; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_audit_removed AFTER DELETE ON app_public.user_authentications FOR EACH ROW EXECUTE FUNCTION app_private.tg__add_audit_job('unlinked_account', 'user_id', 'service', 'identifier');


--
-- Name: user_emails _500_audit_removed; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_audit_removed AFTER DELETE ON app_public.user_emails FOR EACH ROW EXECUTE FUNCTION app_private.tg__add_audit_job('removed_email', 'user_id', 'id', 'email');


--
-- Name: users _500_deletion_organization_checks_and_actions; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_deletion_organization_checks_and_actions BEFORE DELETE ON app_public.users FOR EACH ROW WHEN ((app_public.current_user_id() IS NOT NULL)) EXECUTE FUNCTION app_public.tg_users__deletion_organization_checks_and_actions();


--
-- Name: users _500_gql_update; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_gql_update AFTER UPDATE ON app_public.users FOR EACH ROW EXECUTE FUNCTION app_public.tg__graphql_subscription('userChanged', 'graphql:user:$1', 'id');


--
-- Name: user_emails _500_insert_secrets; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_insert_secrets AFTER INSERT ON app_public.user_emails FOR EACH ROW EXECUTE FUNCTION app_private.tg_user_email_secrets__insert_with_user_email();


--
-- Name: users _500_insert_secrets; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_insert_secrets AFTER INSERT ON app_public.users FOR EACH ROW EXECUTE FUNCTION app_private.tg_user_secrets__insert_with_user();


--
-- Name: user_emails _500_prevent_delete_last; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_prevent_delete_last AFTER DELETE ON app_public.user_emails REFERENCING OLD TABLE AS deleted FOR EACH STATEMENT EXECUTE FUNCTION app_public.tg_user_emails__prevent_delete_last_email();


--
-- Name: user_emails _500_verify_account_on_verified; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _500_verify_account_on_verified AFTER INSERT OR UPDATE OF is_verified ON app_public.user_emails FOR EACH ROW WHEN ((new.is_verified IS TRUE)) EXECUTE FUNCTION app_public.tg_user_emails__verify_account_on_verified();


--
-- Name: user_emails _900_send_verification_email; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _900_send_verification_email AFTER INSERT ON app_public.user_emails FOR EACH ROW WHEN ((new.is_verified IS FALSE)) EXECUTE FUNCTION app_private.tg__add_job('user_emails__send_verification');


--
-- Name: user_comment_reaction update_total_reaction; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER update_total_reaction AFTER INSERT OR UPDATE ON app_public.user_comment_reaction FOR EACH ROW EXECUTE FUNCTION app_private.tg__update_total_reaction('comment');


--
-- Name: user_confession_reaction update_total_reaction; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER update_total_reaction AFTER INSERT OR UPDATE ON app_public.user_confession_reaction FOR EACH ROW EXECUTE FUNCTION app_private.tg__update_total_reaction('confession');


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: user_authentication_secrets user_authentication_secrets_user_authentication_id_fkey; Type: FK CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.user_authentication_secrets
    ADD CONSTRAINT user_authentication_secrets_user_authentication_id_fkey FOREIGN KEY (user_authentication_id) REFERENCES app_public.user_authentications(id) ON DELETE CASCADE;


--
-- Name: user_email_secrets user_email_secrets_user_email_id_fkey; Type: FK CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.user_email_secrets
    ADD CONSTRAINT user_email_secrets_user_email_id_fkey FOREIGN KEY (user_email_id) REFERENCES app_public.user_emails(id) ON DELETE CASCADE;


--
-- Name: user_secrets user_secrets_user_id_fkey; Type: FK CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.user_secrets
    ADD CONSTRAINT user_secrets_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: category category_created_by_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.category
    ADD CONSTRAINT category_created_by_fkey FOREIGN KEY (created_by) REFERENCES app_public.users(id) ON DELETE SET NULL;


--
-- Name: comment comment_parent_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.comment
    ADD CONSTRAINT comment_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES app_public.comment(id);


--
-- Name: comment comment_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.comment
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id);


--
-- Name: confession_category confession_category_category_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.confession_category
    ADD CONSTRAINT confession_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES app_public.category(id) ON DELETE CASCADE;


--
-- Name: confession_category confession_category_confession_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.confession_category
    ADD CONSTRAINT confession_category_confession_id_fkey FOREIGN KEY (confession_id) REFERENCES app_public.confession(id) ON DELETE CASCADE;


--
-- Name: confession confession_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.confession
    ADD CONSTRAINT confession_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id);


--
-- Name: feedback feedback_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.feedback
    ADD CONSTRAINT feedback_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE SET NULL;


--
-- Name: comment fk_confession; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.comment
    ADD CONSTRAINT fk_confession FOREIGN KEY (confession_id) REFERENCES app_public.confession(id) ON DELETE CASCADE;


--
-- Name: user_authentications user_authentications_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_authentications
    ADD CONSTRAINT user_authentications_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: user_comment_reaction user_comment_reaction_comment_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_comment_reaction
    ADD CONSTRAINT user_comment_reaction_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES app_public.comment(id) ON DELETE CASCADE;


--
-- Name: user_comment_reaction user_comment_reaction_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_comment_reaction
    ADD CONSTRAINT user_comment_reaction_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE SET NULL;


--
-- Name: user_confession_reaction user_confession_reaction_confession_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_confession_reaction
    ADD CONSTRAINT user_confession_reaction_confession_id_fkey FOREIGN KEY (confession_id) REFERENCES app_public.confession(id) ON DELETE CASCADE;


--
-- Name: user_confession_reaction user_confession_reaction_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_confession_reaction
    ADD CONSTRAINT user_confession_reaction_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE SET NULL;


--
-- Name: user_emails user_emails_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails
    ADD CONSTRAINT user_emails_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: connect_pg_simple_sessions; Type: ROW SECURITY; Schema: app_private; Owner: -
--

ALTER TABLE app_private.connect_pg_simple_sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: app_private; Owner: -
--

ALTER TABLE app_private.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: user_authentication_secrets; Type: ROW SECURITY; Schema: app_private; Owner: -
--

ALTER TABLE app_private.user_authentication_secrets ENABLE ROW LEVEL SECURITY;

--
-- Name: user_email_secrets; Type: ROW SECURITY; Schema: app_private; Owner: -
--

ALTER TABLE app_private.user_email_secrets ENABLE ROW LEVEL SECURITY;

--
-- Name: user_secrets; Type: ROW SECURITY; Schema: app_private; Owner: -
--

ALTER TABLE app_private.user_secrets ENABLE ROW LEVEL SECURITY;

--
-- Name: comment; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.comment ENABLE ROW LEVEL SECURITY;

--
-- Name: confession; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.confession ENABLE ROW LEVEL SECURITY;

--
-- Name: confession_category; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.confession_category ENABLE ROW LEVEL SECURITY;

--
-- Name: user_authentications delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.user_authentications FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: user_emails delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.user_emails FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: feedback; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.feedback ENABLE ROW LEVEL SECURITY;

--
-- Name: user_comment_reaction insert_all; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_all ON app_public.user_comment_reaction FOR INSERT WITH CHECK ((app_public.current_user_id() IS NOT NULL));


--
-- Name: user_confession_reaction insert_all; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_all ON app_public.user_confession_reaction FOR INSERT WITH CHECK ((app_public.current_user_id() IS NOT NULL));


--
-- Name: comment insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.comment FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: confession insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.confession FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: confession_category insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.confession_category FOR INSERT WITH CHECK ((EXISTS ( SELECT confession.id
   FROM app_public.confession
  WHERE ((confession.id = confession_category.confession_id) AND (confession.user_id = app_public.current_user_id())))));


--
-- Name: user_emails insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.user_emails FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: category manage_as_admin; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_as_admin ON app_public.category USING ((EXISTS ( SELECT 1
   FROM app_public.users
  WHERE ((users.is_admin IS TRUE) AND (users.id = app_public.current_user_id())))));


--
-- Name: comment manage_as_admin; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_as_admin ON app_public.comment USING ((EXISTS ( SELECT 1
   FROM app_public.users
  WHERE ((users.is_admin IS TRUE) AND (users.id = app_public.current_user_id())))));


--
-- Name: confession manage_as_admin; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_as_admin ON app_public.confession USING ((EXISTS ( SELECT 1
   FROM app_public.users
  WHERE ((users.is_admin IS TRUE) AND (users.id = app_public.current_user_id())))));


--
-- Name: confession_category manage_as_admin; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_as_admin ON app_public.confession_category USING ((EXISTS ( SELECT 1
   FROM app_public.users
  WHERE ((users.is_admin IS TRUE) AND (users.id = app_public.current_user_id())))));


--
-- Name: feedback manage_as_admin; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_as_admin ON app_public.feedback USING ((EXISTS ( SELECT 1
   FROM app_public.users
  WHERE ((users.is_admin IS TRUE) AND (users.id = app_public.current_user_id())))));


--
-- Name: user_comment_reaction manage_as_admin; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_as_admin ON app_public.user_comment_reaction USING ((EXISTS ( SELECT 1
   FROM app_public.users
  WHERE ((users.is_admin IS TRUE) AND (users.id = app_public.current_user_id())))));


--
-- Name: user_confession_reaction manage_as_admin; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_as_admin ON app_public.user_confession_reaction USING ((EXISTS ( SELECT 1
   FROM app_public.users
  WHERE ((users.is_admin IS TRUE) AND (users.id = app_public.current_user_id())))));


--
-- Name: category manage_as_moderator; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_as_moderator ON app_public.category USING (((created_by = app_public.current_user_id()) AND (EXISTS ( SELECT 1
   FROM app_public.users
  WHERE (((users.role)::text = 'moderator'::text) AND (users.id = app_public.current_user_id()))))));


--
-- Name: feedback manage_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_own ON app_public.feedback USING ((user_id = app_public.current_user_id()));


--
-- Name: user_comment_reaction manage_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_own ON app_public.user_comment_reaction USING ((user_id = app_public.current_user_id()));


--
-- Name: user_confession_reaction manage_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY manage_own ON app_public.user_confession_reaction USING ((user_id = app_public.current_user_id()));


--
-- Name: category select_all; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_all ON app_public.category FOR SELECT USING (true);


--
-- Name: comment select_all; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_all ON app_public.comment FOR SELECT USING (true);


--
-- Name: confession select_all; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_all ON app_public.confession FOR SELECT USING (true);


--
-- Name: confession_category select_all; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_all ON app_public.confession_category FOR SELECT USING (true);


--
-- Name: users select_all; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_all ON app_public.users FOR SELECT USING (true);


--
-- Name: feedback select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.feedback FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: user_authentications select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.user_authentications FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: user_comment_reaction select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.user_comment_reaction FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: user_confession_reaction select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.user_confession_reaction FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: user_emails select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.user_emails FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: comment update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.comment FOR UPDATE USING ((user_id = app_public.current_user_id()));


--
-- Name: confession update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.confession FOR UPDATE USING ((user_id = app_public.current_user_id()));


--
-- Name: confession_category update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.confession_category FOR UPDATE USING ((EXISTS ( SELECT confession.id
   FROM app_public.confession
  WHERE ((confession.id = confession_category.confession_id) AND (confession.user_id = app_public.current_user_id())))));


--
-- Name: users update_self; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_self ON app_public.users FOR UPDATE USING ((id = app_public.current_user_id()));


--
-- Name: user_authentications; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.user_authentications ENABLE ROW LEVEL SECURITY;

--
-- Name: user_comment_reaction; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.user_comment_reaction ENABLE ROW LEVEL SECURITY;

--
-- Name: user_confession_reaction; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.user_confession_reaction ENABLE ROW LEVEL SECURITY;

--
-- Name: user_emails; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.user_emails ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.users ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA app_hidden; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA app_hidden TO cfs_visitor;


--
-- Name: SCHEMA app_public; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA app_public TO cfs_visitor;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM tung;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO cfs;
GRANT USAGE ON SCHEMA public TO cfs_visitor;


--
-- Name: FUNCTION assert_valid_password(new_password text); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.assert_valid_password(new_password text) FROM PUBLIC;


--
-- Name: TABLE users; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT ON TABLE app_public.users TO cfs_visitor;


--
-- Name: COLUMN users.username; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(username) ON TABLE app_public.users TO cfs_visitor;


--
-- Name: COLUMN users.name; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(name) ON TABLE app_public.users TO cfs_visitor;


--
-- Name: COLUMN users.avatar_url; Type: ACL; Schema: app_public; Owner: -
--

GRANT UPDATE(avatar_url) ON TABLE app_public.users TO cfs_visitor;


--
-- Name: FUNCTION link_or_register_user(f_user_id uuid, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.link_or_register_user(f_user_id uuid, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json) FROM PUBLIC;


--
-- Name: FUNCTION login(username public.citext, password text); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.login(username public.citext, password text) FROM PUBLIC;


--
-- Name: FUNCTION really_create_user(username public.citext, email text, email_is_verified boolean, name text, avatar_url text, password text); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.really_create_user(username public.citext, email text, email_is_verified boolean, name text, avatar_url text, password text) FROM PUBLIC;


--
-- Name: FUNCTION register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean) FROM PUBLIC;


--
-- Name: FUNCTION reset_password(user_id uuid, reset_token text, new_password text); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.reset_password(user_id uuid, reset_token text, new_password text) FROM PUBLIC;


--
-- Name: FUNCTION tg__add_audit_job(); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.tg__add_audit_job() FROM PUBLIC;


--
-- Name: FUNCTION tg__add_job(); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.tg__add_job() FROM PUBLIC;


--
-- Name: FUNCTION tg__timestamps(); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.tg__timestamps() FROM PUBLIC;


--
-- Name: FUNCTION tg__update_total_reaction(); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.tg__update_total_reaction() FROM PUBLIC;


--
-- Name: FUNCTION tg_user_email_secrets__insert_with_user_email(); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.tg_user_email_secrets__insert_with_user_email() FROM PUBLIC;


--
-- Name: FUNCTION tg_user_secrets__insert_with_user(); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.tg_user_secrets__insert_with_user() FROM PUBLIC;


--
-- Name: FUNCTION change_password(old_password text, new_password text); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.change_password(old_password text, new_password text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.change_password(old_password text, new_password text) TO cfs_visitor;


--
-- Name: FUNCTION confirm_account_deletion(token text); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.confirm_account_deletion(token text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.confirm_account_deletion(token text) TO cfs_visitor;


--
-- Name: FUNCTION current_user_id(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.current_user_id() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.current_user_id() TO cfs_visitor;


--
-- Name: TABLE confession; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.confession TO cfs_visitor;


--
-- Name: COLUMN confession.title; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(title),UPDATE(title) ON TABLE app_public.confession TO cfs_visitor;


--
-- Name: COLUMN confession.content; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(content),UPDATE(content) ON TABLE app_public.confession TO cfs_visitor;


--
-- Name: COLUMN confession.slug; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(slug),UPDATE(slug) ON TABLE app_public.confession TO cfs_visitor;


--
-- Name: COLUMN confession.image; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(image),UPDATE(image) ON TABLE app_public.confession TO cfs_visitor;


--
-- Name: FUNCTION create_cfs(title character varying, content character varying, slug character varying, cat_id integer, image character varying); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.create_cfs(title character varying, content character varying, slug character varying, cat_id integer, image character varying) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.create_cfs(title character varying, content character varying, slug character varying, cat_id integer, image character varying) TO cfs_visitor;


--
-- Name: TABLE comment; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.comment TO cfs_visitor;


--
-- Name: COLUMN comment.confession_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(confession_id),UPDATE(confession_id) ON TABLE app_public.comment TO cfs_visitor;


--
-- Name: COLUMN comment.author_name; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(author_name),UPDATE(author_name) ON TABLE app_public.comment TO cfs_visitor;


--
-- Name: COLUMN comment.content; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(content),UPDATE(content) ON TABLE app_public.comment TO cfs_visitor;


--
-- Name: COLUMN comment.image; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(image),UPDATE(image) ON TABLE app_public.comment TO cfs_visitor;


--
-- Name: COLUMN comment.parent_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(parent_id),UPDATE(parent_id) ON TABLE app_public.comment TO cfs_visitor;


--
-- Name: FUNCTION create_or_update_comment_reaction(comment_id integer, react_type app_public.reaction_type); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.create_or_update_comment_reaction(comment_id integer, react_type app_public.reaction_type) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.create_or_update_comment_reaction(comment_id integer, react_type app_public.reaction_type) TO cfs_visitor;


--
-- Name: FUNCTION create_or_update_confession_reaction(confession_id integer, react_type app_public.reaction_type); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.create_or_update_confession_reaction(confession_id integer, react_type app_public.reaction_type) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.create_or_update_confession_reaction(confession_id integer, react_type app_public.reaction_type) TO cfs_visitor;


--
-- Name: FUNCTION current_session_id(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.current_session_id() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.current_session_id() TO cfs_visitor;


--
-- Name: FUNCTION "current_user"(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public."current_user"() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public."current_user"() TO cfs_visitor;


--
-- Name: FUNCTION delete_category(cat_id integer); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.delete_category(cat_id integer) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.delete_category(cat_id integer) TO cfs_visitor;


--
-- Name: FUNCTION delete_cfs(p_confession_id integer); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.delete_cfs(p_confession_id integer) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.delete_cfs(p_confession_id integer) TO cfs_visitor;


--
-- Name: FUNCTION forgot_password(email public.citext); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.forgot_password(email public.citext) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.forgot_password(email public.citext) TO cfs_visitor;


--
-- Name: FUNCTION get_cfs_by_cat(cat_id integer); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_cfs_by_cat(cat_id integer) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_cfs_by_cat(cat_id integer) TO cfs_visitor;


--
-- Name: FUNCTION get_cfs_by_cat_slug(cat_slug character varying); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_cfs_by_cat_slug(cat_slug character varying) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_cfs_by_cat_slug(cat_slug character varying) TO cfs_visitor;


--
-- Name: FUNCTION get_relative_confessions(target_confession_id integer); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.get_relative_confessions(target_confession_id integer) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.get_relative_confessions(target_confession_id integer) TO cfs_visitor;


--
-- Name: FUNCTION is_user_logged_in(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.is_user_logged_in() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.is_user_logged_in() TO cfs_visitor;


--
-- Name: FUNCTION logout(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.logout() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.logout() TO cfs_visitor;


--
-- Name: TABLE user_emails; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.user_emails TO cfs_visitor;


--
-- Name: COLUMN user_emails.email; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(email) ON TABLE app_public.user_emails TO cfs_visitor;


--
-- Name: FUNCTION make_email_primary(email_id uuid); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.make_email_primary(email_id uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.make_email_primary(email_id uuid) TO cfs_visitor;


--
-- Name: FUNCTION request_account_deletion(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.request_account_deletion() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.request_account_deletion() TO cfs_visitor;


--
-- Name: FUNCTION resend_email_verification_code(email_id uuid); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.resend_email_verification_code(email_id uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.resend_email_verification_code(email_id uuid) TO cfs_visitor;


--
-- Name: FUNCTION tg__graphql_subscription(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.tg__graphql_subscription() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.tg__graphql_subscription() TO cfs_visitor;


--
-- Name: FUNCTION tg_user_emails__forbid_if_verified(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.tg_user_emails__forbid_if_verified() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.tg_user_emails__forbid_if_verified() TO cfs_visitor;


--
-- Name: FUNCTION tg_user_emails__prevent_delete_last_email(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.tg_user_emails__prevent_delete_last_email() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.tg_user_emails__prevent_delete_last_email() TO cfs_visitor;


--
-- Name: FUNCTION tg_user_emails__verify_account_on_verified(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.tg_user_emails__verify_account_on_verified() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.tg_user_emails__verify_account_on_verified() TO cfs_visitor;


--
-- Name: FUNCTION tg_users__deletion_organization_checks_and_actions(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.tg_users__deletion_organization_checks_and_actions() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.tg_users__deletion_organization_checks_and_actions() TO cfs_visitor;


--
-- Name: FUNCTION users_has_password(u app_public.users); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.users_has_password(u app_public.users) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.users_has_password(u app_public.users) TO cfs_visitor;


--
-- Name: FUNCTION verify_email(user_email_id uuid, token text); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.verify_email(user_email_id uuid, token text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.verify_email(user_email_id uuid, token text) TO cfs_visitor;


--
-- Name: TABLE category; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT ON TABLE app_public.category TO cfs_visitor;


--
-- Name: COLUMN category.name; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(name),UPDATE(name) ON TABLE app_public.category TO cfs_visitor;


--
-- Name: COLUMN category.slug; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(slug),UPDATE(slug) ON TABLE app_public.category TO cfs_visitor;


--
-- Name: COLUMN category.image; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(image),UPDATE(image) ON TABLE app_public.category TO cfs_visitor;


--
-- Name: COLUMN category.banner_image; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(banner_image),UPDATE(banner_image) ON TABLE app_public.category TO cfs_visitor;


--
-- Name: SEQUENCE category_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.category_id_seq TO cfs_visitor;


--
-- Name: SEQUENCE comment_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.comment_id_seq TO cfs_visitor;


--
-- Name: TABLE confession_category; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.confession_category TO cfs_visitor;


--
-- Name: SEQUENCE confession_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.confession_id_seq TO cfs_visitor;


--
-- Name: TABLE feedback; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT ON TABLE app_public.feedback TO cfs_visitor;


--
-- Name: COLUMN feedback.content; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(content),UPDATE(content) ON TABLE app_public.feedback TO cfs_visitor;


--
-- Name: COLUMN feedback.parent_id; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(parent_id),UPDATE(parent_id) ON TABLE app_public.feedback TO cfs_visitor;


--
-- Name: SEQUENCE feedback_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.feedback_id_seq TO cfs_visitor;


--
-- Name: TABLE user_authentications; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.user_authentications TO cfs_visitor;


--
-- Name: TABLE user_comment_reaction; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT ON TABLE app_public.user_comment_reaction TO cfs_visitor;


--
-- Name: SEQUENCE user_comment_reaction_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.user_comment_reaction_id_seq TO cfs_visitor;


--
-- Name: TABLE user_confession_reaction; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT ON TABLE app_public.user_confession_reaction TO cfs_visitor;


--
-- Name: SEQUENCE user_confession_reaction_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.user_confession_reaction_id_seq TO cfs_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app_hidden; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE cfs IN SCHEMA app_hidden GRANT SELECT,USAGE ON SEQUENCES  TO cfs_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: app_hidden; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE cfs IN SCHEMA app_hidden GRANT ALL ON FUNCTIONS  TO cfs_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app_public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE cfs IN SCHEMA app_public GRANT SELECT,USAGE ON SEQUENCES  TO cfs_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: app_public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE cfs IN SCHEMA app_public GRANT ALL ON FUNCTIONS  TO cfs_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE cfs IN SCHEMA public GRANT SELECT,USAGE ON SEQUENCES  TO cfs_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE cfs IN SCHEMA public GRANT ALL ON FUNCTIONS  TO cfs_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE cfs REVOKE ALL ON FUNCTIONS  FROM PUBLIC;


--
-- PostgreSQL database dump complete
--


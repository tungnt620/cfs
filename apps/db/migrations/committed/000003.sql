--! Previous: sha1:3a48ffd923197515c2319af73fbe7328cf0bac6e
--! Hash: sha1:c0e76568039216c9a939f9d5093edc21506f6736

--! split: 1-current.sql
drop table if exists app_public.confession_category;
drop table if exists app_public.comment;
drop table if exists app_public.category;
drop table if exists app_public.confession;

CREATE TABLE app_public.category (
    id integer NOT NULL,
    name character varying(255),
    slug character varying(50),
    image character varying(255)
);

alter table app_public.user_authentications enable row level security;

--ALTER TABLE app_public.category OWNER TO postgres;

CREATE SEQUENCE app_public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--ALTER TABLE app_public.category_id_seq OWNER TO postgres;

ALTER SEQUENCE app_public.category_id_seq OWNED BY app_public.category.id;



CREATE TABLE app_public.comment (
    id integer NOT NULL,
    confession_id integer,
    author_name character varying(255),
    author character varying(255),
    content text,
    created_at bigint,
    parent bigint,
    image character varying(255)
);

alter table app_public.comment enable row level security;


--ALTER TABLE app_public.comment OWNER TO postgres;

CREATE SEQUENCE app_public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--ALTER TABLE app_public.comment_id_seq OWNER TO postgres;


ALTER SEQUENCE app_public.comment_id_seq OWNED BY app_public.comment.id;



CREATE TABLE app_public.confession (
    id integer NOT NULL,
    title character varying(255),
    content text,
    created_at bigint,
    updated_at bigint,
    slug character varying(120),
    image character varying(255),
    is_public boolean DEFAULT true,
    thumbnail character varying(255),
    source_id bigint
);

alter table app_public.confession enable row level security;

--ALTER TABLE app_public.confession OWNER TO postgres;

CREATE TABLE app_public.confession_category (
    confession_id integer NOT NULL,
    category_id integer NOT NULL
);

--ALTER TABLE app_public.confession_category OWNER TO postgres;

CREATE SEQUENCE app_public.confession_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--ALTER TABLE app_public.confession_id_seq OWNER TO postgres;

ALTER SEQUENCE app_public.confession_id_seq OWNED BY app_public.confession.id;

ALTER TABLE ONLY app_public.category ALTER COLUMN id SET DEFAULT nextval('app_public.category_id_seq'::regclass);


ALTER TABLE ONLY app_public.comment ALTER COLUMN id SET DEFAULT nextval('app_public.comment_id_seq'::regclass);


ALTER TABLE ONLY app_public.confession ALTER COLUMN id SET DEFAULT nextval('app_public.confession_id_seq'::regclass);


SELECT pg_catalog.setval('app_public.category_id_seq', 4, true);


SELECT pg_catalog.setval('app_public.comment_id_seq', 1, false);



SELECT pg_catalog.setval('app_public.confession_id_seq', 1, false);


ALTER TABLE ONLY app_public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


ALTER TABLE ONLY app_public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);

ALTER TABLE ONLY app_public.confession_category
    ADD CONSTRAINT confession_category_confession_id_category_id_key UNIQUE (confession_id, category_id);


ALTER TABLE ONLY app_public.confession
    ADD CONSTRAINT confession_pkey PRIMARY KEY (id);

ALTER TABLE ONLY app_public.confession
    ADD CONSTRAINT confession_slug_key UNIQUE (slug);

CREATE INDEX comment_confession_id_index ON app_public.comment USING btree (confession_id);

CREATE INDEX confession_category_category_id_index ON app_public.confession_category USING btree (category_id);


CREATE INDEX confession_category_confession_id_index ON app_public.confession_category USING btree (confession_id);


ALTER TABLE ONLY app_public.confession_category
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES app_public.category(id);

ALTER TABLE ONLY app_public.confession_category
    ADD CONSTRAINT fk_confession FOREIGN KEY (confession_id) REFERENCES app_public.confession(id);

ALTER TABLE ONLY app_public.comment
    ADD CONSTRAINT fk_confession FOREIGN KEY (confession_id) REFERENCES app_public.confession(id);

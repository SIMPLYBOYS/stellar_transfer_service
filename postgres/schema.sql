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
SET default_tablespace = '';
SET default_with_oids = false;

-- transaction_states 
CREATE TABLE public.transaction_states (
  id integer NOT NULL,
  description text
);

ALTER TABLE public.transaction_states OWNER TO postgres;
CREATE SEQUENCE public.transaction_states_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.transaction_states_id_seq OWNER TO postgres;
ALTER SEQUENCE public.transaction_states_id_seq OWNED BY public.transaction_states.id;

-- customers
CREATE TABLE public.customers (
  id integer NOT NULL,
  payment_gateways_id integer,
  wallet_address text,
  payment_account text,
  email text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone
);

ALTER TABLE public.customers OWNER TO postgres;
CREATE SEQUENCE public.customers_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.customers_id_seq OWNER TO postgres;
ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;

-- merchants
CREATE TABLE public.merchants (
  id integer NOT NULL,
  payment_gateways_id integer,
  owners text,
  country text,
  wallet_address text,
  payment_account text,
  email text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone
);

ALTER TABLE public.merchants OWNER TO postgres;
CREATE SEQUENCE public.merchants_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.merchants_id_seq OWNER TO postgres;
ALTER SEQUENCE public.merchants_id_seq OWNED BY public.merchants.id;

-- transactions
CREATE TABLE public.transactions (
  id integer NOT NULL, 
  kind text,
  transaction_states_id integer,
  customers_id integer,
  merchants_id integer,
  amount_in integer,
  amount_out integer,
  amount_fee integer,
  started_at timestamp with time zone,
  updated_at timestamp with time zone,
  completed_at timestamp with time zone,
  external_transaction_id integer,
  message text
);

ALTER TABLE public.transactions OWNER TO postgres;
CREATE SEQUENCE public.transactions_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.transactions_id_seq OWNER TO postgres;
ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;

-- payment_gateways
CREATE TABLE public.payment_gateways (
  id integer NOT NULL,
  gateway_name text,
  gateway_type text
);

ALTER TABLE public.payment_gateways OWNER TO postgres;
CREATE SEQUENCE public.payment_gateways_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.payment_gateways_id_seq OWNER TO postgres;
ALTER SEQUENCE public.payment_gateways_id_seq OWNED BY public.payment_gateways.id;

ALTER TABLE ONLY public.transaction_states ALTER COLUMN id SET DEFAULT nextval('public.transaction_states_id_seq'::regclass);
ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);
ALTER TABLE ONLY public.merchants ALTER COLUMN id SET DEFAULT nextval('public.merchants_id_seq'::regclass);
ALTER TABLE ONLY public.payment_gateways ALTER COLUMN id SET DEFAULT nextval('public.payment_gateways_id_seq'::regclass);

ALTER TABLE ONLY public.transaction_states
    ADD CONSTRAINT transaction_states_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.merchants
    ADD CONSTRAINT merchants_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.payment_gateways
    ADD CONSTRAINT payment_gateways_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_transaction_states_id_fkey FOREIGN KEY (transaction_states_id) REFERENCES public.transaction_states(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_customers_id_fkey FOREIGN KEY (customers_id) REFERENCES public.customers(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_merchants_id_fkey FOREIGN KEY (merchants_id) REFERENCES public.merchants(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_payment_gateways_id_fkey FOREIGN KEY (payment_gateways_id) REFERENCES public.payment_gateways(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.merchants
    ADD CONSTRAINT merchants_payment_gateways_id_fkey FOREIGN KEY (payment_gateways_id) REFERENCES public.payment_gateways(id) ON DELETE CASCADE;

-- Retrieval steps:
--
-- Remove old volumes
-- docker volume prune
-- Add automigrate to Gin start-up
-- Build container (make container)
--
-- docker-compose up
-- docker exec -it <blog_db_id> /bin/bash
-- pg_dump -s blog -Upostgres | sed -e '/^--/d'
--
-- Don't forget to remove automigrate

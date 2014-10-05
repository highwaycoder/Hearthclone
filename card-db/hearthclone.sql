--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.5
-- Dumped by pg_dump version 9.3.5
-- Started on 2014-10-05 14:35:04 BST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 174 (class 3079 OID 12018)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2222 (class 0 OID 0)
-- Dependencies: 174
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 173 (class 1259 OID 16408)
-- Name: minion_types; Type: TABLE; Schema: public; Owner: hearthclone; Tablespace: 
--

CREATE TABLE minion_types (
    minion_type_id integer NOT NULL,
    minion_type text NOT NULL
);


ALTER TABLE public.minion_types OWNER TO hearthclone;

--
-- TOC entry 172 (class 1259 OID 16406)
-- Name: minion_types_minion_type_id_seq; Type: SEQUENCE; Schema: public; Owner: hearthclone
--

CREATE SEQUENCE minion_types_minion_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.minion_types_minion_type_id_seq OWNER TO hearthclone;

--
-- TOC entry 2223 (class 0 OID 0)
-- Dependencies: 172
-- Name: minion_types_minion_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hearthclone
--

ALTER SEQUENCE minion_types_minion_type_id_seq OWNED BY minion_types.minion_type_id;


--
-- TOC entry 171 (class 1259 OID 16397)
-- Name: minions; Type: TABLE; Schema: public; Owner: hearthclone; Tablespace: 
--

CREATE TABLE minions (
    id integer NOT NULL,
    name text NOT NULL,
    health integer NOT NULL,
    attack integer NOT NULL,
    cost integer NOT NULL,
    type integer NOT NULL
);


ALTER TABLE public.minions OWNER TO hearthclone;

--
-- TOC entry 170 (class 1259 OID 16395)
-- Name: minions_id_seq; Type: SEQUENCE; Schema: public; Owner: hearthclone
--

CREATE SEQUENCE minions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.minions_id_seq OWNER TO hearthclone;

--
-- TOC entry 2224 (class 0 OID 0)
-- Dependencies: 170
-- Name: minions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hearthclone
--

ALTER SEQUENCE minions_id_seq OWNED BY minions.id;


--
-- TOC entry 2098 (class 2604 OID 16411)
-- Name: minion_type_id; Type: DEFAULT; Schema: public; Owner: hearthclone
--

ALTER TABLE ONLY minion_types ALTER COLUMN minion_type_id SET DEFAULT nextval('minion_types_minion_type_id_seq'::regclass);


--
-- TOC entry 2097 (class 2604 OID 16400)
-- Name: id; Type: DEFAULT; Schema: public; Owner: hearthclone
--

ALTER TABLE ONLY minions ALTER COLUMN id SET DEFAULT nextval('minions_id_seq'::regclass);


--
-- TOC entry 2214 (class 0 OID 16408)
-- Dependencies: 173
-- Data for Name: minion_types; Type: TABLE DATA; Schema: public; Owner: hearthclone
--

COPY minion_types (minion_type_id, minion_type) FROM stdin;
1	Normal
2	Beast
3	Murloc
4	Dragon
5	Demon
6	Pirate
7	Totem
\.


--
-- TOC entry 2225 (class 0 OID 0)
-- Dependencies: 172
-- Name: minion_types_minion_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hearthclone
--

SELECT pg_catalog.setval('minion_types_minion_type_id_seq', 7, true);


--
-- TOC entry 2212 (class 0 OID 16397)
-- Dependencies: 171
-- Data for Name: minions; Type: TABLE DATA; Schema: public; Owner: hearthclone
--

COPY minions (id, name, health, attack, cost, type) FROM stdin;
1	Murloc Raider	1	2	1	3
\.


--
-- TOC entry 2226 (class 0 OID 0)
-- Dependencies: 170
-- Name: minions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hearthclone
--

SELECT pg_catalog.setval('minions_id_seq', 1, true);


--
-- TOC entry 2102 (class 2606 OID 16416)
-- Name: minion_type_id; Type: CONSTRAINT; Schema: public; Owner: hearthclone; Tablespace: 
--

ALTER TABLE ONLY minion_types
    ADD CONSTRAINT minion_type_id PRIMARY KEY (minion_type_id);


--
-- TOC entry 2100 (class 2606 OID 16405)
-- Name: minions_id; Type: CONSTRAINT; Schema: public; Owner: hearthclone; Tablespace: 
--

ALTER TABLE ONLY minions
    ADD CONSTRAINT minions_id PRIMARY KEY (id);


--
-- TOC entry 2103 (class 2606 OID 16417)
-- Name: minion_type_id; Type: FK CONSTRAINT; Schema: public; Owner: hearthclone
--

ALTER TABLE ONLY minions
    ADD CONSTRAINT minion_type_id FOREIGN KEY (type) REFERENCES minion_types(minion_type_id);


--
-- TOC entry 2221 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2014-10-05 14:35:05 BST

--
-- PostgreSQL database dump complete
--


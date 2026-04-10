--
-- PostgreSQL database dump
--

\restrict SVax7CEn8JeFWWv3rUg6JI6CxQrWss5PJHzOkEBFMaJ0aJ5Aj8LGIfyLHVZw4jb

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-10 05:59:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 24673)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255),
    status character varying(255) DEFAULT 'Pending'::character varying,
    due_date date,
    assigned_to bigint,
    user_id bigint,
    priority character varying(255) DEFAULT 'Medium'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24672)
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_id_seq OWNER TO postgres;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 220
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- TOC entry 219 (class 1259 OID 24668)
-- Name: task_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_seq OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24715)
-- Name: timesheets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timesheets (
    id integer NOT NULL,
    task_id integer,
    employee_id integer,
    work_date date NOT NULL,
    hours_worked numeric(5,2) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.timesheets OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24714)
-- Name: timesheets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.timesheets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.timesheets_id_seq OWNER TO postgres;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 222
-- Name: timesheets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.timesheets_id_seq OWNED BY public.timesheets.id;


--
-- TOC entry 225 (class 1259 OID 24733)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'User'::character varying,
    created_date date
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24732)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 224
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4867 (class 2604 OID 24683)
-- Name: task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- TOC entry 4871 (class 2604 OID 24718)
-- Name: timesheets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timesheets ALTER COLUMN id SET DEFAULT nextval('public.timesheets_id_seq'::regclass);


--
-- TOC entry 4873 (class 2604 OID 24751)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5035 (class 0 OID 24673)
-- Dependencies: 221
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (id, title, description, status, due_date, assigned_to, user_id, priority, created_at) FROM stdin;
157	Task 1	Description for task 1	In Progress	2026-04-09	6	4	High	2026-04-08 10:07:53.3013
158	Task 2	Description for task 2	Backlog	2026-04-09	6	4	Low	2026-04-08 10:07:53.3013
159	Task 3	Description for task 3	In Progress	2026-04-16	3	7	Medium	2026-04-08 10:07:53.3013
160	Task 4	Description for task 4	Todo	2026-04-17	7	3	Low	2026-04-08 10:07:53.3013
161	Task 5	Description for task 5	In Progress	2026-04-16	6	7	High	2026-04-08 10:07:53.3013
162	Task 6	Description for task 6	In Progress	2026-04-13	3	3	Low	2026-04-08 10:07:53.3013
163	Task 7	Description for task 7	Done	2026-04-09	6	6	High	2026-04-08 10:07:53.3013
164	Task 8	Description for task 8	Backlog	2026-04-11	4	4	High	2026-04-08 10:07:53.3013
165	Task 9	Description for task 9	In Progress	2026-04-15	6	4	Low	2026-04-08 10:07:53.3013
166	Task 10	Description for task 10	Todo	2026-04-11	7	4	Medium	2026-04-08 10:07:53.3013
167	Task 11	Description for task 11	Todo	2026-04-10	3	3	Low	2026-04-08 10:07:53.3013
168	Task 12	Description for task 12	Done	2026-04-09	4	4	Medium	2026-04-08 10:07:53.3013
169	Task 13	Description for task 13	Done	2026-04-12	3	4	Low	2026-04-08 10:07:53.3013
170	Task 14	Description for task 14	In Progress	2026-04-17	3	4	Medium	2026-04-08 10:07:53.3013
171	Task 15	Description for task 15	Backlog	2026-04-12	6	3	Medium	2026-04-08 10:07:53.3013
172	Task 16	Description for task 16	In Progress	2026-04-09	7	6	High	2026-04-08 10:07:53.3013
173	Task 17	Description for task 17	In Progress	2026-04-12	6	6	High	2026-04-08 10:07:53.3013
174	Task 18	Description for task 18	Backlog	2026-04-12	4	6	Low	2026-04-08 10:07:53.3013
175	Task 19	Description for task 19	Backlog	2026-04-13	7	3	High	2026-04-08 10:07:53.3013
176	Task 20	Description for task 20	Backlog	2026-04-08	4	7	High	2026-04-08 10:07:53.3013
177	Task 21	Description for task 21	Todo	2026-04-11	4	7	Low	2026-04-08 10:07:53.3013
178	Task 22	Description for task 22	Done	2026-04-12	3	3	Low	2026-04-08 10:07:53.3013
179	Task 23	Description for task 23	Todo	2026-04-11	6	3	High	2026-04-08 10:07:53.3013
180	Task 24	Description for task 24	Done	2026-04-12	4	4	High	2026-04-08 10:07:53.3013
181	Task 25	Description for task 25	Backlog	2026-04-16	4	4	Medium	2026-04-08 10:07:53.3013
182	Task 26	Description for task 26	Todo	2026-04-09	3	4	Medium	2026-04-08 10:07:53.3013
183	Task 27	Description for task 27	Backlog	2026-04-12	7	7	Low	2026-04-08 10:07:53.3013
184	Task 28	Description for task 28	Todo	2026-04-15	4	6	Low	2026-04-08 10:07:53.3013
185	Task 29	Description for task 29	Done	2026-04-10	6	3	High	2026-04-08 10:07:53.3013
186	Task 30	Description for task 30	Done	2026-04-10	6	7	Low	2026-04-08 10:07:53.3013
187	Task 31	Description for task 31	In Progress	2026-04-12	6	7	Low	2026-04-08 10:07:53.3013
188	Task 32	Description for task 32	In Progress	2026-04-08	6	6	High	2026-04-08 10:07:53.3013
189	Task 33	Description for task 33	In Progress	2026-04-17	7	6	Low	2026-04-08 10:07:53.3013
190	Task 34	Description for task 34	Todo	2026-04-14	6	4	High	2026-04-08 10:07:53.3013
191	Task 35	Description for task 35	Backlog	2026-04-11	4	3	Medium	2026-04-08 10:07:53.3013
192	Task 36	Description for task 36	Done	2026-04-08	6	7	Medium	2026-04-08 10:07:53.3013
193	Task 37	Description for task 37	Backlog	2026-04-08	3	3	High	2026-04-08 10:07:53.3013
194	Task 38	Description for task 38	Todo	2026-04-14	4	6	Medium	2026-04-08 10:07:53.3013
195	Task 39	Description for task 39	Backlog	2026-04-13	7	7	High	2026-04-08 10:07:53.3013
196	Task 40	Description for task 40	Todo	2026-04-14	7	3	High	2026-04-08 10:07:53.3013
197	Task 41	Description for task 41	Todo	2026-04-15	3	3	High	2026-04-08 10:07:53.3013
198	Task 42	Description for task 42	Done	2026-04-14	7	7	High	2026-04-08 10:07:53.3013
199	Task 43	Description for task 43	Done	2026-04-08	6	6	Medium	2026-04-08 10:07:53.3013
200	Task 44	Description for task 44	In Progress	2026-04-17	4	4	High	2026-04-08 10:07:53.3013
201	Task 45	Description for task 45	In Progress	2026-04-09	3	4	High	2026-04-08 10:07:53.3013
202	Task 46	Description for task 46	Todo	2026-04-11	7	6	Medium	2026-04-08 10:07:53.3013
203	Task 47	Description for task 47	Done	2026-04-16	6	7	Medium	2026-04-08 10:07:53.3013
204	Task 48	Description for task 48	In Progress	2026-04-13	7	7	Low	2026-04-08 10:07:53.3013
205	Task 49	Description for task 49	Done	2026-04-14	7	7	Low	2026-04-08 10:07:53.3013
206	Task 50	Description for task 50	Done	2026-04-14	4	7	Low	2026-04-08 10:07:53.3013
\.


--
-- TOC entry 5037 (class 0 OID 24715)
-- Dependencies: 223
-- Data for Name: timesheets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.timesheets (id, task_id, employee_id, work_date, hours_worked, description, created_at) FROM stdin;
\.


--
-- TOC entry 5039 (class 0 OID 24733)
-- Dependencies: 225
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, role, created_date) FROM stdin;
6	Charlie	Charlie@example.com	Admin	2026-04-05
7	David	David@example.com	User	2026-04-05
3	Alice	alice@example.com	Admin	2026-04-05
4	Bob	bob@example.com	User	2026-04-05
\.


--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 220
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_id_seq', 206, true);


--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 219
-- Name: task_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_seq', 201, true);


--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 222
-- Name: timesheets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.timesheets_id_seq', 10, true);


--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 224
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 4876 (class 2606 OID 24685)
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- TOC entry 4878 (class 2606 OID 24726)
-- Name: timesheets timesheets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timesheets
    ADD CONSTRAINT timesheets_pkey PRIMARY KEY (id);


--
-- TOC entry 4880 (class 2606 OID 24766)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4882 (class 2606 OID 24753)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4883 (class 2606 OID 24755)
-- Name: task fk_assigned_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fk_assigned_user FOREIGN KEY (assigned_to) REFERENCES public.users(id);


--
-- TOC entry 4884 (class 2606 OID 24787)
-- Name: task fkbhwpp8tr117vvbxhf5sbkdkc9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fkbhwpp8tr117vvbxhf5sbkdkc9 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4885 (class 2606 OID 24727)
-- Name: timesheets timesheets_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timesheets
    ADD CONSTRAINT timesheets_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.task(id) ON DELETE CASCADE;


-- Completed on 2026-04-10 05:59:48

--
-- PostgreSQL database dump complete
--

\unrestrict SVax7CEn8JeFWWv3rUg6JI6CxQrWss5PJHzOkEBFMaJ0aJ5Aj8LGIfyLHVZw4jb


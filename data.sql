SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY "pgsodium"."key" ("id", "status", "created", "expires", "key_type", "key_id", "key_context", "name", "associated_data", "raw_key", "raw_key_nonce", "parent_key", "comment", "user_data") FROM stdin;
\.


--
-- Data for Name: Store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Store" ("id", "name", "email", "noWa", "address", "createdAt") FROM stdin;
STR_1711662928469	Default	default@gmail.com	-		2024-03-28 21:55:28.428
STR_1713535522742	TEHLINK ID	eugenefeilianputrarangga@gmail.com	088223755564	Jl. Batu raya rt. 03/07 no. 04	2024-04-19 14:05:22.743
\.


--
-- Data for Name: CustomerGroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."CustomerGroup" ("id", "idStore", "name", "createdAt") FROM stdin;
CGS_1712505657413	STR_1711662928469	Instagram	2024-04-07 16:00:58.974
CGS_1713536445314	STR_1713535522742	Instagram	2024-04-19 14:20:45.315
\.


--
-- Data for Name: CustomerUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."CustomerUser" ("id", "idStore", "idCustomerGroup", "name", "email", "noWa", "address", "city", "zipCode", "region", "createdAt") FROM stdin;
CUS_1712505688793	STR_1711662928469	CGS_1712505657413	Eugene Feilian Putra Rangga	eugenefeilianputrarangga@gmail.com	088223755564	Jl. Batu raya rt. 03/07 no. 04	Kota Jakarta Selatan	12960	Jakarta	2024-04-07 16:01:28.794
CUS_1713536614125	STR_1713535522742	CGS_1713536445314	Eugene Feilian Putra Rangga	gege.eugene702@gmail.com	907986876	Jl. Batu raya, no.4, Menteng Atas, Setiabudi, Jakarta Selatan	Kota Jakarta Selatan	12960	Jakarta	2024-04-19 14:23:34.127
\.


--
-- Data for Name: ExpenditureCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."ExpenditureCategory" ("id", "idStore", "name", "createdAt") FROM stdin;
KGR_1712698539443	STR_1711662928469	Ngutang	2024-04-09 21:35:41.021
\.


--
-- Data for Name: SavingAccounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."SavingAccounts" ("id", "idStore", "name", "startingBalance", "notes", "createdAt") FROM stdin;
82872	STR_1711662928469	Eugene feilian putra rangga	8500000		2024-04-13 06:36:23.469
939301	STR_1713535522742	Eugene Feilian Putra Rangga	500000000		2024-04-19 14:19:25.559
\.


--
-- Data for Name: Expenditures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Expenditures" ("id", "idStore", "idSavingAccount", "idExpenditureCategory", "total", "notes", "createdAt") FROM stdin;
EXP_1712995684177	STR_1711662928469	82872	KGR_1712698539443	1500000	\N	2024-04-13 08:08:03.452
\.


--
-- Data for Name: MoneyTransfer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."MoneyTransfer" ("id", "idStore", "fromSavingAccount", "toSavingAccount", "total", "createdAt") FROM stdin;
MTF_1713197734515	STR_1711662928469	82872	82872	1000000	2024-04-15 16:15:34.545
\.


--
-- Data for Name: Sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Sales" ("id", "idStore", "idCustomerUser", "saleStatus", "purchaseStatus", "discount", "shippingCost", "saleNotes", "staffNotes", "createdAt", "documentPath", "idSavingAccount") FROM stdin;
SLS_1713236157570	STR_1711662928469	CUS_1712505688793	SELESAI	DIBAYAR	3000000	2000000	\N	\N	2024-04-16 02:55:57.325	\N	82872
\.


--
-- Data for Name: Packaging; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Packaging" ("id", "idStore", "idCustomerUser", "createdAt", "address", "filePath", "idSales", "notes", "status") FROM stdin;
PKG_1713784166505	STR_1711662928469	CUS_1712505688793	2024-04-22 11:09:26.26	Eugene Feilian Putra Rangga\nJl. Batu raya rt. 03/07 no. 04, Jakarta, Kota Jakarta Selatan, 12960\n\nNo. Telepon: 088223755564	\N	SLS_1713236157570		TERKIRIM
\.


--
-- Data for Name: ProductCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."ProductCategories" ("id", "idStore", "idProductCategories", "imagePath", "name", "createdAt") FROM stdin;
KTG_1711743238973	STR_1711662928469	\N	http://res.cloudinary.com/dg77fmoc2/image/upload/v1711743239/STR_1711662928469/product-categories/KTG_1711743238973.png	Laptop	2024-03-29 20:13:58.975
KTG_1711743259399	STR_1711662928469	KTG_1711743238973	http://res.cloudinary.com/dg77fmoc2/image/upload/v1711743259/STR_1711662928469/product-categories/KTG_1711743259399.png	Charger Laptop	2024-03-29 20:14:19.4
KTG_1711747811561	STR_1711662928469	\N	http://res.cloudinary.com/dg77fmoc2/image/upload/v1711747812/STR_1711662928469/product-categories/KTG_1711747811561.png	Handphone	2024-03-29 21:30:11.563
KTG_1711929917021	STR_1711662928469	KTG_1711747811561	http://res.cloudinary.com/dg77fmoc2/image/upload/v1711929917/STR_1711662928469/product-categories/KTG_1711929917021.png	Charger HP	2024-04-01 00:05:17.022
KTG_1712255611623	STR_1711662928469	\N	http://res.cloudinary.com/dg77fmoc2/image/upload/v1712255612/STR_1711662928469/product-categories/KTG_1712255611623.png	Komputer	2024-04-04 18:33:31.624
KTG_1712255645667	STR_1711662928469	KTG_1712255611623	http://res.cloudinary.com/dg77fmoc2/image/upload/v1712255645/STR_1711662928469/product-categories/KTG_1712255645667.png	VGA	2024-04-04 18:34:05.668
KTG_1713536222404	STR_1713535522742	\N	http://res.cloudinary.com/dg77fmoc2/image/upload/v1713536223/STR_1713535522742/product-categories/KTG_1713536222404.png	Laptop	2024-04-19 14:17:02.405
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Product" ("id", "idStore", "idProductCategories", "imagePath", "name", "price", "cost", "createdAt", "deletedAt") FROM stdin;
DEL_PROD_rtx3060	STR_1711662928469	KTG_1712255645667	http://res.cloudinary.com/dg77fmoc2/image/upload/v1712255702/STR_1711662928469/product/PROD_rtx3060.png	RTX 3060	6000000	4000000	2024-04-04 18:35:01.2	2024-04-09 06:27:28.006
DEL_PROD_advan	STR_1711662928469	KTG_1711743238973	http://res.cloudinary.com/dg77fmoc2/image/upload/v1711869217/STR_1711662928469/product/PROD_advan.jpg	Laptop Advan i5	7000000	5000000	2024-03-31 07:13:36.646	2024-04-09 06:27:23.485
PROD_rtx3060ti	STR_1711662928469	KTG_1712255645667	http://res.cloudinary.com/dg77fmoc2/image/upload/v1712644201/STR_1711662928469/product/PROD_rtx3060ti.jpg	RTX 3060	6000000	5000000	2024-04-09 06:30:00.411	\N
PROD_1713536297273	STR_1713535522742	KTG_1713536222404	http://res.cloudinary.com/dg77fmoc2/image/upload/v1713536297/STR_1713535522742/product/PROD_1713536297273.jpg	Laptop Advan i5	6000000	5000000	2024-04-19 14:18:17.023	\N
\.


--
-- Data for Name: Supplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Supplier" ("id", "idStore", "name", "email", "noWa", "address", "city", "zipCode", "region", "createdAt") FROM stdin;
CUS_1712348421484	STR_1711662928469	Eugene Feilian Putra Rangga	eugenefeilianputrarangga@gmail.com	88223755564	Jl. Batu raya rt. 03/07 no. 04	Kota Jakarta Selatan	12960	Jakarta	2024-04-05 20:20:21.486
CUS_1712379365880	STR_1711662928469	Iqbal Febrianwar 	iqbalfebrianwar02@gmail.com	85780293412	Jln Tebet Mas Indah blok c no 2	Jakarta Selatan 	12810	DKI Jakarta	2024-04-06 04:56:05.881
\.


--
-- Data for Name: Purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Purchase" ("id", "idStore", "idSupplier", "discount", "shippingCost", "notes", "createdAt", "documentPath", "purchaseStatus", "idSavingAccount") FROM stdin;
PUR_1712644286076	STR_1711662928469	CUS_1712348421484	3000000	500000	\N	2024-04-09 06:31:25.829	\N	DITERIMA	\N
PUR_1713536401747	STR_1713535522742	\N	1000000	1000000	\N	2024-04-19 14:20:01.498	\N	DITERIMA	939301
\.


--
-- Data for Name: PurchaseOrder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."PurchaseOrder" ("id", "idStore", "idPurchase", "idProduct", "qty", "createdAt") FROM stdin;
b516e63a-4ce6-4c7b-84ec-603b9b2b2d9c	STR_1711662928469	PUR_1712644286076	PROD_rtx3060ti	100	2024-04-09 06:31:25.829
5e51046b-ad8b-4a42-8876-54d7159a43f2	STR_1713535522742	PUR_1713536401747	PROD_1713536297273	60	2024-04-19 14:20:01.498
\.


--
-- Data for Name: PurchaseReturns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."PurchaseReturns" ("id", "idStore", "idSupplier", "notes", "createdAt", "idSavingAccount") FROM stdin;
RET_1713784856673	STR_1711662928469	CUS_1712348421484		2024-04-22 11:20:56.685	82872
\.


--
-- Data for Name: PurchaseReturnOrders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."PurchaseReturnOrders" ("id", "idStore", "idProduct", "idPurchaseReturn", "qty", "createdAt") FROM stdin;
405fefd9-fba1-434a-9553-2d2b6a038364	STR_1711662928469	PROD_rtx3060ti	RET_1713784856673	1	2024-04-22 11:20:56.685
\.


--
-- Data for Name: SaleOrder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."SaleOrder" ("id", "idStore", "idSale", "idProduct", "qty", "createdAt") FROM stdin;
80be6d27-f6b3-400d-833d-85e3efbb0bab	STR_1711662928469	SLS_1713236157570	PROD_rtx3060ti	50	2024-04-18 19:41:51.392
\.


--
-- Data for Name: SaleReturns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."SaleReturns" ("id", "idStore", "idCustomerUser", "notes", "createdAt", "idSavingAccount") FROM stdin;
RTS_1713083420117	STR_1711662928469	CUS_1712505688793		2024-04-14 00:24:22.465	82872
\.


--
-- Data for Name: SaleReturnOrders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."SaleReturnOrders" ("id", "idStore", "idProduct", "idSaleReturn", "qty", "createdAt") FROM stdin;
bd4b71b1-c95b-4b14-a000-274753bb99c0	STR_1711662928469	PROD_rtx3060ti	RTS_1713083420117	10	2024-04-14 08:30:20.118
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."User" ("id", "idStore", "username", "name", "email", "password", "noWa", "role", "status", "createdAt") FROM stdin;
USR_1711662928541	\N	default	Default		$2b$05$oTWPU7KE9l5N7H.lebgR3eRVcuYhzcCw5aOdw1WEvdglMLYcL0102		OWNER	AKTIF	2024-03-28 21:55:28.428
USR_1711743079695	STR_1711662928469	EugeneFeilian	Eugene Feilian Putra Rangga	eugenefeilianputrarangga@gmail.com	$2a$05$qjJx6BYYFKKQraNugECWXeWGsPcHSndiTy.77NXCER9nF1DU/rthy	088223755564	ADMIN	AKTIF	2024-03-29 20:11:19.713
USR_1711765215095	STR_1711662928469	uwes	Uwes	uwes@gmail.com	$2a$05$zOF4h7gs0tXvHeK7vLHh7eeBMLraI9WYwwySoEnqfKPrN6cmUOeDS	0827393	ADMIN	AKTIF	2024-03-30 02:20:15.097
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") FROM stdin;
22820f94-e27f-4704-9f1a-d76af31c2675	9cf320a098df522ec21b46c3ec627df75bc1f288f69761b21cf4ce1e9a0e389d	2024-03-28 21:55:25.887963+00	20240328211853_	\N	\N	2024-03-28 21:55:25.382314+00	1
95473d98-129a-4235-b887-f68934fed15e	88ea07d1f6d1605757bc41dbaa6c596c21677a95fa1bf5c2d08c4bc6315f30bc	2024-03-29 20:04:33.486685+00	20240329174018_	\N	\N	2024-03-29 20:04:33.353499+00	1
fccb5c3c-3bdc-4c6b-a02e-f79dcd9b71e9	91bde97fe102a4a661b1d20ed41f7766c0c0f512ee63d46286a4eb0c16225bcc	2024-04-15 00:23:50.798379+00	20240414190022_	\N	\N	2024-04-15 00:23:50.572628+00	1
3d4858fe-4f1a-44fb-953f-7fd8f42c2cb6	7a21e5d842f7e19a70cc5cc1fde4e2c25689d423b32771025c58ddbf69d85aa8	2024-04-04 16:42:01.982383+00	20240404120809_	\N	\N	2024-04-04 16:42:01.864804+00	1
b23ce96f-27b0-464f-893a-2f6177723412	b09cbcafb0e9f04ca3ebc8469d8103abedfa7cb54310f5ea5596f9ef7c0cb99d	2024-04-04 16:42:02.124909+00	20240404131100_	\N	\N	2024-04-04 16:42:02.02054+00	1
8e09012d-5e86-458a-858d-3e57acb48ffa	0f135555ab60e070d9012244813d15b712e8d7fd13a4530e30754dc9d2c0bd47	2024-04-04 16:42:02.266002+00	20240404141453_	\N	\N	2024-04-04 16:42:02.169081+00	1
8d1f8b7e-9d19-41d4-85ef-85e70803b595	332cd496434499f30b942eb2347a0755ee6cded64bac100655ddfb04b55e1940	2024-04-15 00:23:50.965814+00	20240414193949_	\N	\N	2024-04-15 00:23:50.84171+00	1
c71c2022-7d96-4e35-a2d4-45317dae62e9	2a82e4dcabf936cca2455632f450abd574b3cf0b9ebfb907f3db22c86d580346	2024-04-04 16:42:02.402077+00	20240404142637_	\N	\N	2024-04-04 16:42:02.304482+00	1
0be5f65a-5ce3-4e29-99a6-dfeb6e36e9dd	7e7c09c4735d26c7be615b208fad5c74d661a9ec44e5330399546ee6774ffdaf	2024-04-04 16:42:02.542475+00	20240404160803_	\N	\N	2024-04-04 16:42:02.441031+00	1
2d9171a5-fc6f-4cd4-b98b-d3f584c3965a	6f886dce004bf1a1614da44ac4bd8c219b24e8d6fc6f7fbbb6a217074e1f6a96	2024-04-06 00:01:09.590612+00	20240405223732_	\N	\N	2024-04-06 00:01:08.086335+00	1
5fb2db62-e5e1-4389-9fe9-999424eaf197	38e3d876e4b0da2a9764503f3524b4197a02cc26a60b4008a07a64c36b2df3c5	2024-04-08 13:40:50.040574+00	20240407181823_	\N	\N	2024-04-08 13:40:49.920638+00	1
7a7c7024-724e-4837-b3e0-bacb25a99e77	9e1530d6609b755bcfdcc1e275d81318c8fb8bdc56688edb3ee5f8a1d9fea947	2024-04-08 13:40:50.221108+00	20240407182803_	\N	\N	2024-04-08 13:40:50.0801+00	1
3dc597a4-1d27-4df2-9d98-59fedc4c64b1	ac9e5aee182ad220d6d5b844ed95a0cce819b4009736ccf36cfbd21da1293ea4	2024-04-08 13:40:50.360842+00	20240407183430_	\N	\N	2024-04-08 13:40:50.260421+00	1
662c1c85-e55e-47fb-ac83-800d232ab85a	562f0d4b42fbd2034ab3e1763f213745a138c68e3017c10dcb0f3e8ff102f385	2024-04-13 02:53:34.899261+00	20240412224745_	\N	\N	2024-04-13 02:53:34.656202+00	1
fcbcf716-a8bc-45fd-87e7-5d037983f940	90a996d305a37b9bdfc6a23486064cd18a59e44f6344809bd946221baceb6045	2024-04-13 02:53:35.038543+00	20240412232320_	\N	\N	2024-04-13 02:53:34.939453+00	1
6aad0a5f-98ac-4b77-a249-148e2ed7912c	80521f064b31da46a7f8964b7b30cd7ce9df1eb9d0d6646c551761065ccba8c9	2024-04-13 02:53:35.210203+00	20240412233230_	\N	\N	2024-04-13 02:53:35.079771+00	1
243ae9b5-9e16-4981-9be8-2be7170cef09	4372addf214fa8cf585c55780fb30cd134d98aada71f16471def3cd2ffcb26cd	2024-04-14 00:13:37.635275+00	20240413220644_	\N	\N	2024-04-14 00:13:37.27089+00	1
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id") FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;

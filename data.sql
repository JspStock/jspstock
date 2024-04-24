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
STR_1713963374757	Default	default@gmail.com	-		2024-04-24 12:56:14.731
\.


--
-- Data for Name: CustomerGroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."CustomerGroup" ("id", "idStore", "name", "createdAt") FROM stdin;
\.


--
-- Data for Name: CustomerUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."CustomerUser" ("id", "idStore", "idCustomerGroup", "name", "email", "noWa", "address", "city", "zipCode", "region", "createdAt") FROM stdin;
\.


--
-- Data for Name: ExpenditureCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."ExpenditureCategory" ("id", "idStore", "name", "createdAt") FROM stdin;
\.


--
-- Data for Name: SavingAccounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."SavingAccounts" ("id", "idStore", "name", "startingBalance", "notes", "createdAt") FROM stdin;
\.


--
-- Data for Name: Expenditures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Expenditures" ("id", "idStore", "idSavingAccount", "idExpenditureCategory", "total", "notes", "createdAt") FROM stdin;
\.


--
-- Data for Name: MoneyTransfer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."MoneyTransfer" ("id", "idStore", "fromSavingAccount", "toSavingAccount", "total", "createdAt") FROM stdin;
\.


--
-- Data for Name: Sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Sales" ("id", "idStore", "idCustomerUser", "saleStatus", "purchaseStatus", "discount", "shippingCost", "saleNotes", "staffNotes", "createdAt", "documentPath", "idSavingAccount") FROM stdin;
\.


--
-- Data for Name: Packaging; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Packaging" ("id", "idStore", "idCustomerUser", "createdAt", "address", "filePath", "idSales", "notes", "status") FROM stdin;
\.


--
-- Data for Name: ProductCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."ProductCategories" ("id", "idStore", "idProductCategories", "imagePath", "name", "createdAt") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Product" ("id", "idStore", "idProductCategories", "imagePath", "name", "price", "cost", "createdAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Supplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Supplier" ("id", "idStore", "name", "email", "noWa", "address", "city", "zipCode", "region", "createdAt") FROM stdin;
\.


--
-- Data for Name: Purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."Purchase" ("id", "idStore", "idSupplier", "discount", "shippingCost", "notes", "createdAt", "documentPath", "purchaseStatus", "idSavingAccount") FROM stdin;
\.


--
-- Data for Name: PurchaseOrder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."PurchaseOrder" ("id", "idStore", "idPurchase", "idProduct", "qty", "createdAt") FROM stdin;
\.


--
-- Data for Name: PurchaseReturns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."PurchaseReturns" ("id", "idStore", "idSupplier", "notes", "createdAt", "idSavingAccount") FROM stdin;
\.


--
-- Data for Name: PurchaseReturnOrders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."PurchaseReturnOrders" ("id", "idStore", "idProduct", "idPurchaseReturn", "qty", "createdAt") FROM stdin;
\.


--
-- Data for Name: SaleOrder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."SaleOrder" ("id", "idStore", "idSale", "idProduct", "qty", "createdAt") FROM stdin;
\.


--
-- Data for Name: SaleReturns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."SaleReturns" ("id", "idStore", "idCustomerUser", "notes", "createdAt", "idSavingAccount") FROM stdin;
\.


--
-- Data for Name: SaleReturnOrders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."SaleReturnOrders" ("id", "idStore", "idProduct", "idSaleReturn", "qty", "createdAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."User" ("id", "idStore", "username", "name", "email", "password", "noWa", "role", "status", "createdAt") FROM stdin;
USR_1713963374810	\N	default	Default		$2b$05$KSwhlaHkn900Yh81.W6xI.maP/SX2UAt.IpqTsjVijSCqY6sQBzzy		OWNER	AKTIF	2024-04-24 12:56:14.731
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") FROM stdin;
68f99b9b-0632-4b90-87db-50eb33e5045b	adf4908d75fb11bb0d88918e7aed7eadfda6d35bcfc28529abb489ab2e7bccd1	2024-04-24 12:56:05.84062+00	20240328211853_	\N	\N	2024-04-24 12:56:05.162529+00	1
497ee54e-8297-4bca-bd95-98bbc634e6f2	120d6b7152bd676ed495b966f41c8181d7812cc12f62f837819fa75895cf8c13	2024-04-24 12:56:08.582663+00	20240414190022_	\N	\N	2024-04-24 12:56:08.437472+00	1
5f762a31-75de-4733-a382-9408afc01119	34fb441b96b4a6d02f1b4bf60604de8b0d3cc7de2736a5081571d0eca53c0a44	2024-04-24 12:56:06.016325+00	20240329174018_	\N	\N	2024-04-24 12:56:05.897655+00	1
6279995b-d8b6-4de6-a120-8ed7fde363a5	a4a202f85d95ca5f5d32b77df366a76029ccfb6aea65c11df5441ea6ab6ce893	2024-04-24 12:56:06.185753+00	20240404120809_	\N	\N	2024-04-24 12:56:06.071326+00	1
0f2e61ef-f595-4c02-8b4e-c375f84ac170	7041cd339fa48dfa6e82bffc7e29bd838f01fccf5b7034c7946c342c45d1fa01	2024-04-24 12:56:06.358251+00	20240404131100_	\N	\N	2024-04-24 12:56:06.241827+00	1
6f481b3b-1de6-486b-9eb1-f935672e018c	a346ea266d0ada84df5cf4791e6bed127fbd1b64c7cdca2611afb8253438141d	2024-04-24 12:56:08.783045+00	20240414193949_	\N	\N	2024-04-24 12:56:08.638012+00	1
db2ea179-cde4-4562-aa62-d721e55096b7	3ddf24803fe3893802bad08e3a07993bac0f81e2ae1be6babdbfbc29cef2ad8e	2024-04-24 12:56:06.532754+00	20240404141453_	\N	\N	2024-04-24 12:56:06.413292+00	1
358bbeda-ea2c-4e4a-ab30-863a2be5b8de	f561a947283bd3e7563be168fb3409d4bb6c2e366824e06bc5f71a493602e568	2024-04-24 12:56:06.706491+00	20240404142637_	\N	\N	2024-04-24 12:56:06.587563+00	1
40dc3f38-b4d3-4b83-bb03-d403f55e53cf	ae35b397d45e43006912fefc9ef26af30d3afcd7bd175b3f3285b7ed2a2268b8	2024-04-24 12:56:06.879195+00	20240404160803_	\N	\N	2024-04-24 12:56:06.763181+00	1
f31bb416-fddd-4d50-98e4-b09f11458f10	e9a15d13d2a5120127f20b62ec1c03aef85d13e152f2ae695c943fb100db6214	2024-04-24 12:56:09.011773+00	20240416194423_	\N	\N	2024-04-24 12:56:08.828586+00	1
34e93b2a-55ca-4cf4-bc27-ea1b3f761c39	131eb1ae1e75e7a01b37bacfdb2e01bd63a398323855122ace852e7f7879674b	2024-04-24 12:56:07.052759+00	20240405223732_	\N	\N	2024-04-24 12:56:06.935414+00	1
e17347bd-2345-4fa5-8b93-e2f1cab17968	86704ead63e972ed208e186a454c32602db6569407223f3705a1be9199892246	2024-04-24 12:56:07.230193+00	20240407181823_	\N	\N	2024-04-24 12:56:07.109577+00	1
efc0c00c-2c76-496e-8227-22c0db879311	98c2d0d487a8fffba8d119a353216e685d9b95b083ee5bf0605969132414f9c4	2024-04-24 12:56:07.43458+00	20240407182803_	\N	\N	2024-04-24 12:56:07.287358+00	1
9a8dd8d5-871e-4292-b70e-d7af50d67331	39b58c2e5f2beed3227aef9aff66fc18eb7e100f35237fced98bce4f48ea2919	2024-04-24 12:56:09.218416+00	20240416195008_	\N	\N	2024-04-24 12:56:09.070024+00	1
c5845e04-cfbc-4c73-add1-07adc66105a0	5b91aac5b84d6e4d1d807d0da747cf5a3f79814824a5d8bb49e1f5bc53cf1a9e	2024-04-24 12:56:07.616114+00	20240407183430_	\N	\N	2024-04-24 12:56:07.49021+00	1
57b442dd-2a8c-4510-8347-4fc035e60208	e0f4117c9ed5fc32080a63a7591bd72505e9f6a8cb81b07693043a3debf5ebad	2024-04-24 12:56:07.804016+00	20240412224745_	\N	\N	2024-04-24 12:56:07.673324+00	1
4ddeae0a-5592-479f-a64c-fb9070602185	a5c7a51a23cb988eb68f865da4e3a1ee015a911d0857c004a02ccb694f4d763c	2024-04-24 12:56:07.975029+00	20240412232320_	\N	\N	2024-04-24 12:56:07.86042+00	1
bbbdaec3-f1d5-4097-9375-2ffc20358503	edcd0013f9eed67133725f16a4aad9ff9be7c3331a1e38437668d5a1453d143b	2024-04-24 12:56:09.401736+00	20240423124924_	\N	\N	2024-04-24 12:56:09.276455+00	1
5e1e73c8-6e1a-4967-909d-a2cc272b3bd2	29bf23f0dbf829c1f6b1de180d3a90ca3e0e0fa95d6e33c8dfd40c70ea010f0e	2024-04-24 12:56:08.155598+00	20240412233230_	\N	\N	2024-04-24 12:56:08.032594+00	1
073cf702-0799-4754-af34-b8f16c329abe	85aa4bbaa7b80cce2493631bd3a7711dd2db81fe67767ef11c161a07bd2711cd	2024-04-24 12:56:08.378204+00	20240413220644_	\N	\N	2024-04-24 12:56:08.215248+00	1
5c462e4b-64f1-482d-9a07-8456413baea0	1631f0f1814517bc8a49334c981271e8dfc87ce6a780aaf4f680a6170545c848	2024-04-24 12:56:09.576074+00	20240424012453_	\N	\N	2024-04-24 12:56:09.459307+00	1
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

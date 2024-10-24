--Consignes---

-- Recuperer le backend  sans lancer
-- Veuillez vider vos tables privileges,utilisateur_profil,profil_privilege
--executer les scripts ci-dessous
--Lancer le back



-- Liste des privileges

INSERT INTO public."privileges"
(id, created_by, created_date, last_modified_by, last_modified_date, code, deleted, libelle)
VALUES(1, 'Anonymous', '2024-01-27 22:50:40.991', NULL, '2024-01-27 22:50:40.991', 'ADD_PARAM', false, 'GESTION PARAMETRE');
INSERT INTO public."privileges"
(id, created_by, created_date, last_modified_by, last_modified_date, code, deleted, libelle)
VALUES(2, 'Anonymous', '2024-01-27 22:50:40.991', NULL, '2024-01-27 22:50:40.991', 'VIEW_PARAM', false, 'CONSULTATION PARAMETRE');
INSERT INTO public."privileges"
(id, created_by, created_date, last_modified_by, last_modified_date, code, deleted, libelle)
VALUES(3, 'Anonymous', '2024-01-27 22:50:40.991', NULL, '2024-01-27 22:50:40.991', 'ADD_USER', false, 'GESTION UTILISATEUR');
INSERT INTO public."privileges"
(id, created_by, created_date, last_modified_by, last_modified_date, code, deleted, libelle)
VALUES(4, 'Anonymous', '2024-01-27 22:50:40.991', NULL, '2024-01-27 22:50:40.991', 'VIEW_USER', false, 'CONSULTATION UTILISATEUR');
INSERT INTO public."privileges"
(id, created_by, created_date, last_modified_by, last_modified_date, code, deleted, libelle)
VALUES(5, 'Anonymous', '2024-01-27 22:50:40.991', NULL, '2024-01-27 22:50:40.991', 'ADD_MVT', false, 'GESTION MOUVEMENT');
INSERT INTO public."privileges"
(id, created_by, created_date, last_modified_by, last_modified_date, code, deleted, libelle)
VALUES(6, 'Anonymous', '2024-01-27 22:50:40.991', NULL, '2024-01-27 22:50:40.991', 'VIEW_MVT', false, 'CONSULTATION MOUVEMENT');
INSERT INTO public."privileges"
(id, created_by, created_date, last_modified_by, last_modified_date, code, deleted, libelle)
VALUES(7, 'Anonymous', '2024-01-27 22:50:40.991', NULL, '2024-01-27 22:50:40.991', 'VIEW_STAT', false, 'STATISTIQUE');

INSERT INTO public."privileges"
(id, created_by, created_date, last_modified_by, last_modified_date, code, deleted, libelle)
VALUES(8, 'Anonymous', '2024-01-27 22:50:40.991', NULL, '2024-01-27 22:50:40.991', 'VALIDE_MVT', false, 'VALIDATION DES MOUVEMENTS');




-- creation de vos differents profils ( ADMIN,MAGASINIER,CONSULTANT,GESTIONNAIRE......);

INSERT INTO public.profil
(id, created_by, created_date, last_modified_by, last_modified_date, code, deleted, libelle, native_profile)
VALUES(1, 'Anonymous', '2024-01-27 22:47:47.948', NULL, '2024-01-27 22:47:47.948', 'ADMIN', false, 'ADMINISTRATEUR', true);



--Liaison des privileges a un profil donne

INSERT INTO public.profil_privilege
(profil_id, privilege_id)
VALUES(1, 1);
INSERT INTO public.profil_privilege
(profil_id, privilege_id)
VALUES(1, 2);
INSERT INTO public.profil_privilege
(profil_id, privilege_id)
VALUES(1, 3);
INSERT INTO public.profil_privilege
(profil_id, privilege_id)
VALUES(1, 4);
INSERT INTO public.profil_privilege
(profil_id, privilege_id)
VALUES(1, 5);
INSERT INTO public.profil_privilege
(profil_id, privilege_id)
VALUES(1, 6);
INSERT INTO public.profil_privilege
(profil_id, privilege_id)
VALUES(1, 7);

-- attribution du profil de votre utilisateur

INSERT INTO public.utilisateur_profil
(utilisateur_id, profil_id)
VALUES(1, 1);


alter table public.medailles add constraint IDX_UNIQUE_MEDAILLE_FULLNAME unique (nom_complet);
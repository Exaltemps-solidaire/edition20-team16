# Plan d'itérations

**Plan validé le 2026-11-18.**

- **Source du plan** : proposé par l'agent. Aucun fichier de `cadrage/` ne contient « iteration » dans son nom, et `passation.json` n'a pas de clé `iterations` : `cadrage/6-plan-de-livraison.md` (repris aussi dans `7-prd.md`) donne l'ordre des 3 valeurs à livrer, mais pas un découpage en itérations ni une itération 0 de squelette. Ce plan reprend son ordre, retaillé en itérations qui tiennent dans le budget de 10 minutes de codage, avec un squelette publié en premier.
- **Temps restant annoncé** : 30-45 minutes (réponse du développeur le 2026-11-18 à 17:07 — une fourchette, pas un chiffre : à reconfirmer au début de chaque itération).
- **Durée du tour de test de l'équipe** : 5 minutes.
- **Temps restant au début de l'itération 2** : 10-15 minutes (réponse du développeur le 2026-11-18 à 17:35).
- **Capacité déduite** : une itération coûte son codage (≤10 min) + ~5 min de publication + 5 min de tour de test. Avec 30-45 minutes, ça tient pour 2 itérations courtes confortablement ; une 3ᵉ ne passe que si le temps réel est proche de 45 minutes et que les deux premières ne dépassent pas leur budget.
- **Hors périmètre** (✂️, au-delà des 2 itérations détaillées) :
  - Itération « orientation vers un passage » (affichage de « Repasser pour » / « Date de prochain passage ») — reportée en itération 3, à ne détailler que si le temps le permet.
  - Itération « confirmation / récapitulatif » (point 3 du plan de l'équipe) — peu de chances de passer dans le temps annoncé, reportée en « À venir ».
  - Tout ce que le PRD exclut déjà : prospection, envoi groupé, suivi par personne formée, organisation d'une session, autres déclencheurs que le formulaire de suivi, authentification.

---

## Itération 1 : Le squelette publié, avec l'écran « Qui êtes-vous ? » et le formulaire de suivi d'un commerce fictif

- **Dans le périmètre** :
  - `.env.example` (racine) listant les variables lues par `api/` et `frontend/`, et `DEPLOIEMENT.md` (gabarit du contrat de déployabilité).
  - Remplacer la page par défaut de Next (`frontend/src/app/page.tsx`) par l'écran d'entrée « Qui êtes-vous ? » : une liste de personas en dur (au moins « la coordinatrice de terrain »), cliquable.
  - Choisir une persona mène à l'écran du formulaire de suivi d'**un** commerce fictif (données en dur), avec la question actuelle telle quelle (pas encore les 3 choix — c'est l'itération 2).
- **Hors périmètre** : la logique des 3 choix, la persistance, les autres rôles/personas, le bouton « changer de rôle » (peut venir plus tard si l'écran single-persona suffit à démontrer le cas).
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'application déployée, quand on ouvre l'URL racine, alors on voit l'écran « Qui êtes-vous ? » avec au moins une persona cliquable.
  - Étant donné une persona choisie, quand on clique dessus, alors on arrive sur l'écran du formulaire de suivi d'un commerce fictif.
  - Étant donné l'application déployée, quand on vérifie `/health` et `/sante` (port 8080, gabarit déjà posé), alors ils répondent `200`.
- **Hypothèse de l'équipe couverte** : aucune — cette itération pose le chemin de navigation, pas le test de l'hypothèse (couverte en itération 2).
- **Codage estimé** : 6 minutes.
- **Fichiers prévus** (~5) : `.env.example`, `DEPLOIEMENT.md`, `frontend/src/app/page.tsx`, `frontend/src/app/suivi/page.tsx` (ou équivalent), un fichier de données en dur (personas + commerce fictif).
- **Tests unitaires prévus** (1 à 3) : sur la fonction qui choisit la persona active et récupère le commerce fictif associé (pas sur le balisage JSX).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouverture de l'application, sélection d'une persona, arrivée sur l'écran du formulaire de suivi.
- **Bilan** :
  - Codage réel : 5 minutes, sous le budget de 10 minutes.
  - Critères d'acceptation 1 et 2 satisfaits et vérifiés **en local** (export statique servi sur un port de secours, hors 8080/8081, le temps de la vérification puis arrêté) : l'écran « Qui êtes-vous ? » s'affiche, cliquer sur la persona mène au formulaire de suivi du commerce fictif. Critère 3 (`/health`, `/sante` en ligne) non vérifiable pour l'instant — voir blocage ci-dessous.
  - 3 tests Vitest ajoutés (`frontend/src/lib/personas.test.ts`), `npm test` passe à la racine (2 tests api + 3 tests front). Lint clean. `./scripts/verifier-deployabilite.sh` : aucune borne.
  - **❗️ Bloqué avant DoD 4/5/6** : la plateforme (`gitlab-ci-local --force-shell-executor`), lancée en arrière-plan au début de l'itération, n'a pas fini de démarrer après plus de 5 minutes. Chaque image non déjà en cache local se heurte au quota de pull anonyme de Docker Hub (`toomanyrequests`) — `registry:2` (le registre local `localhost:5000`, nécessaire pour publier nos images) et `pgvector/pgvector:pg17` (probablement `postgres.internal`) ont échoué ainsi, comme `seaweedfs`, `temporalio/auto-setup` et `casdoor` au moment de ce bilan. `valkey`, `openbao`, `dozzle` et `apisix` étaient déjà en cache et ont démarré. Rien dans mes outils ne permet de contourner ce quota (pas d'identifiants Docker Hub, pas de miroir configuré dans `/etc/containers/registries.conf`).
  - Premier démarrage de la plateforme bloqué par un quota Docker Hub (`registry.internal` et `postgres.internal` n'ont pas pu être tirés). Le développeur a confirmé que l'infra a été corrigée côté organisateurs ; un second démarrage a bien monté tous les services, y compris `registry.internal` et `postgres.internal`.
  - Base `team16` créée. Images qualifiées en `docker.io/library/...` dans les deux `Dockerfile` (sinon résolution de nom courte échoue hors terminal interactif). `podman-compose.yml` écrit à la racine (front sur 8080, api sur 8081, réseau `core-network`). Images construites et publiées sur `localhost:5000/team16/{api,frontend}:dev`, puis déployées avec `podman compose ... up -d --force-recreate`.
  - Vérifié depuis la VM : `curl localhost:8080/` affiche l'écran « Qui êtes-vous ? », `localhost:8080/health`, `localhost:8080/sante`, `localhost:8081/health`, `localhost:8081/sante` répondent tous `200`.
  - `./scripts/verifier-deployabilite.sh` : aucune borne. `npm test` (racine) : 5 tests verts.
  - Reporté : rien sur le périmètre fonctionnel. `e2e/demo.spec.ts` non mis à jour cette itération (temps pris par le blocage infra) — à faire en itération 2.
  - Développeur : `$URL_PUBLIQUE/health` et `/sante` confirmés `ok` dans le navigateur.
  - **Signalé à PM Lab** : `./scripts/signaler-version.sh 1` → version 1 enregistrée.
  - **Modifications** :
    - `frontend/src/lib/personas.ts` (+ test) : données en dur (persona, commerce fictif) et fonction `trouverPersona` — sert les critères 1 et 2.
    - `frontend/src/app/page.tsx` : écran « Qui êtes-vous ? » puis formulaire de suivi, remplace la page par défaut de Next — sert les critères 1 et 2.
    - `frontend/src/app/page.module.css`, `layout.tsx` : styles et métadonnées associés.
    - `.env.example`, `DEPLOIEMENT.md` : contrat de déployabilité (règles 2 et 8) — sert le critère 3.
    - `podman-compose.yml` : déploiement (front 8080, api 8081, réseau `core-network`).
    - `api/Dockerfile`, `frontend/Dockerfile` : images de base qualifiées en `docker.io/library/...`.

## Itération 2 : La question à trois choix remplace la case ambiguë

- **Dans le périmètre** : sur l'écran du formulaire de suivi, remplacer la case « Intérêt formation » (OUI/NON) par les trois choix « Former l'équipe », « Accompagnement (affiches, pictos, nouveau briefing) » et « Je ne sais pas » ; le choix est retenu en mémoire (état local, pas de base de données).
- **Hors périmètre** : affichage des champs « Repasser pour » / « Date de prochain passage » (itération 3), récapitulatif de confirmation, persistance côté API/Postgres.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné le formulaire de suivi ouvert, quand la coordinatrice regarde la question de besoin, alors elle voit les trois choix distincts, sans case ambiguë ni obligation d'ouvrir un commentaire libre.
  - Étant donné qu'elle sélectionne un choix parmi les trois, quand elle valide, alors ce choix est retenu tel quel (vérifiable sans relire le commentaire libre).
  - Étant donné qu'elle sélectionne « Accompagnement », quand elle valide, alors aucune session de formation n'est créée (la logique ne l'ajoute pas à une liste de formations).
- **Hypothèse de l'équipe couverte** : « remplacer la case ambiguë par trois choix distincts permet à la coordinatrice d'orienter sans lire le commentaire libre » (mesure : proportion de réponses orientées sans lecture du commentaire libre, cible 100 %).
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** (~4) : le composant du formulaire de suivi, un type/fonction d'orientation du besoin, son test.
- **Tests unitaires prévus** (1 à 3) : sur la fonction qui, à partir du choix sélectionné, décide s'il faut créer une session de formation ou orienter vers un passage.
- **Étapes ajoutées à la démo** : sélection de chacun des trois choix sur le formulaire, validation.
- **Bilan** :
  - Codage réel : 1 minute (plateforme et images déjà prêtes depuis l'itération 1), bien sous le budget — vu les 10-15 minutes annoncées, pas de dépassement possible.
  - Les 3 critères d'acceptation sont satisfaits : les trois choix distincts remplacent le OUI/NON ambigu ; le choix sélectionné est retenu via `orienterBesoin` ; « Accompagnement » et « Je ne sais pas » n'ajoutent rien à la liste (en dur) des sessions de formation à organiser, affichée sur l'écran — seul « Former l'équipe » le fait.
  - 3 tests Vitest ajoutés (`frontend/src/lib/besoin.test.ts`), `npm test` passe à la racine (2 api + 6 front = 8 tests). Lint clean, build Next OK.
  - `./scripts/verifier-deployabilite.sh` : aucune borne.
  - Image `frontend` reconstruite et republiée (l'API n'a pas changé) ; redéployée avec `podman compose ... up -d --force-recreate`. Vérifié sur la VM : `/health` et `/sante` répondent `200` sur 8080 et 8081, l'écran « Qui êtes-vous ? » s'affiche toujours.
  - Reporté : `e2e/demo.spec.ts` toujours pas mis à jour (deux itérations de suite) — à faire si une itération de stabilisation le permet.
  - **Modifications** :
    - `frontend/src/lib/besoin.ts` (+ test) : type `ChoixBesoin` et fonction pure `orienterBesoin` — sert les 3 critères.
    - `frontend/src/app/page.tsx` : remplace le `<select>` OUI/NON par les trois choix, ajoute le bouton de validation et la liste (en dur) des sessions de formation à organiser — sert les 3 critères.
    - `frontend/src/lib/personas.ts` : retire le champ `interetFormation`, devenu inutile (remplacé par `ChoixBesoin`).

---

## À venir

- Orientation vers un passage : quand « Accompagnement » est choisi, afficher les champs existants « Repasser pour » et « Date de prochain passage », sans créer de session de formation.
- Confirmation : après validation du formulaire, afficher un récapitulatif du besoin retenu (et la date de passage le cas échéant).
- Stabilisation finale pour le pitch, si le temps restant ne permet plus qu'une itération.

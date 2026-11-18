# Déploiement

Suivi des commerces du réseau Carillon : une coordinatrice de La Cloche repère le besoin
(formation ou accompagnement) signalé par un commerce via le formulaire de suivi. Pour
l'association La Cloche (réseau Carillon).

## Services

- `frontend/` : export statique Next.js, servi par nginx sur le port 80 (port 8080 côté
  serveur). **Exposé au public.**
- `api/` : service Node, écoute sur le port 8081 (variable `PORT`). Répond `/health` et
  `/sante`. Ne sert encore aucune route métier.

## Services externes appelés

Aucun pour l'instant : les données de cette itération sont en dur dans le front
(`frontend/src/lib/personas.ts`). Rien ne casse si un service externe de la plateforme est
indisponible.

## Connu comme fragile ou inachevé

- Une seule persona en dur, un seul commerce fictif : pas de données réelles, pas de
  persistance.
- La question de besoin reprend encore la case ambiguë OUI/NON (les trois choix arrivent à
  l'itération suivante).
- Pas de base de données ni de stockage branché : à faire dès qu'une itération en a besoin.

## Contact

Équipe 16 — côté association, voir `passation/contexte/association.md`.

// Données en dur pour l'itération 1 : pas de connexion, pas de base de données.
// La coordinatrice choisit sa persona, puis arrive sur le formulaire de suivi d'un commerce fictif.

export type Persona = {
  id: string;
  nom: string;
  role: string;
};

export type Commerce = {
  id: string;
  nom: string;
  interetFormation: "OUI" | "NON";
};

export const PERSONAS: Persona[] = [
  { id: "p1", nom: "Awa Diallo", role: "Coordinatrice de terrain" },
];

export const COMMERCE_FICTIF: Commerce = {
  id: "c1",
  nom: "Café du Carillon",
  interetFormation: "NON",
};

export function trouverPersona(id: string): Persona | undefined {
  return PERSONAS.find((persona) => persona.id === id);
}

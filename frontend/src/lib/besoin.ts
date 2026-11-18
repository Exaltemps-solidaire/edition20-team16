// La question du formulaire de suivi, remplacée par trois choix distincts (itération 2) :
// « Accompagnement » oriente vers un passage, sans créer de session de formation.

export type ChoixBesoin = "formation" | "accompagnement" | "je_ne_sais_pas";

export type Orientation = {
  creeSessionFormation: boolean;
};

export function orienterBesoin(choix: ChoixBesoin): Orientation {
  return { creeSessionFormation: choix === "formation" };
}

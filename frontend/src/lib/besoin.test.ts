import { describe, expect, it } from "vitest";
import { orienterBesoin } from "./besoin";

describe("orienterBesoin", () => {
  it("crée une session de formation quand le choix est « formation »", () => {
    expect(orienterBesoin("formation").creeSessionFormation).toBe(true);
  });

  it("ne crée pas de session de formation pour un accompagnement", () => {
    expect(orienterBesoin("accompagnement").creeSessionFormation).toBe(false);
  });

  it("ne crée pas de session de formation quand la coordinatrice ne sait pas", () => {
    expect(orienterBesoin("je_ne_sais_pas").creeSessionFormation).toBe(false);
  });
});

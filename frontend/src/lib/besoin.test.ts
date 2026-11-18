import { describe, expect, it } from "vitest";
import { orienterBesoin } from "./besoin";

describe("orienterBesoin", () => {
  it("crée une session de formation quand le choix est « formation »", () => {
    expect(orienterBesoin("formation")).toEqual({
      creeSessionFormation: true,
      creePassage: false,
    });
  });

  it("oriente vers un passage, sans session de formation, pour un accompagnement", () => {
    expect(orienterBesoin("accompagnement")).toEqual({
      creeSessionFormation: false,
      creePassage: true,
    });
  });

  it("ne crée ni session de formation ni passage quand la coordinatrice ne sait pas", () => {
    expect(orienterBesoin("je_ne_sais_pas")).toEqual({
      creeSessionFormation: false,
      creePassage: false,
    });
  });
});

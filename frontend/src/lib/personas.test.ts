import { describe, expect, it } from "vitest";
import { COMMERCE_FICTIF, PERSONAS, trouverPersona } from "./personas";

describe("trouverPersona", () => {
  it("retrouve une persona connue par son id", () => {
    expect(trouverPersona(PERSONAS[0].id)).toEqual(PERSONAS[0]);
  });

  it("renvoie undefined pour un id inconnu", () => {
    expect(trouverPersona("inconnu")).toBeUndefined();
  });

  it("expose un commerce fictif pour le formulaire de suivi", () => {
    expect(COMMERCE_FICTIF.nom).toBeTruthy();
  });
});

"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { COMMERCE_FICTIF, PERSONAS, trouverPersona } from "../lib/personas";
import { orienterBesoin, type ChoixBesoin } from "../lib/besoin";

const LIBELLES_CHOIX: Record<ChoixBesoin, string> = {
  formation: "Former l'équipe",
  accompagnement: "Accompagnement (affiches, pictos, nouveau briefing)",
  je_ne_sais_pas: "Je ne sais pas",
};

export default function Home() {
  const [personaId, setPersonaId] = useState<string | null>(null);
  const [choix, setChoix] = useState<ChoixBesoin | null>(null);
  const [sessionsAOrganiser, setSessionsAOrganiser] = useState<string[]>([]);
  const persona = personaId ? trouverPersona(personaId) : undefined;

  if (!persona) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Qui êtes-vous ?</h1>
          <ul className={styles.personas}>
            {PERSONAS.map((candidat) => (
              <li key={candidat.id}>
                <button type="button" onClick={() => setPersonaId(candidat.id)}>
                  {candidat.nom} — {candidat.role}
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>
          Connecté·e en tant que {persona.nom} ({persona.role}){" "}
          <button type="button" onClick={() => setPersonaId(null)}>
            Changer de rôle
          </button>
        </p>
        <h1>Formulaire de suivi — {COMMERCE_FICTIF.nom}</h1>
        <fieldset className={styles.champ}>
          <legend>
            Est-ce que vous avez besoin d&apos;une formation ou d&apos;un accompagnement de La
            Cloche dans le cadre du Carillon ?
          </legend>
          {(Object.keys(LIBELLES_CHOIX) as ChoixBesoin[]).map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="choix-besoin"
                value={option}
                checked={choix === option}
                onChange={() => setChoix(option)}
              />
              {LIBELLES_CHOIX[option]}
            </label>
          ))}
          <button
            type="button"
            disabled={!choix}
            onClick={() => {
              if (!choix) return;
              if (orienterBesoin(choix).creeSessionFormation) {
                setSessionsAOrganiser((sessions) => [...sessions, COMMERCE_FICTIF.nom]);
              }
            }}
          >
            Valider
          </button>
        </fieldset>
        <p>
          Sessions de formation à organiser :{" "}
          {sessionsAOrganiser.length === 0 ? "aucune" : sessionsAOrganiser.join(", ")}
        </p>
      </main>
    </div>
  );
}

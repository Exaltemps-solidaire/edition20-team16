"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { COMMERCE_FICTIF, PERSONAS, trouverPersona } from "../lib/personas";

export default function Home() {
  const [personaId, setPersonaId] = useState<string | null>(null);
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
        <label className={styles.champ}>
          Est-ce que vous avez besoin d&apos;une formation ou d&apos;un accompagnement de La Cloche
          dans le cadre du Carillon ?
          <select defaultValue={COMMERCE_FICTIF.interetFormation}>
            <option value="OUI">OUI</option>
            <option value="NON">NON</option>
          </select>
        </label>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";

import { company, maintenanceFieldLabels, maintenancePackages } from "@/lib/site-data";

type FormMode = "project" | "maintenance";

type SubmissionState = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
};

type RequestFormsProps = {
  initialMode?: FormMode;
};

const projectTopics = [
  "Heizungsmodernisierung",
  "Wärmepumpe",
  "Badsanierung",
  "Klimaanlage",
  "Allgemeine Anfrage",
];

export function RequestForms({ initialMode = "project" }: RequestFormsProps) {
  const [mode, setMode] = useState<FormMode>(initialMode);
  const [projectState, setProjectState] = useState<SubmissionState>({ status: "idle" });
  const [maintenanceState, setMaintenanceState] = useState<SubmissionState>({ status: "idle" });

  async function handleSubmit(form: HTMLFormElement, target: FormMode) {
    const setter = target === "project" ? setProjectState : setMaintenanceState;
    setter({ status: "submitting", message: "Anfrage wird gesendet ..." });

    const body = new FormData(form);
    body.set("formType", target);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body,
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Die Anfrage konnte nicht gesendet werden.");
      }

      form.reset();
      setter({
        status: "success",
        message: payload.message || "Die Anfrage wurde erfolgreich gesendet.",
      });
    } catch (error) {
      setter({
        status: "error",
        message: error instanceof Error ? error.message : "Beim Senden ist ein Fehler aufgetreten.",
      });
    }
  }

  return (
    <div className="forms-shell">
      <div className="tab-row" role="tablist" aria-label="Anfragearten">
        <button
          className={mode === "project" ? "tab-button is-active" : "tab-button"}
          onClick={() => setMode("project")}
          role="tab"
          aria-selected={mode === "project"}
          type="button"
        >
          Projektanfrage
        </button>
        <button
          className={mode === "maintenance" ? "tab-button is-active" : "tab-button"}
          onClick={() => setMode("maintenance")}
          role="tab"
          aria-selected={mode === "maintenance"}
          type="button"
        >
          Wartung anfragen
        </button>
      </div>

      {mode === "project" ? (
        <form
          className="request-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event.currentTarget, "project");
          }}
        >
          <div className="field-grid">
            <label>
              Name
              <input name="name" type="text" required />
            </label>
            <label>
              Telefon
              <input name="phone" type="tel" required />
            </label>
            <label>
              E-Mail
              <input name="email" type="email" />
            </label>
            <label>
              Thema
              <select name="topic" defaultValue={projectTopics[0]} required>
                {projectTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Was planen Sie?
            <textarea
              name="message"
              rows={6}
              placeholder="Kurz beschreiben, worum es geht und was bereits vorhanden ist."
              required
            />
          </label>

          <div className="form-note">
            Für den Notdienst bitte direkt anrufen: <a href={company.phones.mobileHref}>{company.phones.mobile}</a>
          </div>

          <button className="button button-primary" type="submit" disabled={projectState.status === "submitting"}>
            Projektanfrage senden
          </button>
          {projectState.message ? (
            <p className={`form-feedback ${projectState.status}`}>{projectState.message}</p>
          ) : null}
        </form>
      ) : (
        <form
          className="request-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event.currentTarget, "maintenance");
          }}
        >
          <fieldset className="package-grid">
            <legend>Wartungspaket wählen</legend>
            {maintenancePackages.map((item) => (
              <label key={item.slug} className={item.recommended ? "package-card is-recommended" : "package-card"}>
                <input
                  defaultChecked={Boolean(item.recommended)}
                  name="package"
                  type="radio"
                  value={`${item.name} | ${item.priceLabel}`}
                />
                <span className="package-name">{item.name}</span>
                <span className="package-price">{item.priceLabel}</span>
                <small>{item.summary}</small>
              </label>
            ))}
          </fieldset>

          <div className="field-grid">
            <label>
              {maintenanceFieldLabels.name}
              <input name="name" type="text" required />
            </label>
            <label>
              {maintenanceFieldLabels.telefon}
              <input name="telefon" type="tel" required />
            </label>
            <label>
              {maintenanceFieldLabels.email}
              <input name="email" type="email" />
            </label>
            <label>
              {maintenanceFieldLabels.anlagenadresse}
              <input name="anlagenadresse" type="text" required />
            </label>
            <label className="field-wide">
              {maintenanceFieldLabels.rechnungsanschrift}
              <input name="rechnungsanschrift" type="text" placeholder="Falls abweichend" />
            </label>
            <label>
              {maintenanceFieldLabels.geraetetyp}
              <input name="geraetetyp" type="text" required />
            </label>
            <label>
              {maintenanceFieldLabels.geraetebezeichnung}
              <input name="geraetebezeichnung" type="text" required />
            </label>
            <label>
              {maintenanceFieldLabels.seriennummer}
              <input name="seriennummer" type="text" />
            </label>
            <label>
              {maintenanceFieldLabels.hersteller_optional}
              <input name="hersteller_optional" type="text" />
            </label>
            <label>
              {maintenanceFieldLabels.letzte_wartung_optional}
              <input name="letzte_wartung_optional" type="text" placeholder="z. B. 09/2025" />
            </label>
          </div>

          <label>
            {maintenanceFieldLabels.foto_typenschild_optional}
            <input
              name="attachments"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,.webp"
              multiple
            />
          </label>

          <label>
            {maintenanceFieldLabels.hinweise_optional}
            <textarea
              name="hinweise_optional"
              rows={5}
              placeholder="Auffälligkeiten, bekannte Störungen oder weitere Hinweise"
            />
          </label>

          <p className="form-note">
            Typenschild- oder Anlagenfotos helfen uns, die Wartung schneller und sauberer vorzubereiten.
          </p>

          <button className="button button-primary" type="submit" disabled={maintenanceState.status === "submitting"}>
            Wartung anfragen
          </button>
          {maintenanceState.message ? (
            <p className={`form-feedback ${maintenanceState.status}`}>{maintenanceState.message}</p>
          ) : null}
        </form>
      )}
    </div>
  );
}

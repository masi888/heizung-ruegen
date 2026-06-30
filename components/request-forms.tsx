"use client";

import { useState } from "react";

import {
  formatBytes,
  getInquiryFileKind,
  inquiryUploadLimits,
  validateInquirySelection,
  validateInquiryFiles,
} from "@/lib/inquiry-limits.mjs";
import {
  company,
  maintenanceFieldLabels,
  maintenancePackages,
  softenerPackages,
} from "@/lib/site-data";

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

// Geteilte Styles für Eingabe-Elemente — Editorial-Input mit Unterstrich-Akzent
const fieldWrap = "flex flex-col gap-2";
const fieldLabel =
  "text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant";
const fieldControl =
  "w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 " +
  "rounded-lg border border-outline-variant/40 border-b-2 border-b-outline-variant/60 " +
  "px-4 py-3 text-base transition-all " +
  "focus:outline-none focus:border-b-accent focus:ring-2 focus:ring-accent/20";
const tabBase =
  "flex-1 px-4 py-3 rounded-lg font-bold text-sm transition-all border-2";
const tabActive = "bg-primary text-on-primary border-primary";
const tabIdle =
  "bg-surface-container-low text-on-surface-variant border-transparent hover:border-outline-variant/40";
const submitBtn =
  "inline-flex items-center justify-center gap-2 bg-primary text-on-primary " +
  "px-6 py-4 rounded-lg font-bold text-base transition-all " +
  "hover:bg-primary-container active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";
const projectPanelId = "request-form-project-panel";
const maintenancePanelId = "request-form-maintenance-panel";
const maintenanceUploadHelpId = "maintenance-upload-help";
const uploadHelpText =
  `Maximal ${inquiryUploadLimits.maxFiles} Dateien. Fotos werden automatisch verkleinert, ` +
  `bis ${formatBytes(inquiryUploadLimits.maxImageInputBytes)} pro Bild. ` +
  `PDFs bis ${formatBytes(inquiryUploadLimits.maxFileBytes)}. ` +
  `Versand insgesamt ${formatBytes(inquiryUploadLimits.maxTotalBytes)}.`;

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Das Bild konnte nicht vorbereitet werden."));
        }
      },
      "image/jpeg",
      quality,
    );
  });
}

async function loadImageSource(file: File) {
  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(file);
    return {
      source: bitmap,
      width: bitmap.width,
      height: bitmap.height,
      close: () => bitmap.close(),
    };
  }

  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  await image.decode();
  URL.revokeObjectURL(url);

  return {
    source: image,
    width: image.naturalWidth,
    height: image.naturalHeight,
    close: () => {},
  };
}

async function renderImage(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  quality: number,
  maxDimension: number,
) {
  const scale = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Das Bild konnte nicht vorbereitet werden.");
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(source, 0, 0, width, height);

  return canvasToBlob(canvas, quality);
}

async function optimizeImage(file: File) {
  if (file.size <= inquiryUploadLimits.maxCompressedImageBytes) {
    return file;
  }

  let image;

  try {
    image = await loadImageSource(file);
    let maxDimension = inquiryUploadLimits.imageMaxDimension;
    let quality = inquiryUploadLimits.imageQuality;
    let blob = await renderImage(
      image.source,
      image.width,
      image.height,
      quality,
      maxDimension,
    );

    while (blob.size > inquiryUploadLimits.maxCompressedImageBytes && quality > 0.62) {
      quality -= 0.08;
      blob = await renderImage(
        image.source,
        image.width,
        image.height,
        quality,
        maxDimension,
      );
    }

    if (blob.size > inquiryUploadLimits.maxCompressedImageBytes) {
      maxDimension = 1200;
      blob = await renderImage(image.source, image.width, image.height, 0.72, maxDimension);
    }

    const filename = file.name.replace(/\.[^.]+$/, "") || "foto";

    return new File([blob], `${filename}.jpg`, {
      type: "image/jpeg",
      lastModified: file.lastModified,
    });
  } catch {
    if (file.size <= inquiryUploadLimits.maxFileBytes) {
      return file;
    }

    throw new Error(
      `Das Bild ${file.name} konnte nicht automatisch verkleinert werden. Bitte als JPG, PNG oder WebP hochladen.`,
    );
  } finally {
    image?.close();
  }
}

async function prepareInquiryFiles(files: File[]) {
  validateInquirySelection(files);

  const preparedFiles = await Promise.all(
    files.map((file) =>
      getInquiryFileKind(file) === "image" ? optimizeImage(file) : file,
    ),
  );

  validateInquiryFiles(preparedFiles);

  return preparedFiles;
}

export function RequestForms({ initialMode = "project" }: RequestFormsProps) {
  const [mode, setMode] = useState<FormMode>(initialMode);
  const [projectState, setProjectState] = useState<SubmissionState>({
    status: "idle",
  });
  const [maintenanceState, setMaintenanceState] = useState<SubmissionState>({
    status: "idle",
  });

  async function handleSubmit(form: HTMLFormElement, target: FormMode) {
    const setter =
      target === "project" ? setProjectState : setMaintenanceState;
    setter({ status: "submitting", message: "Anfrage wird gesendet ..." });

    try {
      const fileInput =
        form.querySelector<HTMLInputElement>('input[name="attachments"]');
      const selectedFiles = Array.from(fileInput?.files ?? []).filter(
        (file) => file.size > 0,
      );
      const preparedFiles = await prepareInquiryFiles(selectedFiles);

      const body = new FormData(form);
      body.set("formType", target);
      body.delete("attachments");

      for (const file of preparedFiles) {
        body.append("attachments", file, file.name);
      }

      const response = await fetch("/api/inquiry", {
        method: "POST",
        body,
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          payload.message || "Die Anfrage konnte nicht gesendet werden.",
        );
      }

      form.reset();
      setter({
        status: "success",
        message:
          payload.message || "Die Anfrage wurde erfolgreich gesendet.",
      });
    } catch (error) {
      setter({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Beim Senden ist ein Fehler aufgetreten.",
      });
    }
  }

  const feedbackClasses = (status: SubmissionState["status"]) => {
    if (status === "success")
      return "bg-accent/10 border-accent/40 text-on-surface";
    if (status === "error")
      return "bg-error/10 border-error/40 text-error";
    return "bg-surface-container-low border-outline-variant/30 text-on-surface-variant";
  };

  return (
    <div className="space-y-8">
      {/* Tab-Zeile */}
      <div
        className="grid grid-cols-2 gap-2 bg-surface-container rounded-xl p-1.5"
        aria-label="Anfrageart auswählen"
      >
        <button
          className={`${tabBase} ${mode === "project" ? tabActive : tabIdle}`}
          onClick={() => setMode("project")}
          aria-controls={projectPanelId}
          aria-pressed={mode === "project"}
          type="button"
        >
          Projektanfrage
        </button>
        <button
          className={`${tabBase} ${mode === "maintenance" ? tabActive : tabIdle}`}
          onClick={() => setMode("maintenance")}
          aria-controls={maintenancePanelId}
          aria-pressed={mode === "maintenance"}
          type="button"
        >
          Wartung anfragen
        </button>
      </div>

      {mode === "project" ? (
        <form
          id={projectPanelId}
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event.currentTarget, "project");
          }}
        >
          {/* Honeypot — für Bots unsichtbar, muss leer bleiben */}
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] opacity-0 pointer-events-none"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            <label className={fieldWrap}>
              <span className={fieldLabel}>Name</span>
              <input
                name="name"
                type="text"
                required
                className={fieldControl}
                autoComplete="name"
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>Telefon</span>
              <input
                name="phone"
                type="tel"
                required
                className={fieldControl}
                autoComplete="tel"
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>E-Mail</span>
              <input
                name="email"
                type="email"
                className={fieldControl}
                autoComplete="email"
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>Thema</span>
              <select
                name="topic"
                defaultValue={projectTopics[0]}
                required
                className={fieldControl}
              >
                {projectTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className={fieldWrap}>
            <span className={fieldLabel}>Was planen Sie?</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Kurz beschreiben, worum es geht und was bereits vorhanden ist."
              required
              className={`${fieldControl} resize-y min-h-[140px]`}
            />
          </label>

          <p className="text-sm text-on-surface-variant">
            Für den Notdienst bitte direkt anrufen:{" "}
            <a
              href={company.phones.mobileHref}
              className="font-bold text-primary hover:text-accent"
            >
              {company.phones.mobile}
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button
              className={submitBtn}
              type="submit"
              disabled={projectState.status === "submitting"}
            >
              {projectState.status === "submitting"
                ? "Wird gesendet..."
                : "Projektanfrage senden"}
            </button>
          </div>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            Mit dem Absenden stimmen Sie zu, dass wir Ihre Angaben zur Bearbeitung Ihrer Anfrage verwenden.
            Details finden Sie in unserer{" "}
            <a href="/datenschutz" className="font-semibold text-primary hover:text-accent">
              Datenschutzerklärung
            </a>
            .
          </p>

          {projectState.message ? (
            <p
              className={`border rounded-lg px-4 py-3 text-sm ${feedbackClasses(projectState.status)}`}
              role="status"
            >
              {projectState.message}
            </p>
          ) : null}
        </form>
      ) : (
        <form
          id={maintenancePanelId}
          className="space-y-8"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event.currentTarget, "maintenance");
          }}
        >
          {/* Honeypot — für Bots unsichtbar, muss leer bleiben */}
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] opacity-0 pointer-events-none"
          />
          {/* Paket-Auswahl: Heizung */}
          <fieldset className="space-y-4">
            <legend className={`${fieldLabel} mb-3`}>
              Heizungs-Wartungspaket
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {maintenancePackages.map((item) => (
                <label
                  key={item.slug}
                  className={`relative flex flex-col gap-2 rounded-xl border-2 p-5 cursor-pointer transition-all
                    bg-surface-container-lowest
                    has-[:checked]:border-accent has-[:checked]:shadow-[0_0_0_4px_rgba(234,122,30,0.12)]
                    hover:border-accent/60
                    ${item.recommended ? "border-accent/40" : "border-outline-variant/30"}`}
                >
                  <input
                    defaultChecked={Boolean(item.recommended)}
                    name="package"
                    type="radio"
                    value={`${item.name} | ${item.priceLabel}`}
                    className="sr-only"
                  />
                  {item.recommended && (
                    <span className="absolute -top-2 right-4 bg-accent text-on-accent text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
                      Empfohlen
                    </span>
                  )}
                  <span className="text-base font-bold text-primary">
                    {item.name}
                  </span>
                  <span className="text-sm font-bold text-accent">
                    {item.priceLabel}
                  </span>
                  <small className="text-xs text-on-surface-variant leading-relaxed">
                    {item.summary}
                  </small>
                </label>
              ))}
              <label
                className="relative flex flex-col gap-2 rounded-xl border-2 border-outline-variant/30 p-5 cursor-pointer transition-all
                  bg-surface-container-lowest
                  has-[:checked]:border-accent has-[:checked]:shadow-[0_0_0_4px_rgba(234,122,30,0.12)]
                  hover:border-accent/60"
              >
                <input
                  name="package"
                  type="radio"
                  value=""
                  className="sr-only"
                />
                <span className="text-base font-bold text-primary">
                  Kein Heizungspaket
                </span>
                <small className="text-xs text-on-surface-variant leading-relaxed">
                  Ich möchte ausschließlich ein Enthärtungspaket anfragen.
                </small>
              </label>
            </div>
          </fieldset>

          {/* Paket-Auswahl: Enthärtungsanlage */}
          <fieldset className="space-y-4">
            <legend className={`${fieldLabel} mb-3`}>
              Wartungspaket Enthärtungsanlage
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {softenerPackages.map((item) => (
                <label
                  key={item.slug}
                  className="relative flex flex-col gap-2 rounded-xl border-2 border-outline-variant/30 p-5 cursor-pointer transition-all
                    bg-surface-container-lowest
                    has-[:checked]:border-accent has-[:checked]:shadow-[0_0_0_4px_rgba(234,122,30,0.12)]
                    hover:border-accent/60"
                >
                  <input
                    name="package_enthaertung"
                    type="checkbox"
                    value={`${item.name} | ${item.priceLabel}`}
                    className="sr-only"
                  />
                  <span className="text-base font-bold text-primary">
                    {item.name}
                  </span>
                  <span className="text-sm font-bold text-accent">
                    {item.priceLabel}
                  </span>
                  <small className="text-xs text-on-surface-variant leading-relaxed">
                    {item.summary}
                  </small>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Kontakt + Anlagen-Daten */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.name}
              </span>
              <input
                name="name"
                type="text"
                required
                className={fieldControl}
                autoComplete="name"
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.telefon}
              </span>
              <input
                name="telefon"
                type="tel"
                required
                className={fieldControl}
                autoComplete="tel"
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.email}
              </span>
              <input
                name="email"
                type="email"
                className={fieldControl}
                autoComplete="email"
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.anlagenadresse}
              </span>
              <input
                name="anlagenadresse"
                type="text"
                required
                className={fieldControl}
                autoComplete="street-address"
              />
            </label>
            <label className={`${fieldWrap} sm:col-span-2`}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.rechnungsanschrift}
              </span>
              <input
                name="rechnungsanschrift"
                type="text"
                placeholder="Falls abweichend"
                className={fieldControl}
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.geraetetyp}
              </span>
              <input
                name="geraetetyp"
                type="text"
                required
                className={fieldControl}
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.geraetebezeichnung}
              </span>
              <input
                name="geraetebezeichnung"
                type="text"
                required
                className={fieldControl}
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.seriennummer}
              </span>
              <input
                name="seriennummer"
                type="text"
                className={fieldControl}
              />
            </label>
            <label className={fieldWrap}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.hersteller_optional}
              </span>
              <input
                name="hersteller_optional"
                type="text"
                className={fieldControl}
              />
            </label>
            <label className={`${fieldWrap} sm:col-span-2`}>
              <span className={fieldLabel}>
                {maintenanceFieldLabels.letzte_wartung_optional}
              </span>
              <input
                name="letzte_wartung_optional"
                type="text"
                placeholder="z. B. 09/2025"
                className={fieldControl}
              />
            </label>
          </div>

          {/* Datei-Upload */}
          <label className={fieldWrap}>
            <span className={fieldLabel}>
              {maintenanceFieldLabels.foto_typenschild_optional}
            </span>
            <input
              name="attachments"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf,.heic,.heif"
              multiple
              aria-describedby={maintenanceUploadHelpId}
              className="block w-full text-sm text-on-surface-variant
                file:mr-4 file:px-5 file:py-2.5 file:rounded-lg
                file:border-0 file:bg-primary file:text-on-primary
                file:font-bold file:text-sm file:cursor-pointer
                hover:file:bg-primary-container transition-colors"
            />
            <span
              id={maintenanceUploadHelpId}
              className="text-xs text-on-surface-variant"
            >
              {uploadHelpText}
            </span>
          </label>

          {/* Hinweise */}
          <label className={fieldWrap}>
            <span className={fieldLabel}>
              {maintenanceFieldLabels.hinweise_optional}
            </span>
            <textarea
              name="hinweise_optional"
              rows={4}
              placeholder="Auffälligkeiten, bekannte Störungen oder weitere Hinweise"
              className={`${fieldControl} resize-y min-h-[120px]`}
            />
          </label>

          <p className="text-sm text-on-surface-variant italic">
            Typenschild- oder Anlagenfotos helfen uns, die Wartung schneller und
            sauberer vorzubereiten.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button
              className={submitBtn}
              type="submit"
              disabled={maintenanceState.status === "submitting"}
            >
              {maintenanceState.status === "submitting"
                ? "Wird gesendet..."
                : "Wartung anfragen"}
            </button>
          </div>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            Mit dem Absenden stimmen Sie zu, dass wir Ihre Angaben zur Bearbeitung Ihrer Anfrage verwenden.
            Details finden Sie in unserer{" "}
            <a href="/datenschutz" className="font-semibold text-primary hover:text-accent">
              Datenschutzerklärung
            </a>
            .
          </p>

          {maintenanceState.message ? (
            <p
              className={`border rounded-lg px-4 py-3 text-sm ${feedbackClasses(maintenanceState.status)}`}
              role="status"
            >
              {maintenanceState.message}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}

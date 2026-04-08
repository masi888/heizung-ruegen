import { randomUUID } from "node:crypto";

import { company } from "@/lib/site-data";

export const runtime = "nodejs";

const maxAttachmentBytes = 8 * 1024 * 1024;

type Attachment = {
  filename: string;
  content: string;
};

function getRequiredEnv() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL || company.email;
  const from = process.env.INQUIRY_FROM_EMAIL;

  if (!apiKey || !from) {
    return null;
  }

  return { apiKey, to, from };
}

function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function normalizeAttachments(files: File[]) {
  const attachments: Attachment[] = [];

  for (const file of files) {
    if (!file.size) {
      continue;
    }

    if (file.size > maxAttachmentBytes) {
      throw new Error(`Die Datei ${file.name} ist größer als 8 MB.`);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name,
      content: buffer.toString("base64"),
    });
  }

  return attachments;
}

function buildProjectPayload(formData: FormData) {
  const fields = {
    name: textValue(formData, "name"),
    phone: textValue(formData, "phone"),
    email: textValue(formData, "email"),
    topic: textValue(formData, "topic"),
    message: textValue(formData, "message"),
  };

  if (!fields.name || !fields.phone || !fields.topic || !fields.message) {
    throw new Error("Bitte alle Pflichtfelder der Projektanfrage ausfüllen.");
  }

  return {
    subject: `Projektanfrage: ${fields.topic}`,
    text: [
      "Neue Projektanfrage über heizung-ruegen.de",
      "",
      `Name: ${fields.name}`,
      `Telefon: ${fields.phone}`,
      `E-Mail: ${fields.email || "nicht angegeben"}`,
      `Thema: ${fields.topic}`,
      "",
      "Nachricht:",
      fields.message,
    ].join("\n"),
    html: `
      <h2>Neue Projektanfrage</h2>
      <p><strong>Name:</strong> ${fields.name}</p>
      <p><strong>Telefon:</strong> ${fields.phone}</p>
      <p><strong>E-Mail:</strong> ${fields.email || "nicht angegeben"}</p>
      <p><strong>Thema:</strong> ${fields.topic}</p>
      <p><strong>Nachricht:</strong><br>${fields.message.replaceAll("\n", "<br>")}</p>
    `,
    replyTo: fields.email || undefined,
  };
}

function buildMaintenancePayload(formData: FormData) {
  const fields = {
    package: textValue(formData, "package"),
    name: textValue(formData, "name"),
    telefon: textValue(formData, "telefon"),
    email: textValue(formData, "email"),
    anlagenadresse: textValue(formData, "anlagenadresse"),
    rechnungsanschrift: textValue(formData, "rechnungsanschrift"),
    geraetetyp: textValue(formData, "geraetetyp"),
    geraetebezeichnung: textValue(formData, "geraetebezeichnung"),
    seriennummer: textValue(formData, "seriennummer"),
    hersteller: textValue(formData, "hersteller_optional"),
    letzteWartung: textValue(formData, "letzte_wartung_optional"),
    hinweise: textValue(formData, "hinweise_optional"),
  };

  if (!fields.package || !fields.name || !fields.telefon || !fields.anlagenadresse || !fields.geraetetyp || !fields.geraetebezeichnung) {
    throw new Error("Bitte alle Pflichtfelder der Wartungsanfrage ausfüllen.");
  }

  return {
    subject: `Wartungsanfrage: ${fields.package}`,
    text: [
      "Neue Wartungsanfrage über heizung-ruegen.de",
      "",
      `Paket: ${fields.package}`,
      `Name: ${fields.name}`,
      `Telefon: ${fields.telefon}`,
      `E-Mail: ${fields.email || "nicht angegeben"}`,
      `Adresse der Anlage: ${fields.anlagenadresse}`,
      `Rechnungsanschrift: ${fields.rechnungsanschrift || "wie Anlagenadresse"}`,
      `Gerätetyp: ${fields.geraetetyp}`,
      `Gerätebezeichnung: ${fields.geraetebezeichnung}`,
      `Seriennummer: ${fields.seriennummer || "nicht angegeben"}`,
      `Hersteller: ${fields.hersteller || "nicht angegeben"}`,
      `Letzte Wartung: ${fields.letzteWartung || "nicht angegeben"}`,
      "",
      "Hinweise:",
      fields.hinweise || "keine",
    ].join("\n"),
    html: `
      <h2>Neue Wartungsanfrage</h2>
      <p><strong>Paket:</strong> ${fields.package}</p>
      <p><strong>Name:</strong> ${fields.name}</p>
      <p><strong>Telefon:</strong> ${fields.telefon}</p>
      <p><strong>E-Mail:</strong> ${fields.email || "nicht angegeben"}</p>
      <p><strong>Adresse der Anlage:</strong> ${fields.anlagenadresse}</p>
      <p><strong>Rechnungsanschrift:</strong> ${fields.rechnungsanschrift || "wie Anlagenadresse"}</p>
      <p><strong>Gerätetyp:</strong> ${fields.geraetetyp}</p>
      <p><strong>Gerätebezeichnung:</strong> ${fields.geraetebezeichnung}</p>
      <p><strong>Seriennummer:</strong> ${fields.seriennummer || "nicht angegeben"}</p>
      <p><strong>Hersteller:</strong> ${fields.hersteller || "nicht angegeben"}</p>
      <p><strong>Letzte Wartung:</strong> ${fields.letzteWartung || "nicht angegeben"}</p>
      <p><strong>Hinweise:</strong><br>${(fields.hinweise || "keine").replaceAll("\n", "<br>")}</p>
    `,
    replyTo: fields.email || undefined,
  };
}

export async function POST(request: Request) {
  try {
    const env = getRequiredEnv();

    if (!env) {
      return Response.json(
        {
          message:
            "Der Versand ist noch nicht vollständig eingerichtet. Bitte RESEND_API_KEY und INQUIRY_FROM_EMAIL setzen.",
        },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const formType = textValue(formData, "formType");
    const files = formData.getAll("attachments").filter((entry): entry is File => entry instanceof File);

    const payload =
      formType === "maintenance" ? buildMaintenancePayload(formData) : buildProjectPayload(formData);
    const attachments = await normalizeAttachments(files);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        from: env.from,
        to: [env.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        reply_to: payload.replyTo,
        attachments,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Versanddienst meldet Fehler: ${errorText}`);
    }

    return Response.json({
      message: "Danke. Die Anfrage ist eingegangen und wird persönlich bearbeitet.",
    });
  } catch (error) {
    return Response.json(
      {
        message: error instanceof Error ? error.message : "Die Anfrage konnte nicht verarbeitet werden.",
      },
      { status: 400 },
    );
  }
}

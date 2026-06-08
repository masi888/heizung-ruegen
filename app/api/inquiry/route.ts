import nodemailer from "nodemailer";

import { company } from "@/lib/site-data";

export const runtime = "nodejs";

const maxAttachmentBytes = 8 * 1024 * 1024;

type Attachment = {
  filename: string;
  content: string;
  encoding: "base64";
};

function getMailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE != null
      ? process.env.SMTP_SECURE === "true"
      : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.INQUIRY_TO_EMAIL || company.email;
  const from = process.env.INQUIRY_FROM_EMAIL;

  if (
    !host ||
    !from ||
    !user ||
    !pass ||
    !Number.isFinite(port) ||
    port <= 0
  ) {
    return null;
  }

  return { host, port, secure, user, pass, to, from };
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
      encoding: "base64",
    });
  }

  return attachments;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function textToHtml(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br>");
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
      <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(fields.phone)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(fields.email || "nicht angegeben")}</p>
      <p><strong>Thema:</strong> ${escapeHtml(fields.topic)}</p>
      <p><strong>Nachricht:</strong><br>${textToHtml(fields.message)}</p>
    `,
    replyTo: fields.email || undefined,
  };
}

function buildMaintenancePayload(formData: FormData) {
  const fields = {
    package: textValue(formData, "package"),
    softenerPackage: textValue(formData, "package_enthaertung"),
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

  const selectedPackages = [fields.package, fields.softenerPackage].filter(Boolean);

  if (selectedPackages.length === 0 || !fields.name || !fields.telefon || !fields.anlagenadresse || !fields.geraetetyp || !fields.geraetebezeichnung) {
    throw new Error("Bitte mindestens ein Wartungspaket und alle Pflichtfelder ausfüllen.");
  }

  return {
    subject: `Wartungsanfrage: ${selectedPackages.join(" + ")}`,
    text: [
      "Neue Wartungsanfrage über heizung-ruegen.de",
      "",
      `Heizungspaket: ${fields.package || "nicht gewählt"}`,
      `Enthärtungspaket: ${fields.softenerPackage || "nicht gewählt"}`,
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
      <p><strong>Heizungspaket:</strong> ${escapeHtml(fields.package || "nicht gewählt")}</p>
      <p><strong>Enthärtungspaket:</strong> ${escapeHtml(fields.softenerPackage || "nicht gewählt")}</p>
      <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(fields.telefon)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(fields.email || "nicht angegeben")}</p>
      <p><strong>Adresse der Anlage:</strong> ${escapeHtml(fields.anlagenadresse)}</p>
      <p><strong>Rechnungsanschrift:</strong> ${escapeHtml(fields.rechnungsanschrift || "wie Anlagenadresse")}</p>
      <p><strong>Gerätetyp:</strong> ${escapeHtml(fields.geraetetyp)}</p>
      <p><strong>Gerätebezeichnung:</strong> ${escapeHtml(fields.geraetebezeichnung)}</p>
      <p><strong>Seriennummer:</strong> ${escapeHtml(fields.seriennummer || "nicht angegeben")}</p>
      <p><strong>Hersteller:</strong> ${escapeHtml(fields.hersteller || "nicht angegeben")}</p>
      <p><strong>Letzte Wartung:</strong> ${escapeHtml(fields.letzteWartung || "nicht angegeben")}</p>
      <p><strong>Hinweise:</strong><br>${textToHtml(fields.hinweise || "keine")}</p>
    `,
    replyTo: fields.email || undefined,
  };
}

export async function POST(request: Request) {
  try {
    const env = getMailConfig();

    if (!env) {
      return Response.json(
        {
          message:
            "Der Versand ist noch nicht vollständig eingerichtet. Bitte SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS und INQUIRY_FROM_EMAIL setzen.",
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

    const transporter = nodemailer.createTransport({
      host: env.host,
      port: env.port,
      secure: env.secure,
      auth: {
        user: env.user,
        pass: env.pass,
      },
    });

    await transporter.sendMail({
      from: env.from,
      to: env.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      replyTo: payload.replyTo,
      attachments,
    });

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

import nodemailer from "nodemailer";

import { validateInquiryFiles } from "@/lib/inquiry-limits.mjs";
import { buildInquiryHtml } from "@/lib/inquiry-mail.mjs";
import { company } from "@/lib/site-data";

export const runtime = "nodejs";

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
  const selectedFiles = files.filter((file) => file.size > 0);

  validateInquiryFiles(selectedFiles);

  for (const file of selectedFiles) {
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name,
      content: buffer.toString("base64"),
      encoding: "base64",
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
      "Neue Projektanfrage über heizung-rügen.de",
      "",
      `Name: ${fields.name}`,
      `Telefon: ${fields.phone}`,
      `E-Mail: ${fields.email || "nicht angegeben"}`,
      `Thema: ${fields.topic}`,
      "",
      "Nachricht:",
      fields.message,
    ].join("\n"),
    html: buildInquiryHtml({
      title: "Neue Projektanfrage",
      eyebrow: "Projektanfrage über heizung-rügen.de",
      summary:
        "Eine neue Anfrage ist eingegangen. Direkt auf diese E-Mail antworten, um den Kunden zu kontaktieren.",
      sections: [
        {
          title: "Kontakt",
          rows: [
            ["Name", fields.name],
            ["Telefon", fields.phone],
            ["E-Mail", fields.email || "nicht angegeben"],
          ],
        },
        {
          title: "Anfrage",
          rows: [
            ["Thema", fields.topic],
            ["Nachricht", fields.message],
          ],
        },
      ],
    }),
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
      "Neue Wartungsanfrage über heizung-rügen.de",
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
    html: buildInquiryHtml({
      title: "Neue Wartungsanfrage",
      eyebrow: "Wartungsanfrage über heizung-rügen.de",
      summary:
        "Alle Angaben zur Vorbereitung der Wartung sind unten gegliedert. Anhänge wie Typenschildfotos liegen dieser E-Mail bei.",
      sections: [
        {
          title: "Pakete",
          rows: [
            ["Heizungspaket", fields.package || "nicht gewählt"],
            ["Enthärtungspaket", fields.softenerPackage || "nicht gewählt"],
          ],
        },
        {
          title: "Kontakt",
          rows: [
            ["Name", fields.name],
            ["Telefon", fields.telefon],
            ["E-Mail", fields.email || "nicht angegeben"],
          ],
        },
        {
          title: "Anlage",
          rows: [
            ["Adresse der Anlage", fields.anlagenadresse],
            [
              "Rechnungsanschrift",
              fields.rechnungsanschrift || "wie Anlagenadresse",
            ],
            ["Gerätetyp", fields.geraetetyp],
            ["Gerätebezeichnung", fields.geraetebezeichnung],
            ["Seriennummer", fields.seriennummer || "nicht angegeben"],
            ["Hersteller", fields.hersteller || "nicht angegeben"],
            ["Letzte Wartung", fields.letzteWartung || "nicht angegeben"],
          ],
        },
        {
          title: "Hinweise",
          rows: [["Zusätzliche Hinweise", fields.hinweise || "keine"]],
        },
      ],
    }),
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

    if (textValue(formData, "website")) {
      return Response.json({ message: "Danke. Die Anfrage ist eingegangen und wird persönlich bearbeitet." });
    }

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

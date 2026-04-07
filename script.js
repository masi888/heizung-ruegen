const recipient = "bertig.shk@web.de";

const forms = {
  general: document.querySelector("#general-form"),
  maintenance: document.querySelector("#maintenance-form"),
};

const tabButtons = document.querySelectorAll(".tab-button");
const formPanels = document.querySelectorAll(".request-form");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;

    tabButtons.forEach((candidate) => {
      const isActive = candidate === button;
      candidate.classList.toggle("is-active", isActive);
      candidate.setAttribute("aria-selected", String(isActive));
    });

    formPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === target);
    });
  });
});

function setPreview(id, text, success = false) {
  const preview = document.querySelector(`#${id}`);
  if (!preview) {
    return;
  }

  preview.textContent = text;
  preview.classList.toggle("is-success", success);
}

function openMail(subject, body) {
  const link =
    `mailto:${recipient}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
  window.location.href = link;
}

function buildGeneralMessage(formData) {
  const name = formData.get("name")?.trim() || "";
  const phone = formData.get("phone")?.trim() || "";
  const email = formData.get("email")?.trim() || "nicht angegeben";
  const topic = formData.get("topic")?.trim() || "";
  const message = formData.get("message")?.trim() || "";

  return {
    subject: `Webanfrage: ${topic}`,
    body: [
      "Allgemeine Anfrage ueber heizung-ruegen.de",
      "",
      `Name: ${name}`,
      `Telefon: ${phone}`,
      `E-Mail: ${email}`,
      `Anliegen: ${topic}`,
      "",
      "Nachricht:",
      message,
    ].join("\n"),
  };
}

function buildMaintenanceMessage(formData) {
  const billingAddress = formData.get("billing_address")?.trim() || "wie Anlagenadresse";
  const notes = formData.get("maintenance_notes")?.trim() || "keine";

  return {
    subject: `Wartungsanfrage: ${formData.get("package")}`,
    body: [
      "Wartungsanfrage ueber heizung-ruegen.de",
      "",
      `Paket: ${formData.get("package")}`,
      `Name: ${formData.get("customer_name")?.trim() || ""}`,
      `Telefon: ${formData.get("customer_phone")?.trim() || ""}`,
      `E-Mail: ${formData.get("customer_email")?.trim() || "nicht angegeben"}`,
      `Adresse der Anlage: ${formData.get("site_address")?.trim() || ""}`,
      `Rechnungsanschrift: ${billingAddress}`,
      `Geraetetyp: ${formData.get("device_type")?.trim() || ""}`,
      `Geraetebezeichnung: ${formData.get("device_name")?.trim() || ""}`,
      `Seriennummer: ${formData.get("serial_number")?.trim() || "nicht angegeben"}`,
      "",
      "Zusaetzliche Hinweise:",
      notes,
    ].join("\n"),
  };
}

forms.general?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(forms.general);
  const message = buildGeneralMessage(data);
  setPreview("general-preview", message.body, true);
  openMail(message.subject, message.body);
});

forms.maintenance?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(forms.maintenance);
  const message = buildMaintenanceMessage(data);
  setPreview("maintenance-preview", message.body, true);
  openMail(message.subject, message.body);
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const previewId = button.dataset.preview;
    const preview = previewId ? document.querySelector(`#${previewId}`) : null;

    if (!preview || !preview.textContent.trim()) {
      setPreview(previewId, "Bitte zuerst das Formular ausfuellen und vorbereiten.", false);
      return;
    }

    try {
      await navigator.clipboard.writeText(preview.textContent);
      setPreview(previewId, `${preview.textContent}\n\nText wurde in die Zwischenablage kopiert.`, true);
    } catch {
      setPreview(previewId, `${preview.textContent}\n\nKopieren im Browser nicht verfuegbar.`, false);
    }
  });
});

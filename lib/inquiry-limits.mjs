export const inquiryUploadLimits = {
  maxFiles: 4,
  maxFileBytes: 4 * 1024 * 1024,
  maxTotalBytes: 4 * 1024 * 1024,
  maxImageInputBytes: 12 * 1024 * 1024,
  maxCompressedImageBytes: 900 * 1024,
  imageMaxDimension: 1600,
  imageQuality: 0.82,
  acceptedLabel: "JPG, PNG, WebP, HEIC/HEIF oder PDF",
};

const allowedTypes = [
  { extensions: [".jpg", ".jpeg"], mimeTypes: ["image/jpeg"] },
  { extensions: [".png"], mimeTypes: ["image/png"] },
  { extensions: [".webp"], mimeTypes: ["image/webp"] },
  { extensions: [".heic"], mimeTypes: ["image/heic", "image/heif"] },
  { extensions: [".heif"], mimeTypes: ["image/heif", "image/heic"] },
  { extensions: [".pdf"], mimeTypes: ["application/pdf"] },
];

export function formatBytes(bytes) {
  const mb = bytes / (1024 * 1024);
  return `${Number.isInteger(mb) ? mb : mb.toFixed(1).replace(".", ",")} MB`;
}

export function getInquiryFileKind(file) {
  const name = String(file.name || "").toLowerCase();
  const type = String(file.type || "").toLowerCase();

  const match = allowedTypes.find(({ extensions, mimeTypes }) => {
    const extensionMatches = extensions.some((extension) => name.endsWith(extension));
    return extensionMatches && (!type || mimeTypes.includes(type));
  });

  if (!match) {
    return null;
  }

  return match.mimeTypes.includes("application/pdf") ? "pdf" : "image";
}

export function validateInquirySelection(files) {
  if (files.length > inquiryUploadLimits.maxFiles) {
    throw new Error(
      `Maximal ${inquiryUploadLimits.maxFiles} Dateien hochladen.`,
    );
  }

  for (const file of files) {
    const kind = getInquiryFileKind(file);

    if (!kind) {
      throw new Error(
        `Nicht unterstützter Dateityp bei ${file.name}. Erlaubt sind ${inquiryUploadLimits.acceptedLabel}.`,
      );
    }

    if (kind === "pdf" && file.size > inquiryUploadLimits.maxFileBytes) {
      throw new Error(
        `PDFs dürfen höchstens ${formatBytes(inquiryUploadLimits.maxFileBytes)} groß sein.`,
      );
    }

    if (kind === "image" && file.size > inquiryUploadLimits.maxImageInputBytes) {
      throw new Error(
        `Bilder dürfen vor der automatischen Verkleinerung höchstens ${formatBytes(inquiryUploadLimits.maxImageInputBytes)} groß sein.`,
      );
    }
  }
}

export function validateInquiryFiles(files) {
  if (files.length > inquiryUploadLimits.maxFiles) {
    throw new Error(
      `Maximal ${inquiryUploadLimits.maxFiles} Dateien hochladen.`,
    );
  }

  let totalBytes = 0;

  for (const file of files) {
    const kind = getInquiryFileKind(file);
    totalBytes += file.size;

    if (!kind) {
      throw new Error(
        `Nicht unterstützter Dateityp bei ${file.name}. Erlaubt sind ${inquiryUploadLimits.acceptedLabel}.`,
      );
    }

    if (file.size > inquiryUploadLimits.maxFileBytes) {
      const message =
        kind === "pdf"
          ? `PDFs dürfen höchstens ${formatBytes(inquiryUploadLimits.maxFileBytes)} groß sein.`
          : `Die Datei ${file.name} ist nach der Bildoptimierung größer als ${formatBytes(inquiryUploadLimits.maxFileBytes)}.`;
      throw new Error(message);
    }
  }

  if (totalBytes > inquiryUploadLimits.maxTotalBytes) {
    throw new Error(
      `Alle Dateien zusammen dürfen insgesamt höchstens ${formatBytes(inquiryUploadLimits.maxTotalBytes)} groß sein.`,
    );
  }
}

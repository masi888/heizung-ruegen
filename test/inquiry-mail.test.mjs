import assert from "node:assert/strict";
import { test } from "node:test";

import {
  formatBytes,
  inquiryUploadLimits,
  validateInquirySelection,
  validateInquiryFiles,
} from "../lib/inquiry-limits.mjs";
import { buildInquiryHtml } from "../lib/inquiry-mail.mjs";

function file(name, size, type = "image/png") {
  return { name, size, type };
}

test("validateInquiryFiles accepts several normal customer images", () => {
  assert.doesNotThrow(() =>
    validateInquiryFiles([
      file("typenschild.png", 1024 * 1024),
      file("anlage.jpg", 1024 * 1024, "image/jpeg"),
      file("raum.webp", 512 * 1024, "image/webp"),
    ]),
  );
});

test("validateInquirySelection accepts large phone images before compression", () => {
  assert.doesNotThrow(() =>
    validateInquirySelection([
      file("iphone-foto.jpg", 8 * 1024 * 1024, "image/jpeg"),
      file("iphone-foto.heic", 6 * 1024 * 1024, "image/heic"),
    ]),
  );
});

test("validateInquirySelection rejects large PDFs because they are not compressed", () => {
  assert.throws(
    () =>
      validateInquirySelection([
        file("wartungsunterlagen.pdf", 5 * 1024 * 1024, "application/pdf"),
      ]),
    /PDFs dürfen höchstens 4 MB/,
  );
});

test("validateInquiryFiles rejects too many files", () => {
  const files = Array.from({ length: inquiryUploadLimits.maxFiles + 1 }, (_, i) =>
    file(`bild-${i}.png`, 1024),
  );

  assert.throws(
    () => validateInquiryFiles(files),
    /Maximal 4 Dateien/,
  );
});

test("validateInquiryFiles rejects oversized total uploads", () => {
  assert.throws(
    () =>
      validateInquiryFiles([
        file("a.png", 2 * 1024 * 1024),
        file("b.png", 2 * 1024 * 1024),
        file("c.png", 512 * 1024),
      ]),
    /insgesamt höchstens 4 MB/,
  );
});

test("validateInquiryFiles rejects oversized single files", () => {
  assert.throws(
    () => validateInquiryFiles([file("grosses-foto.jpg", 5 * 1024 * 1024, "image/jpeg")]),
    /nach der Bildoptimierung größer als 4 MB/,
  );
});

test("validateInquiryFiles rejects unsupported file types", () => {
  assert.throws(
    () => validateInquiryFiles([file("script.svg", 1024, "image/svg+xml")]),
    /Nicht unterstützter Dateityp/,
  );
});

test("buildInquiryHtml renders branded, escaped sections", () => {
  const html = buildInquiryHtml({
    title: "Neue Projektanfrage",
    eyebrow: "heizung-rügen.de",
    summary: "Direkt auf diese E-Mail antworten.",
    sections: [
      {
        title: "Kontakt",
        rows: [
          ["Name", "<Max Mustermann>"],
          ["Telefon", "+49 160 123456"],
        ],
      },
    ],
  });

  assert.match(html, /Bertig Sanitär- und Heizungstechnik/);
  assert.match(html, /heizung-rügen\.de/);
  assert.match(html, /Kontakt/);
  assert.match(html, /&lt;Max Mustermann&gt;/);
  assert.doesNotMatch(html, /<Max Mustermann>/);
});

test("formatBytes keeps upload copy human-readable", () => {
  assert.equal(formatBytes(4 * 1024 * 1024), "4 MB");
});

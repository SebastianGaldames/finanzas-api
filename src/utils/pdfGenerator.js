const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");

const PRIMARY_COLOR = "#2E86C1";
const SECONDARY_COLOR = "#F2F3F4";
const TEXT_COLOR = "#212F3D";
const INGRESO_COLOR = "#27AE60";
const EGRESO_COLOR = "#C0392B";

module.exports = {
  generarPDF: (data) => {
    const doc = new PDFDocument({ margin: 60 });
    const stream = new PassThrough();
    doc.pipe(stream);

    // Portada
    doc
      .rect(0, 0, doc.page.width, 120)
      .fill(PRIMARY_COLOR)
      .fillColor("white")
      .fontSize(28)
      .text("Reporte de Finanzas", 0, 45, {
        align: "center",
        width: doc.page.width,
      })
      .moveDown(2);

    doc.fillColor(TEXT_COLOR);
    doc
      .fontSize(14)
      .text(`Fecha de generación: ${new Date().toLocaleString()}`, {
        align: "right",
      });
    doc.moveDown(2);

    // INGRESOS
    doc
      .fontSize(18)
      .fillColor(INGRESO_COLOR)
      .text("Ingresos", {
        underline: true,
        continued: false,
        align: "center",
      });
    doc.moveDown(0.5);

    if (data.ingresos.length === 0) {
      doc
        .fontSize(12)
        .fillColor(TEXT_COLOR)
        .text("No hay ingresos registrados.");
    } else {
      drawTable(doc, data.ingresos, "ingreso");
      doc.moveDown(0.5);
      const totalIngresos = data.ingresos.reduce(
        (acc, i) => acc + (i.monto || 0),
        0
      );
      doc
        .fontSize(13)
        .fillColor(INGRESO_COLOR)
        .text(`Total ingresos: $${totalIngresos.toFixed(2)}`);
    }
    doc.moveDown(2);

    // EGRESOS
    doc
      .fontSize(18)
      .fillColor(EGRESO_COLOR)
      .text("Egresos", {
        underline: true,
        continued: false,
        align: "center",
        width: doc.page.width,
      });
    doc.moveDown(0.5);

    if (data.egresos.length === 0) {
      doc
        .fontSize(12)
        .fillColor(TEXT_COLOR)
        .text("No hay egresos registrados.");
    } else {
      drawTable(doc, data.egresos, "egreso");
      doc.moveDown(0.5);
      const totalEgresos = data.egresos.reduce(
        (acc, e) => acc + (e.monto || 0),
        0
      );
      doc
        .fontSize(13)
        .fillColor(EGRESO_COLOR)
        .text(`Total egresos: $${totalEgresos.toFixed(2)}`);
    }
    doc.moveDown(2);

    // BALANCE FINAL
    const totalIngresos = data.ingresos.reduce(
      (acc, i) => acc + (i.monto || 0),
      0
    );
    const totalEgresos = data.egresos.reduce(
      (acc, e) => acc + (e.monto || 0),
      0
    );
    const balance = totalIngresos - totalEgresos;
    doc
      .fontSize(16)
      .fillColor(balance >= 0 ? INGRESO_COLOR : EGRESO_COLOR)
      .text(`Balance final: $${balance.toFixed(2)}`, { align: "right" });

    doc.end();
    return streamToBuffer(stream, doc);
  },
};

function drawTable(doc, items, type) {
  const startX = doc.page.margins.left;
  let y = doc.y;
  const colWidths = [180, 80, 100, 120];
  const headers = ["Descripción", "Monto", "Fecha", "Categoría"];
  const headerBg = type === "ingreso" ? "#D4EFDF" : "#F9EBEA";
  const textColor = TEXT_COLOR;

  doc.save();
  doc
    .rect(startX, y, colWidths.reduce((a, b) => a + b), 22)
    .fill(headerBg);
  doc.fillColor(textColor).fontSize(12).font("Helvetica-Bold");
  let x = startX;
  headers.forEach((h, i) => {
    doc.text(h, x + 4, y + 6, { width: colWidths[i] - 8, align: "left" });
    x += colWidths[i];
  });
  doc.restore();
  y += 22;

  items.forEach((item, idx) => {
    x = startX;
    doc.fillColor(textColor).font("Helvetica").fontSize(11);
    doc
      .rect(startX, y, colWidths.reduce((a, b) => a + b), 20)
      .fill(idx % 2 === 0 ? SECONDARY_COLOR : "white");
    doc.fillColor(textColor);
    doc.text(item.descripcion || "", x + 4, y + 5, {
      width: colWidths[0] - 8,
    });
    x += colWidths[0];
    doc.text(`$${item.monto?.toFixed(2) || "0.00"}`, x + 4, y + 5, {
      width: colWidths[1] - 8,
    });
    x += colWidths[1];
    doc.text(
      item.fecha ? new Date(item.fecha).toLocaleDateString() : "",
      x + 4,
      y + 5,
      { width: colWidths[2] - 8 }
    );
    x += colWidths[2];
    doc.text(item.categoria?.nombre || "", x + 4, y + 5, {
      width: colWidths[3] - 8,
    });
    y += 20;
  });
  doc.y = y;
}

function streamToBuffer(stream, doc) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
    doc.on("error", reject);
  });
}

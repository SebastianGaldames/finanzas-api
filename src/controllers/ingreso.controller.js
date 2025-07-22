// Controlador para ingresos
// Aquí se define la lógica de negocio relacionada con los ingresos.

const Ingreso = require("../models/ingreso.model");
const reporteService = require("../services/reporte.service");

// Obtiene todos los ingresos registrados
exports.getIngresos = (req, res) => {
  res.send("Obtener ingresos");
};

// Crea un nuevo ingreso
exports.createIngreso = async (req, res) => {
  try {
    const { descripcion, monto, fecha, categoria } = req.body;
    const ingreso = new Ingreso({ descripcion, monto, fecha, categoria });
    await ingreso.save();
    res.status(201).json(ingreso);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error al crear ingreso", details: err.message });
  }
};

// Calcula el balance mensual de ingresos
exports.getBalanceMensual = async (req, res) => {
  try {
    const { year, month } = req.query;
    const match = {};
    if (year) match["$expr"] = { $eq: [{ $year: "$fecha" }, parseInt(year)] };
    if (month)
      match["$expr"] = {
        $and: [
          match["$expr"] || {},
          { $eq: [{ $month: "$fecha" }, parseInt(month)] },
        ],
      };
    const ingresos = await Ingreso.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$monto" } } },
    ]);
    res.json({ total: ingresos[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: "Error al calcular balance mensual" });
  }
};

// Calcula el balance anual de ingresos
exports.getBalanceAnual = async (req, res) => {
  try {
    const { year } = req.query;
    const match = year
      ? { $expr: { $eq: [{ $year: "$fecha" }, parseInt(year)] } }
      : {};
    const ingresos = await Ingreso.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$monto" } } },
    ]);
    res.json({ total: ingresos[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: "Error al calcular balance anual" });
  }
};

// Genera un reporte de ingresos y egresos en formato JSON o PDF
exports.generarReporte = async (req, res) => {
  try {
    const { year, month, format } = req.query;
    const result = await reporteService.generarReporte({ year, month, format });
    if (format === "pdf") {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="reporte.pdf"'
      );
      // Esperar a que la promesa del buffer se resuelva
      return res.send(await result);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al generar reporte" });
  }
};

const Ingreso = require("../models/ingreso.model");
const Egreso = require("../models/egreso.model");
const pdfGenerator = require("../utils/pdfGenerator");

module.exports = {
  async generarReporte({ year, month, format = "json" }) {
    // Filtros por año y mes
    const match = {};
    if (year) match["$expr"] = { $eq: [{ $year: "$fecha" }, parseInt(year)] };
    if (month)
      match["$expr"] = {
        $and: [
          match["$expr"] || {},
          { $eq: [{ $month: "$fecha" }, parseInt(month)] },
        ],
      };

    const ingresos = await Ingreso.find(match).populate("categoria").lean();
    const egresos = await Egreso.find(match).populate("categoria").lean();

    const data = { ingresos, egresos };
    if (format === "pdf") {
      return pdfGenerator.generarPDF(data);
    }
    return data;
  },
};

// Controlador para egresos
// Aquí se define la lógica de negocio relacionada con los egresos.

const Egreso = require("../models/egreso.model");

// Obtiene todos los egresos registrados
exports.getEgresos = (req, res) => {
  res.send("Obtener egresos");
};

// Crea un nuevo egreso
exports.createEgreso = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la petición
    const { descripcion, monto, fecha, categoria } = req.body;
    // Crea una nueva instancia del modelo Egreso
    const egreso = new Egreso({ descripcion, monto, fecha, categoria });
    // Guarda el egreso en la base de datos
    await egreso.save();
    // Devuelve el egreso creado
    res.status(201).json(egreso);
  } catch (err) {
    // Manejo de errores
    res
      .status(400)
      .json({ error: "Error al crear egreso", details: err.message });
  }
};

// Calcula el balance mensual de egresos
exports.getBalanceMensual = async (req, res) => {
  try {
    const { year, month } = req.query;
    const match = {};
    // Filtros por año y mes
    if (year) match["$expr"] = { $eq: [{ $year: "$fecha" }, parseInt(year)] };
    if (month)
      match["$expr"] = {
        $and: [
          match["$expr"] || {},
          { $eq: [{ $month: "$fecha" }, parseInt(month)] },
        ],
      };
    // Agrupa y suma los egresos
    const egresos = await Egreso.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$monto" } } },
    ]);
    res.json({ total: egresos[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: "Error al calcular balance mensual" });
  }
};

// Calcula el balance anual de egresos
exports.getBalanceAnual = async (req, res) => {
  try {
    const { year } = req.query;
    const match = year
      ? { $expr: { $eq: [{ $year: "$fecha" }, parseInt(year)] } }
      : {};
    // Agrupa y suma los egresos del año
    const egresos = await Egreso.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$monto" } } },
    ]);
    res.json({ total: egresos[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: "Error al calcular balance anual" });
  }
};

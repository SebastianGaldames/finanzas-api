const mongoose = require("mongoose");

const egresoSchema = new mongoose.Schema({
  descripcion: String,
  monto: Number,
  fecha: { type: Date, default: Date.now },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
});

module.exports = mongoose.model("Egreso", egresoSchema);

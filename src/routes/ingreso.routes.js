const express = require("express");
const router = express.Router();
const ingresoController = require("../controllers/ingreso.controller");

router.get("/", ingresoController.getIngresos);
router.get("/balance/mensual", ingresoController.getBalanceMensual);
router.get("/balance/anual", ingresoController.getBalanceAnual);
router.get("/reporte", ingresoController.generarReporte);
router.post("/", ingresoController.createIngreso);

module.exports = router;

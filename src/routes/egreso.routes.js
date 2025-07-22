const express = require("express");
const router = express.Router();
const egresoController = require("../controllers/egreso.controller");

router.get("/", egresoController.getEgresos);
router.get("/balance/mensual", egresoController.getBalanceMensual);
router.get("/balance/anual", egresoController.getBalanceAnual);
router.post("/", egresoController.createEgreso);

module.exports = router;

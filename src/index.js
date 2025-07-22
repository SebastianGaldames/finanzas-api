require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const ingresoRoutes = require('./routes/ingreso.routes');
const egresoRoutes = require('./routes/egreso.routes');
const categoriaRoutes = require('./routes/categoria.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/ingresos', ingresoRoutes);
app.use('/api/egresos', egresoRoutes);
app.use('/api/categorias', categoriaRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
});

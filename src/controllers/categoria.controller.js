// Controlador para categorías
// Aquí se define la lógica de negocio relacionada con las categorías.

const Categoria = require("../models/categoria.model");

// Obtiene todas las categorías registradas
exports.getCategorias = (req, res) => {
  res.send("Obtener categorías");
};

// Crea una nueva categoría
exports.createCategoria = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la petición
    const { nombre, descripcion } = req.body;
    // Crea una nueva instancia del modelo Categoria
    const categoria = new Categoria({ nombre, descripcion });
    // Guarda la categoría en la base de datos
    await categoria.save();
    // Devuelve la categoría creada
    res.status(201).json(categoria);
  } catch (err) {
    // Manejo de errores
    res
      .status(400)
      .json({ error: "Error al crear categoría", details: err.message });
  }
};

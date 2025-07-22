# finanzas-api

API de finanzas personales con Node.js, Express y MongoDB.

## Estructura del proyecto

- `src/config/`: Configuración de la base de datos.
- `src/controllers/`: Lógica de negocio y endpoints de la API.
- `src/models/`: Modelos de datos de Mongoose.
- `src/routes/`: Definición de rutas y endpoints.
- `src/services/`: Servicios auxiliares (ej: generación de reportes).
- `src/utils/`: Utilidades generales (ej: generación de PDF).
- `src/index.js`: Punto de entrada de la aplicación.

## Endpoints principales

- **Categorías**
  - `POST /api/categorias` — Crear categoría
  - `GET /api/categorias` — Listar categorías
- **Ingresos**
  - `POST /api/ingresos` — Crear ingreso
  - `GET /api/ingresos` — Listar ingresos
  - `GET /api/ingresos/balance/mensual` — Balance mensual
  - `GET /api/ingresos/balance/anual` — Balance anual
  - `GET /api/ingresos/reporte` — Reporte (JSON o PDF)
- **Egresos**
  - `POST /api/egresos` — Crear egreso
  - `GET /api/egresos` — Listar egresos
  - `GET /api/egresos/balance/mensual` — Balance mensual
  - `GET /api/egresos/balance/anual` — Balance anual

## Uso de comentarios en el código

> Todos los archivos clave están comentados para facilitar el mantenimiento y la comprensión del código. Los comentarios explican la finalidad de cada función, los parámetros esperados y el flujo general de la lógica. Por ejemplo:

- **Controladores:**
  - Se comenta cada función exportada, indicando qué hace y qué espera recibir.
  - Ejemplo:
    ```js
    // Crea un nuevo ingreso
    exports.createIngreso = async (req, res) => { ... }
    ```
- **Modelos:**
  - Se documentan los campos principales y relaciones entre modelos.
  - Ejemplo:
    ```js
    // Modelo de ingreso
    // - descripcion: String
    // - monto: Number
    // - fecha: Date
    // - categoria: referencia a Categoria
    ```
- **Rutas:**
  - Se comenta cada endpoint, indicando el método y la funcionalidad.
  - Ejemplo:
    ```js
    // POST /api/ingresos — Crea un nuevo ingreso
    router.post("/", ingresoController.createIngreso);
    ```
- **Servicios y utilidades:**
  - Se explica la finalidad de cada función y los parámetros que recibe.

## Buenas prácticas recomendadas

- Comentar siempre el propósito de cada archivo y función.
- Explicar los parámetros y valores de retorno.
- Usar comentarios para aclarar lógica compleja o validaciones importantes.
- Mantener los comentarios actualizados si se modifica la lógica.

## Ejecución y pruebas

- `npm run dev` — Inicia el servidor en modo desarrollo con nodemon
- `npm start` — Inicia el servidor en modo producción
- `docker-compose up --build` — Levanta la API y MongoDB en contenedores

## Variables de entorno

- `MONGO_URI` — URI de conexión a MongoDB
- `PORT` — Puerto de la API

---

> **Recuerda:** Comentar el código no es solo para otros, ¡también para tu yo del futuro! Un buen comentario puede ahorrar mucho tiempo de debugging y facilita el trabajo en equipo.

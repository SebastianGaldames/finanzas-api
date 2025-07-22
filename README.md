# Finanzas API

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión de finanzas personales. Permite registrar ingresos, egresos, organizar categorías, consultar balances y generar reportes en PDF y JSON.

## Descripción del Proyecto

Este proyecto proporciona una API robusta para:

- Registrar ingresos y egresos.
- Organizar movimientos por categorías.
- Consultar balances mensuales y anuales.
- Generar reportes en PDF y JSON.

La base de datos utilizada es **MongoDB**, accedida mediante **Mongoose**.

## Tecnologías principales

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [pdfkit](https://pdfkit.org/) para generación de PDF
- Docker y docker-compose

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd finanzas-api
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env` (ejemplo):
   ```env
   MONGO_URI=mongodb://localhost:27017/finanzas
   PORT=3000
   ```

## Pruebas con Postman

Puedes probar la API usando Postman. Ejemplo de peticiones:

- **Registrar categoría:**
  - POST `/api/categorias`
  - Body:
    ```json
    {
      "nombre": "Alimentación",
      "descripcion": "Gastos de comida"
    }
    ```
- **Registrar ingreso:**
  - POST `/api/ingresos`
  - Body:
    ```json
    {
      "descripcion": "Sueldo",
      "monto": 1000,
      "fecha": "2025-07-01",
      "categoria": "<id_categoria>"
    }
    ```
- **Registrar egreso:**
  - POST `/api/egresos`
  - Body:
    ```json
    {
      "descripcion": "Supermercado",
      "monto": 200,
      "fecha": "2025-07-02",
      "categoria": "<id_categoria>"
    }
    ```
- **Generar reporte PDF:**
  - GET `/api/ingresos/reporte?year=2025&month=7&format=pdf`

## Uso con Docker

Puedes levantar todo el entorno (API y base de datos MongoDB) fácilmente usando Docker y docker-compose.

### Levantar los servicios

```bash
docker-compose up --build
```

Esto iniciará dos servicios:

- **mongo:** Base de datos MongoDB, expuesta en el puerto 27017.
- **api:** La API de Express, expuesta en el puerto 3000.

La API estará disponible en `http://localhost:3000` y la base de datos en `mongodb://localhost:27017`.

Para detener los servicios:

```bash
docker-compose down
```

## Uso manual (sin Docker)

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

La API estará disponible en `http://localhost:3000` (o el puerto configurado).

## Endpoints principales

- `/api/categorias` — Gestión de categorías (GET, POST)
- `/api/ingresos` — Gestión de ingresos (GET, POST)
- `/api/egresos` — Gestión de egresos (GET, POST)
- `/api/ingresos/balance/mensual` — Balance mensual de ingresos
- `/api/ingresos/balance/anual` — Balance anual de ingresos
- `/api/egresos/balance/mensual` — Balance mensual de egresos
- `/api/egresos/balance/anual` — Balance anual de egresos
- `/api/ingresos/reporte` — Reporte de ingresos y egresos (JSON o PDF)

## Despliegue

Puedes desplegar la aplicación en cualquier servidor Node.js. Asegúrate de tener configuradas las variables de entorno y acceso a una instancia de MongoDB.

## Licencia

MIT.

---

**Autor:** [Tu Nombre]

Desarrollado con ❤️ usando Node.js, Express y MongoDB.

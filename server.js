import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConexion from "./src/database.js";
import Producto from "./src/models/Producto.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url"; // Necesario para __dirname en ES Modules

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Inicializar la app de Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Conectar a MongoDB Atlas
dbConexion();

// Servir archivos estáticos de Vite (Vue 3) desde "dist"
app.use(express.static(path.join(__dirname, "dist")));

// Ruta para obtener el frontend (si no encuentra una API)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Ruta para agregar un producto con imagen
app.post("/productos", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    const imagenBase64 = req.file.buffer.toString("base64");

    const nuevoProducto = new Producto({
      nombre,
      precio,
      stock,
      imagen: `data:image/jpeg;base64,${imagenBase64}`,
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el producto" });
  }
});

// Ruta para obtener todos los productos
app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Iniciar el servidor en el puerto de Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

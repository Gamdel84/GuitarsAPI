import express from "express";
import { join, __dirname } from "./utils/index.js";
import guitarRoutes from "./routes/guitar.route.js";
import authRouter from './routes/auth.routes.js';
import { envs } from './config/envs.js';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// servir archivos estáticos
app.use(express.static(join(__dirname, "public")));

// rutas
app.use("/api/guitars", guitarRoutes);
app.use("/auth", authRouter);

// ruta raíz que devuelve el frontend
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

// ⚠️ No usar app.listen() en Vercel
export default app;




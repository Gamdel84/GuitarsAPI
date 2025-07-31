import express from "express";
import path from "path";
import { join, __dirname } from "./utils/index.js";
import guitarRoutes from "./routes/guitar.route.js";
import authRouter from "./routes/auth.routes.js";
import { envs } from "./config/envs.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(join(__dirname, "public")));

// Rutas
app.use("/api/guitars", guitarRoutes);
app.use("/auth", authRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

export default app;





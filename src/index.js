import express from "express";
import { join, __dirname } from "./utils/index.js";
import guitarRoutes from "./routes/guitar.route.js";
import authRouter from './routes/auth.routes.js';
import { envs } from './config/envs.js';

const app = express();

// settings
const PORT = envs.port;

// middlewares
app.use(express.json());
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({ title: "Stock Guitars" });
});
app.use("/api/guitars", guitarRoutes);
app.use("/auth", authRouter);

// listeners
app.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}`);
});



import { join, __dirname } from "./utils/index.js";
import guitarRoutes from "./routes/guitar.route.js";
import authRouter from "./routes/auth.routes.js";
import express from "express";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use("/api/guitars", guitarRoutes);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

export default (req, res) => {
  app(req, res);
};





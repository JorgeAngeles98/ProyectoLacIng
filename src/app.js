import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

import salonesRoutes from "./routes/salon.routes.js";

import cursosRoutes from "./routes/curso.routes.js";

import profesoresRoutes from "./routes/profesor.routes.js";
import alumnosRoutes from "./routes/alumno.routes.js";

import pcRoutes from "./routes/pc.routes.js";

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", salonesRoutes);
app.use("/api", cursosRoutes);
app.use("/api", profesoresRoutes);
app.use("/api", alumnosRoutes)
app.use("/api", pcRoutes)


export default app;
import http from "http";
import { Server } from "socket.io";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import prisma from "./connection/prisma";

//Routes
import { useRouter } from "./routes";

const app = express();
const api_url: string = <string>process.env.API;
const cli_origin: string = <string>process.env.CLIURL;

//Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Socket.io
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Aquí puedes agregar la lógica para manejar el chat en tiempo real
  socket.on("chat message", (message) => {
    // Broadcast del mensaje a todos los usuarios
    io.emit("chat message", message);
  });

  // Puedes agregar más eventos para manejar datos en tiempo real desde PostgreSQL
});

// Configurar CORS
const corsOptions = {
  origin: cli_origin, // Cambiar a la URL permitida para las solicitudes
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};
app.use(cors(corsOptions));

//Routes
try {
  useRouter(app, api_url);
} catch (error) {
  console.log(error);
} finally {
  prisma.instance.$disconnect();
}

export default app;

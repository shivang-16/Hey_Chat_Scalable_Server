import express, { urlencoded } from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import UserRouter from "./routes/userRouter.js";
import { Server } from "socket.io";

const app = express();

config({
  path: "./.env",
});

export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "*"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/user", UserRouter);

app.get("/", (req, res) => {
  res.send("Hello this is working");
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.emit("welcome", "Welocme to the server");
  socket.on("text", (text) => {
    console.log(text);
    io.emit("received_text", text);
  });
});

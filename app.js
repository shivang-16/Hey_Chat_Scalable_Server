import express, { urlencoded } from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import UserRouter from "./routes/userRouter.js";

const app = express();

export const server = createServer(app);

config({
  path: "./.env",
});

console.log();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", UserRouter);

app.get("/", (req, res) => {
  res.send("Hello this is working");
});

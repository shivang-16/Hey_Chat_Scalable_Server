import express, { urlencoded } from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

const app = express();

export const server = createServer(app);

app.use(config({
    path: './.env'
}))

app.use(cors());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello this is working");
});

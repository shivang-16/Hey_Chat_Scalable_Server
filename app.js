import express, { urlencoded } from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import UserRouter from "./routes/userRouter.js";
import ChatRouter from "./routes/chatRoutes.js";
import GroupRouter from './routes/groupRoutes.js'
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
app.use("/api/chat", ChatRouter);
app.use("/api/group", GroupRouter)

app.get("/", (req, res) => {
  res.send("Hello this is working");
});

const connected_users = [];

io.on("connection", (socket) => {
  socket.on("welcome", (data) => {
    // Check if the user with the same userId already exists in connected_users
    const existingUserIndex = connected_users.findIndex(
      (user) => user.userId === data.userId,
    );

    if (existingUserIndex !== -1) {
      connected_users[existingUserIndex] = data;
    } else {
      connected_users.push(data);
    }

    console.log(connected_users);
    io.emit("connected_users", connected_users);
  });

  socket.on("text", (text) => {
    console.log(text);
    console.log(text[text.length - 1].targetSocketId);
    io.to(text[text.length - 1]?.targetSocketId).emit("received_text", text);
  });

  socket.on("join_room", (room) => {
    console.log(room)
    socket.join(room)
    io.to(room).emit("welcomce_group", `A user has joined the ${room}`)
  });
  // socket.on("group_text", (groupInfo) => {
  //   console.log(groupInfo)
  //     io.to(groupInfo?.groupName).emit("received_text", groupInfo.message)
  //   })

 
});

import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  messageId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new Schema({
  senderId: { type: String, required: true }, // Assuming senderId is a user identifier
  receiverId: { type: String, required: true }, // Assuming receiverId is a user identifier
  messages: [messageSchema],
});

export const Chat = model("Chat", chatSchema);

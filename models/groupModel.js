import { Schema, model } from "mongoose";
import { messageSchema } from "./chatModel.js";

const groupSchema = new Schema({
    groupName: String,
    creator: String,
    messages: [messageSchema]
})

export const Group = model("Group", groupSchema)
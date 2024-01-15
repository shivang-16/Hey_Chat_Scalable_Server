import { Schema, model } from "mongoose";
import { messageSchema } from "./chatModel.js";

const groupSchema = new Schema({
    groupName: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
    messages: [messageSchema],
    members: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
          },
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Group = model("Group", groupSchema)
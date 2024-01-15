import { Chat } from "../models/chatModel.js";

export const saveChat = async (req, res) => {
  try {
    const { chatPayload } = req.body;

    if (!chatPayload || !Array.isArray(chatPayload)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing data" });
    }

    const chatPromises = chatPayload.map(async (text) => {
      const { senderId, receiverId, message, messageId } = text;

      // Check if the messageId already exists in the sender's messages array
      const existingSenderChat = await Chat.findOne({
        senderId,
        receiverId,
        "messages.messageId": messageId,
      });

      // Check if the messageId already exists in the receiver's messages array
      const existingReceiverChat = await Chat.findOne({
        senderId: receiverId,
        receiverId: senderId,
        "messages.messageId": messageId,
      });

      // If the message already exists in both documents, skip
      if (existingSenderChat && existingReceiverChat) {
        return [existingSenderChat, existingReceiverChat];
      }

      // Push the new message to the sender's document
      const updatedSenderChat = await Chat.findOneAndUpdate(
        { senderId, receiverId },
        {
          $push: {
            messages: {
              senderId,
              receiverId,
              message,
              messageId,
              timestamp: new Date(),
            },
          },
        },
        { upsert: true, new: true },
      );

      // Push the new message to the receiver's document
      const updatedReceiverChat = await Chat.findOneAndUpdate(
        { senderId: receiverId, receiverId: senderId },
        {
          $push: {
            messages: {
              senderId,
              receiverId,
              message,
              messageId,
              timestamp: new Date(),
            },
          },
        },
        { upsert: true, new: true },
      );

      return [updatedSenderChat, updatedReceiverChat];
    });

    const chatResults = await Promise.all(chatPromises);

    res.status(201).json({ success: true, result: chatResults.flat() });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const get_Chat_By_Sender_N_Receover = async(req, res) => {
    try {
        const {senderId, receiverId} = req.body
        console.log(senderId, receiverId)

        const requiredChat = await Chat.findOne({senderId, receiverId})
        if(!requiredChat) return res.status(404).json({success: false, message: "No such chats found"})

        res.status(200).json({success: true, chat: requiredChat})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
          });
    }
}


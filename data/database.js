import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

const ConnectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "Hey! Chat",
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectToMongo;

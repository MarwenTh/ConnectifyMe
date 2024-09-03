import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connectToDatabase;

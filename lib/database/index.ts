import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const connectToDatabase = async () => {
  // Use mongoose.connection.readyState instead
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection successfully established.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to Mongoose");
  }
};

export default connectToDatabase;

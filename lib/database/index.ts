import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let cachedConnection: typeof mongoose | null = null;

const connectToDatabase = async () => {
  if (cachedConnection) {
    console.log("Using cached database connection");
    return cachedConnection;
  }

  if (mongoose.connections[0].readyState) {
    console.log("Using existing database connection");
    cachedConnection = mongoose;
    return cachedConnection;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("New database connection established");
    cachedConnection = db;
    return cachedConnection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export default connectToDatabase;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI; // set in .env.local

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env.local file");
}

let isConnected = false; // global flag

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "nextjs_posts",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

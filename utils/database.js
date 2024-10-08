import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Promptopia",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, 
      socketTimeoutMS: 45000, 
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

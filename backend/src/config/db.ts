import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI not defined in environment variables");
    }
    const connection = await mongoose.connect(uri);
    // const connection = await mongoose.connect(process.env.MONGO_URI!) // ! <-- "hidd el hogy ez nem undefined"

    console.log("MongoDB connected succesfully", connection.connection.host);
  } catch (error) {
    console.log("Connection failed");
    process.exit(1);
  }
};

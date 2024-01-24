import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.DATABASE_URL}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB connected !! DB HOST :${connection.connection.host}`
    );
  } catch (err) {
    console.log(err, "error");
  }
};

export default connectDB;

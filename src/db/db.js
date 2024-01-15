import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}`
    );
    console.log("connection established");
  } catch (err) {
    console.log(err, "err");
  }
};

export default connectDB;

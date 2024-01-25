import express from "express";
import connectDB from "./data-base/index.js";
// import dotenv from "dotenv";
// dotenv.config({
//   path: "../env",
// });

const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Listening on port" + process.env.PORT || 8000);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

app.on("error", (error) => {
  console.log("Error", error);
});

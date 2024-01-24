import express from "express";
import connectDB from "./data-base/index.js";

const app = express();

connectDB()
  .then(() => {
    app.listen(4000 || 8000, () => {
      console.log("Listening on port" + 4000 || 8000);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

app.on("error", (error) => {
  console.log("Error", error);
});

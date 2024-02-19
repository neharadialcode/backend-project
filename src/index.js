import { app } from "./app.js";
import connectDB from "./data-base/index.js";

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

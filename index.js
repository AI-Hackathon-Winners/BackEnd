import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"

// Connect to database
await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error connecting to database", error));

// create an express app
const app = express();

// Use  middlewares
app.use(express.json());
app.use(cors());

// Use routes


// Listen for incoming requests
app.listen(4000, () => {
  console.log("App is listening on port 3000");
});

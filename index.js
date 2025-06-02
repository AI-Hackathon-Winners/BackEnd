import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/user.js";
import leadRouter from "./routes/lead.js";
import invoiceRouter from "./routes/invoice.js";
import aiRouter from "./routes/ai.js";

// Connect to database
await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("Error connecting to database", error));

// create an express app
const app = express();

// Use  middlewares
app.use(express.json());
app.use(cors());

// Use routes
app.use(userRouter, leadRouter, invoiceRouter, aiRouter);

// Listen for incoming requests
app.listen(4000, () => {
  console.log("App is listening on port 4000");
});

/* eslint-disable no-undef */
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB database is connected");
  } catch (error) {
    console.log(`MongoDB database connection failed: ${error}`);
  }
};

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("API is working");
});

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

import express from "express";
import apiRoute, { apiProtected } from "./utils/api.js";
import mongoose from "mongoose";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import { DB_CONNECT } from "./utils/constants.js";
import cors from "cors";
const app = express();

mongoose
  .connect(DB_CONNECT, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB:", e);
  });

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, apiProtected);

app.listen(PORT, () => console.log("Server is running"));

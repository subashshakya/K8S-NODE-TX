import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

const cors = require("cors");
dotenv.config();
const app = express();

const MONGO_USERNAME = process.env.MONGO_DB_USER_NAME;
const MONGO_PASSWORD = process.env.MONGO_DB_PASS;
const PORT = process.env.APPLICATION_PORT;
const connectionString = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@node-kube.gmxje.mongodb.net/?retryWrites=true&w=majority&appName=NODE-KUBE`;

app.use(cors());
app.use(express.json());

mongoose
  .connect(connectionString, {
    maxPoolSize: 20,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 40000,
  })
  .then(() => {
    console.log("CONNECTION TO DATABASE SUCCESSFUL");
    app.listen(PORT, () => {
      console.log(`SERVER LISTENING ON PORT:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`DATABASE CONNECTION FAILED::--::${err}`);
  });

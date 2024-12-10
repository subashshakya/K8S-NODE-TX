import express from "express";
import DEVELOPMENT_CONFIG from "./constants/development-config.constants.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(DEVELOPMENT_CONFIG.PORT, () => {
  console.log(`SERVER RUNNING ON PORT:${DEVELOPMENT_CONFIG.PORT}`);
});

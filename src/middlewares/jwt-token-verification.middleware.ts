import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
import { LoggerStatus } from "../constants/logger-status.enum.js";
import jwt from "jsonwebtoken";

dotenv.config();

const token_header_key = process.env.TOKEN_HEADER_KEY || "";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const containsBearerToken = authHeader && authHeader.startsWith("Bearer");
  if (containsBearerToken) {
    const token = authHeader.split(" ")[1];
    try {
      const verified = jwt.verify(token, token_header_key);
      next();
    } catch (err) {
      logger(LoggerStatus.WARN, "Token invalid");
      return res.status(401).send({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }
  } else {
    logger(LoggerStatus.WARN, "Token invalid");
    return res.status(401).send({
      success: false,
      message: "Authorization token missing",
    });
  }
};

export default verifyToken;

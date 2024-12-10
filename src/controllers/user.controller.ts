import { Request, Response } from "express";
import UserSchema from "../validators/user.validator.js";
import logger from "../utils/logger.js";
import { LoggerStatus } from "../constants/logger-status.enum.js";

const userSignUp = async (req: Request, res: Response) => {
  const requestBody = req.body;
  const { error, value } = UserSchema.validate(requestBody);
  if (error) {
    logger(LoggerStatus.ERROR, error.message);
    res.status(400).send({
      success: false,
      message: "Validation error occured in request.",
    });
  }
  try {
    return res.status(201).send({
      success: true,
      message: "User signup successful",
      data: value,
    });
  } catch (err) {
    logger(
      LoggerStatus.ERROR,
      err instanceof Error ? err?.message : (err as string)
    );
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

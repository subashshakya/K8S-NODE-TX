import { Request, Response } from "express";
import { UserSchema, UserLoginSchema } from "../validators/user.validator.js";
import logger from "../utils/logger.js";
import { LoggerStatus } from "../constants/logger-status.enum.js";
import { Prisma, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const prisma = new PrismaClient();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

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
    const user = await prisma.user.create({ data: value });
    res.status(201).send({
      success: true,
      message: "User signup successful",
      data: value,
    });
  } catch (err) {
    logger(
      LoggerStatus.ERROR,
      err instanceof Error ? err?.message : (err as string)
    );
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const userSignIn = async (req: Request, res: Response) => {
  const requestBody = req.body;
  const { error, value } = UserLoginSchema.validate(requestBody);
  if (error) {
    logger(LoggerStatus.ERROR, error.message);
    res.status(400).send({ success: false, message: "Invalid request body" });
  }
  const { username, password } = value;
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (err) {
    logger(
      LoggerStatus.ERROR,
      err instanceof Error ? err?.message : (err as string)
    );
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
  if (!user) {
    logger(LoggerStatus.ERROR, "User not found");
    res.status(404).send({
      success: false,
      message: "Could not find the user with specified usernaame",
    });
  }
  if (user?.password !== password) {
    logger(LoggerStatus.WARN, "Password mismatch");
    res.status(400).send({
      success: false,
      message: "Password does not match",
    });
  }
  const data = {
    time: Date(),
    userId: user?.id,
  };
  const token = jwt.sign(data, JWT_SECRET_KEY);
  res.status(200).send({
    success: true,
    message: "Login Successful",
    jwt_token: token,
  });
};

const editUserData = async (req: Request, res: Response) => {
  const requestData = req.body;
  if (!requestData) {
    res.status(400).send({
      success: false,
      message: "Request body empty",
    });
  }
  const { error, value } = UserSchema.validate(requestData);
  if (error) {
    logger(LoggerStatus.ERROR, error?.message);
    res.status(400).send({
      success: false,
      message: "Invalid request body.",
    });
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: value.id,
      },
      data: value,
    });
    if (updatedUser) {
      res.status(200).send({
        success: true,
        message: "Edit action successful",
        value: updatedUser,
      });
    }
  } catch (err) {
    logger(
      LoggerStatus.ERROR,
      err instanceof Error ? err?.message : (err as string)
    );
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      res.status(404).send({
        success: false,
        message: "User with specified id not found.",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    parseInt(id);
  } catch (err) {
    logger(
      LoggerStatus.WARN,
      err instanceof Error ? err?.message : (err as string)
    );
    res.status(400).send({
      success: false,
      message: "Invalid User Id.",
    });
  }
  try {
    /* eslint-disable*/
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    /* eslint-enable*/
    res.status(200).send({
      success: false,
      message: "User deleted successfully.",
    });
  } catch (err) {
    logger(
      LoggerStatus.ERROR,
      err instanceof Error ? err?.message : (err as string)
    );
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      res.status(404).send({
        success: false,
        message: "User with specified id not found.",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export { userSignIn, userSignUp, editUserData, deleteUser };

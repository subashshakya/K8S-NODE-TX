import express from "express";
import {
  deleteUser,
  editUserData,
  userSignIn,
  userSignUp,
} from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/sign-in", userSignIn);
userRouter.post("sign-up", userSignUp);
userRouter.patch("/edit", editUserData);
userRouter.delete("/delete:id", deleteUser);

export default userRouter;

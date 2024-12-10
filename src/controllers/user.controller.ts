import { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
  const requestBody = req.body;
  if (!requestBody) {
    res.status(400).send({ success: false, message: "Invalid Request!" });
  }
}

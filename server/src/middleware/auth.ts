import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/error";
import { errorHandler } from "../utils/responseHandler";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      throw new CustomError(401, "Access Denied!");
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1].trim();
    }
    token &&
      jwt.verify(token, process.env.JWT_SECRET as string, (error, _user) => {
        if (error) {
          throw new CustomError(403, "Invalid access token!");
        }
      });
    next();
  } catch (error: any) {
    return errorHandler(error, res);
  }
};

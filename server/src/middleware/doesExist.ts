import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { CustomError } from "../utils/error";
import { errorHandler } from "../utils/responseHandler";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const doesExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username } = req.body;
    if (email) {
      const user =
        (await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })) !== null;

      if (user) {
        throw new CustomError(400, "User already exists!");
      }
    }
    if (username) {
      const user =
        (await prisma.user.findUnique({
          where: {
            username,
          },
          select: {
            id: true,
          },
        })) !== null;

      if (user) {
        throw new CustomError(400, `${username} username is not available!`);
      }
    }
    next();
  } catch (error: any) {
    return errorHandler(error, res);
  }
};

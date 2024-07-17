import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { CustomError } from "../utils/error";
import { errorHandler } from "../utils/responseHandler";
import { profileExists } from "../utils/profile";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        role: true,
      },
    });

    if (!user) {
      throw new CustomError(401, "Access Denied!");
    }

    if (user.role !== "ADMIN") {
      throw new CustomError(400, "Admin access required!");
    }
    next();
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const authorizeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, profileId } = req.params;
    if (
      id === null ||
      profileId === null ||
      id === undefined ||
      profileId === undefined
    ) {
      throw new CustomError(400, "Invalid request!");
    }
    const profile = await profileExists(profileId);
    if (profile.user.id !== id) {
      throw new CustomError(403, "Unauthorized access!");
    }
    next();
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

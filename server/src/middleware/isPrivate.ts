import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { errorHandler } from "../utils/responseHandler";
import { CustomError } from "../utils/error";
import { isFriend } from "../utils/followers";

export const isPrivate = async (
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
      return res.status(400).json({ error: "Invalid request!" });
    }

    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        isPrivate: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!profile) {
      throw new CustomError(404, "Profile doesn't exists!");
    }

    if (profile.user.id === id || !profile.isPrivate) {
      return next();
    }

    const userProfile = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        profile: {
          select: {
            id: true,
          },
        },
      },
    });

    const friend = await isFriend(profileId, userProfile?.profile?.id);
    if (profile.isPrivate && !friend) {
      throw new CustomError(403, "This profile is private!");
    }
    return next();
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

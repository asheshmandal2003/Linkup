import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { CustomError } from "../utils/error";
import { errorHandler, successHandler } from "../utils/responseHandler";
import { fetchProfile } from "../utils/profile";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;

    const profile = await fetchProfile(profileId);
    return successHandler(200, profile, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const { id, profileId } = req.params;
    const { first_name, last_name, username, bio, location, dob } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        first_name: true,
        last_name: true,
        username: true,
        profile: {
          select: {
            id: true,
            bio: true,
            location: true,
            dob: true,
          },
        },
      },
    });

    if (!user) {
      throw new CustomError(404, "User doesn't exists!");
    }

    if (user.profile?.id !== profileId) {
      throw new CustomError(
        403,
        "You are not authorized to edit this profile!"
      );
    }

    if (
      first_name &&
      typeof first_name === "string" &&
      first_name.localeCompare(user.first_name) !== 0
    ) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          first_name,
        },
      });
    }

    if (
      last_name &&
      typeof last_name === "string" &&
      last_name.localeCompare(user.last_name) !== 0
    ) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          last_name,
        },
      });
    }

    if (
      username &&
      typeof username === "string" &&
      username.localeCompare(user.username) !== 0
    ) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          username,
        },
      });
    }

    if (
      bio &&
      typeof bio === "string" &&
      bio.localeCompare(user.profile?.bio as string) !== 0
    ) {
      await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          bio,
        },
      });
    }

    if (
      location &&
      typeof location === "string" &&
      location.localeCompare(user.profile?.location as string) !== 0
    ) {
      await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          location,
        },
      });
    }

    if (dob && new Date(dob) !== new Date(user.profile?.dob as Date)) {
      await prisma.profile.update({
        where: {
          id,
        },
        data: {
          dob: new Date(dob),
        },
      });
    }

    return successHandler(204, {}, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const editProfileType = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;

    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        isPrivate: true,
      },
    });

    await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        isPrivate: !profile?.isPrivate,
      },
    });

    return successHandler(204, {}, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

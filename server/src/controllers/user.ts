import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { CustomError } from "../utils/error";
import { errorHandler, successHandler } from "../utils/responseHandler";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
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
            bio: true,
            location: true,
            dob: true,
            isPrivate: true,
            avatar: true,
            cover: true,
          },
        },
      },
    });

    if (!user) {
      throw new CustomError(404, "User not found!");
    }
    return successHandler(200, user, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
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
            bio: true,
            location: true,
            dob: true,
            avatar: true,
            cover: true,
          },
        },
      },
    });

    if (!user) {
      throw new CustomError(404, "User doesn't exists!");
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
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          profile: {
            update: {
              bio,
            },
          },
        },
      });
    }

    if (
      location &&
      typeof location === "string" &&
      location.localeCompare(user.profile?.location as string) !== 0
    ) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          profile: {
            update: {
              location,
            },
          },
        },
      });
    }

    if (dob && new Date(dob) !== new Date(user.profile?.dob as Date)) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          profile: {
            update: {
              dob: new Date(dob),
            },
          },
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
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        profile: {
          select: {
            isPrivate: true,
          },
        },
      },
    });

    if (!user) {
      throw new CustomError(404, "User doesn't exists!");
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: {
            isPrivate: !user.profile?.isPrivate,
          },
        },
      },
    });

    return successHandler(204, {}, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user =
      (await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      })) !== null;

    if (!user) {
      throw new CustomError(404, "User doesn't exists!");
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return successHandler(
      200,
      { message: "Account deleted successfully!" },
      res
    );
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

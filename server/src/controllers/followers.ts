import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { errorHandler, successHandler } from "../utils/responseHandler";
import { checkFollow, checkUsers } from "../utils/followers";

export const getFollowersCount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const followersCount = await prisma.connection.count({
      where: {
        userId: id,
      },
    });

    return successHandler(200, followersCount, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const getFollowingsCount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const followingCount = await prisma.connection.count({
      where: {
        followerId: id,
      },
    });

    return successHandler(200, followingCount, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const followers = await prisma.connection.findMany({
      where: {
        userId: id,
      },
      select: {
        followers: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            username: true,
            profile: {
              select: {
                id: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return successHandler(200, followers, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const getFollowing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const following = await prisma.connection.findMany({
      where: {
        followerId: id,
      },
      select: {
        followings: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            username: true,
            profile: {
              select: {
                id: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return successHandler(200, following, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const follow = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;

    await checkUsers(id, userId);
    await checkFollow(id, userId);

    await prisma.connection.create({
      data: {
        userId,
        followerId: id,
      },
    });

    return successHandler(204, {}, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const unfollow = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;

    await checkUsers(id, userId);

    await prisma.connection.deleteMany({
      where: {
        userId,
        followerId: id,
      },
    });

    return successHandler(204, {}, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

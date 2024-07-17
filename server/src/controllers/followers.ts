import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { errorHandler, successHandler } from "../utils/responseHandler";
import { checkFollow, checkUsers } from "../utils/followers";
import { CustomError } from "../utils/error";

export const getFollowersCount = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;

    const followersCount = await prisma.connection.count({
      where: {
        userId: profileId,
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
    const { profileId } = req.params;

    const followingCount = await prisma.connection.count({
      where: {
        followerId: profileId,
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
    const { profileId } = req.params;

    const followers = await prisma.connection.findMany({
      where: {
        userId: profileId,
      },
      select: {
        followers: {
          select: {
            id: true,
            avatar: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
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
    const { profileId } = req.params;

    const following = await prisma.connection.findMany({
      where: {
        followerId: profileId,
      },
      select: {
        followings: {
          select: {
            id: true,
            avatar: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
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
    const { profileId, friendProfileId } = req.params;

    await checkUsers(profileId, friendProfileId);
    const follower = await checkFollow(profileId, friendProfileId);

    if (follower) {
      throw new CustomError(400, "You are already following this user!");
    }

    await prisma.connection.create({
      data: {
        userId: friendProfileId,
        followerId: profileId,
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
    const { profileId, friendProfileId } = req.params;

    await checkUsers(profileId, friendProfileId);

    await prisma.connection.deleteMany({
      where: {
        userId: friendProfileId,
        followerId: profileId,
      },
    });

    return successHandler(204, {}, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

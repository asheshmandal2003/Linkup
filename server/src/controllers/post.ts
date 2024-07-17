import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { errorHandler, successHandler } from "../utils/responseHandler";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const { cursor } = req.query;

    if (
      cursor === null ||
      cursor === undefined ||
      typeof cursor !== "string" ||
      cursor.length === 0
    ) {
      throw new Error("Invalid cursor provided!");
    }

    const posts = await prisma.post.findMany({
      where: {
        profileId,
      },
      select: {
        id: true,
        image: true,
        caption: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        hashtags: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 9,
      cursor: { id: cursor },
      skip: 1,
    });

    return successHandler(200, posts, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const doPost = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const { image, caption } = req.body;

    const newPost = await prisma.post.create({
      data: {
        profileId,
        image,
        caption,
      },
    });

    return successHandler(201, newPost, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body;

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        caption,
      },
    });

    return successHandler(204, null, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return successHandler(200, { message: "Post deleted successfully!" }, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

import { CustomError } from "./error";
import { prisma } from "./prismaClient";

export const profileExists = async (profileId: string) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
    select: {
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
  return profile;
};

export const fetchProfile = async (profileId: string) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
    select: {
      avatar: true,
      cover: true,
      bio: true,
      location: true,
      dob: true,
      isPrivate: true,
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          username: true,
        },
      },
      posts: {
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
        orderBy: { id: "asc" },
        take: 9,
      },
    },
  });

  if (!profile) {
    throw new CustomError(404, "Profile doesn't exists!");
  }
  return profile;
};

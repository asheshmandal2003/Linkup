import { CustomError } from "./error";
import { prisma } from "./prismaClient";

export async function followersCount(id: string) {
  const followersCount = await prisma.connection.count({
    where: {
      userId: id,
    },
  });

  return followersCount;
}

export async function followingsCount(id: string) {
  const followingCount = await prisma.connection.count({
    where: {
      followerId: id,
    },
  });

  return followingCount;
}

export async function isFriend(id: string, userId: string | undefined) {
  const follow =
    (await prisma.connection.findFirst({
      where: {
        userId: id,
        followerId: userId,
      },
      select: {
        id: true,
      },
    })) !== null;

  return follow;
}

export async function checkUsers(profileId: string, friendProfileId: string) {
  if (profileId === friendProfileId) {
    throw new CustomError(400, "Invalid request! You cannot follow yourself!");
  }

  const validUsers = await prisma.profile.findMany({
    where: {
      id: {
        in: [profileId, friendProfileId],
      },
    },
  });

  if (validUsers.length !== 2) {
    throw new CustomError(404, "Invalid request! User not found!");
  }
}

export async function checkFollow(profileId: string, friendProfileId: string) {
  const follow =
    (await prisma.connection.findFirst({
      where: {
        userId: friendProfileId,
        followerId: profileId,
      },
      select: {
        id: true,
      },
    })) !== null;

  return follow;
}

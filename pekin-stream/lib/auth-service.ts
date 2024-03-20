import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) {
    throw new Error("Not Found");
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();
  console.log(self?.username, !self || self?.username);
  if (!self || !self?.username) {
    throw new Error("unauthorized");
  }

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("user not found");
  }

  if (self.username !== user.username) {
    throw new Error("unauthorized");
  }
  return user;
};

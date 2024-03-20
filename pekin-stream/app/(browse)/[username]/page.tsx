import { notFound } from "next/navigation";
import { getUserByUsername } from "../../../lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);
  if (isBlocked) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-y-4">
      <p>User Page : {user.username} </p>
      <p>User Id : {user.id} </p>
      <p>is following :{`${isFollowing}`}</p>
      <p>is blocked by this user: {`${isBlocked}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id}></Actions>
    </div>
  );
};

export default UserPage;

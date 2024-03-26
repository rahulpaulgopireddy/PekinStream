import { currentUser } from "@clerk/nextjs";

import { getUserByUsername } from "@/lib/user-service";
import { StreamPlayer } from "@/components//stream-player/index";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreaterPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default CreaterPage;

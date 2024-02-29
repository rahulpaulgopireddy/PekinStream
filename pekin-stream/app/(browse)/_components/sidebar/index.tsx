import { getRecommended } from "@/lib/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";
import { getFollowedUsers } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./following";
export const Sidebar = async () => {
  const recommended = await getRecommended();
  const follows = await getFollowedUsers();

  return (
    // <div>sidebar</div>
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={follows} />
        <Recommended data={recommended}></Recommended>
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = async () => {
  return (
    <aside className="fixed left-0 flex-xol w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35 z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

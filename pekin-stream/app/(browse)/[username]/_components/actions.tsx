"use client";
import { toast } from "sonner";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { onBlock, onUnblock } from "@/actions/block";
import { blockUser } from "@/lib/block-service";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
  isBlocked: boolean;
}

export const Actions = ({ isFollowing, userId, isBlocked }: ActionProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("something went wrong"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have now unfollowing ${data.following.username}`)
        )
        .catch(() => toast.error("something went wrong"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => {
          toast.success(`you have now blocked ${data.blocked.username}`);
        })
        .catch((error) => {
          toast.error("something went wrong");
        });
    });
  };
  const handleUnBlock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => {
          toast.success(`you have now unblocked ${data.blocked.username}`);
        })
        .catch((error) => {
          toast.error("something went wrong");
        });
    });
  };
  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? "unfollow" : "follow"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        block
      </Button>
      <Button onClick={handleUnBlock} disabled={isPending}>
        unblock
      </Button>
    </>
  );
};

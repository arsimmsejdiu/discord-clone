"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { NavigationItemInterface } from "@/interfaces/navigation-interface";
import { Skeleton } from "../ui/skeleton";

export const NavigationItem = ({
  id,
  imageUrl,
  name,
}: NavigationItemInterface) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} align="center" side="right">
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]", // this is a difault classes or css that changes id the conditions below are met
            params?.serverId !== id && "group-hover:h-[20px]", // this is dynamic classes depending onthe function or params or router
            params?.serverId === id ? "h-[36px]" : "h-[8px]" // this is dynamic classes depending onthe function or params or router
          )}
        />
        {imageUrl ? (
          <div
            className={cn(
              "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
              params?.serverId === id &&
                "bg-primary/10 text-primary rounded-[16px]"
            )}
          >
            <Image src={imageUrl} alt="Channel" fill className="object-cover" />
          </div>
        ) : (
          <Skeleton className="relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden" />
        )}
      </button>
    </ActionTooltip>
  );
};

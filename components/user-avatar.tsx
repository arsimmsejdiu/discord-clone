import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserAvatarPros } from "@/interfaces/components-interface";
import { cn } from "@/lib/utils";

export const UserAvatar = ({ className, src }: UserAvatarPros) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} alt="User Avatar" />
    </Avatar>
  );
};

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarPros {
  src?: string;
  className?: string;
}

export const UserAvatar = ({ className, src }: UserAvatarPros) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} alt="User Avatar" />
    </Avatar>
  );
};

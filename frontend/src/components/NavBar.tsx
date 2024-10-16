import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Auth } from "@/components/Auth";
import { User } from "@auth0/auth0-react";

export const Navbar = ({ user, isAuthenticated }: User) => {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={isAuthenticated ? user.picture : "/placeholder-user.jpg"} alt="Chatbot Avatar" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium text-card-foreground">
          {isAuthenticated ? `Bonjour ${user.nickname} !` : "User"}
        </div>
      </div>

      <div className="ml-auto gap-1.5 text-sm">
        <Auth />
      </div>
    </header>
  );
};

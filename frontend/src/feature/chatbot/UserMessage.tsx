import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export const UserMessage = ({
  message,
  avatarImage,
  avatarFallback,
  isVisible,
  createdAt,
  causes,
}: {
  message: string;
  avatarImage?: string;
  avatarFallback?: string;
  isVisible: boolean;
  createdAt: Date;
  causes: string[];
}) => {
  return (
    <div className="flex items-start gap-4 justify-end">
      <div className="flex flex-col items-end">
        <div className="grid gap-1 bg-primary rounded-lg p-3">
          <div className="text-sm font-medium text-primary-foreground">{avatarFallback ?? "You"}</div>
          <div className="text-sm text-primary-foreground">
            {isVisible ? (
              message
            ) : (
              <>
                <p>Votre message a été supprimé car il enfreint les raisons suivantes :</p>
                <ul className="list-disc list-inside">
                  {causes.map(cause => (
                    <li key={uuidv4()}>{cause}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">{format(createdAt, "PPpp")}</div>
      </div>
      <Avatar className="w-8 h-8">
        <AvatarImage src={avatarImage ?? "/placeholder-user.jpg"} alt="User Avatar" />
        <AvatarFallback>{avatarFallback ?? "You"}</AvatarFallback>
      </Avatar>
    </div>
  );
};

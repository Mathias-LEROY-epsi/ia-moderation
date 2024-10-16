import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { UserMessage } from "@/feature/chatbot/UserMessage";
import { Message } from "@/types";
import { ArrowUpIcon } from "lucide-react";
import { User } from "@auth0/auth0-react";

// TODO: implémenter dans le front la modif de openai valid: false si retour positif
// TODO: implem la sauvegarde dans la BDD
// TODO: empecher la modif depuis le front des messages -> quand on fait un POST, le back va check le msg, modifier valid:false et rajouter un msg du bot si besoin

export function Chatbot({
  messages,
  onSendMessage,
  user,
  isAuthenticated,
}: {
  messages: Message[];
  onSendMessage: (message: string) => void;
} & User) {
  const [newMessage, setNewMessage] = useState("");
  console.log();

  const showMessages = () => {
    if (messages.length === 0) {
      return <p>Bienvenue ! vous pouvez envoyer des messages pour commencer la discussion</p>;
    }
    return (
      <>
        {messages.map(message => {
          return (
            <UserMessage
              key={message.id}
              message={message.content}
              avatarImage={isAuthenticated && user ? user.picture : "/placeholder-user.jpg"}
              avatarFallback={isAuthenticated && user ? user.nickname : "You"}
              isVisible={message.visible}
              createdAt={message.creation_date}
              causes={message.reasons}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-4">
        <ScrollArea>
          <div className="grid gap-4">{showMessages()}</div>
        </ScrollArea>
      </div>
      <div className="bg-card p-4 border-t sticky bottom-0 z-10">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            rows={1}
            className="min-h-[48px] rounded-2xl resize-none p-4 border pr-16"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute w-8 h-8 top-3 right-3"
            onClick={() => {
              if (newMessage) {
                onSendMessage(newMessage);
                setNewMessage("");
              }
            }}>
            <ArrowUpIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

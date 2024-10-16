import { PropsWithChildren } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllMessages, postAMessage, postModeration } from "@/api";
import { Navbar } from "@/components/NavBar";
import { Chatbot } from "@/feature/chatbot";

const Container = ({ user, isAuthenticated, children }: PropsWithChildren<User>) => {
  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <Navbar user={user} isAuthenticated={isAuthenticated} />
        {children}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth0();

  const queryClient = useQueryClient();

  const queryGetAllMessages = useQuery({
    queryKey: ["messages"],
    queryFn: getAllMessages,
    staleTime: 300000,
    retry: 5,
  });

  const queryPostAMessage = useMutation({
    mutationFn: postAMessage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["messages"] });
      await queryGetAllMessages.refetch();
    },
    onError: error => {
      console.log("Erreur lors de la création du message: ", error);
    },
  });

  const queryPostModerateAMessage = useMutation({
    mutationFn: postModeration,
    onSuccess: async data => {
      const attributeScores = data?.attributeScores || {};
      const attributeKeys = Object.keys(attributeScores);

      // Si attributeScores est vide, retourne null
      if (attributeKeys.length === 0) {
        return [];
      }
      // Retourne une liste des clés présentes dans attributeScores
      return attributeKeys.filter(key => attributeScores[key]);
    },
    onError: error => {
      console.log("Erreur lors de la vérification du message: ", error);
    },
  });

  console.log(queryGetAllMessages.data);

  const handleSendMessage = async (message: string) => {
    try {
      // Exécution de la modération du message
      const reasons: string[] = await new Promise((resolve, reject) => {
        queryPostModerateAMessage.mutate(message, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      // Vérification des résultats de la modération
      if (reasons.length === 0) {
        // Message sans modération
        queryPostAMessage.mutate({
          content: message,
          visible: true,
          reasons: [],
        });
      } else {
        // Message modéré avec des raisons
        queryPostAMessage.mutate({
          content: message,
          visible: false,
          reasons: reasons,
        });
      }
    } catch (error) {
      console.log("Erreur lors de l'envoi du message: ", error);
    }
  };

  if (queryGetAllMessages.isFetching) {
    return (
      <Container user={user} isAuthenticated={isAuthenticated}>
        <p>Loading...</p>
      </Container>
    );
  }
  if (queryGetAllMessages.isError) {
    return (
      <Container user={user} isAuthenticated={isAuthenticated}>
        <p>Un problème technique est survenu.</p>
      </Container>
    );
  }
  return (
    <Container user={user} isAuthenticated={isAuthenticated}>
      <div className="flex flex-col h-screen">
        <Chatbot
          messages={queryGetAllMessages.data}
          onSendMessage={handleSendMessage}
          user={user!}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </Container>
  );
}

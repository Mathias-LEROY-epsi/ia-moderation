export type Message = {
  id: string;
  content: string;
  visible: boolean;
  reasons: string[];
  creation_date: Date;
};

export type MessageWithoutId = Omit<Message, "id" | "creation_date">;

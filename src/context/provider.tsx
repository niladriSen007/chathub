"use client"
import { ChatProviderProps } from "@/types";
import { ChatContext } from "./context";

export const ChatProvider = ({ children }: ChatProviderProps) => {
 // const [chatSession, setChatSession] = useState<ChatSessionProps[]>([]);
  return (
    <ChatContext.Provider value={{ chatSession : [] }}>
      {children}
    </ChatContext.Provider>
  );
}
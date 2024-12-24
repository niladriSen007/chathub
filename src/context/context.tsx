"use client";
import { ChatSessionProps } from "@/types";
import { createContext, useContext } from "react";

export const ChatContext = createContext<ChatSessionProps | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
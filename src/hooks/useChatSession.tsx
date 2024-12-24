import { ChatMessageProps, ChatSessionProps } from "@/types";
import { get, set } from "idb-keyval";

const useChatSession = () => {
  const getSessions = async () => await get("chat-sessions");
  const setSessions = async (session: ChatSessionProps) => {
    const previousSessions = await getSessions();
    const newSessions = [...previousSessions, session];
    await set("chat-sessions", newSessions);
  };
  const getSessionById = async (sessionId: string) => {
    const sessions = await getSessions();
    return sessions.find(
      (session: ChatSessionProps) => session.id === sessionId
    );
  };
  const deleteSession = async (sessionId: string) => {
    const sessions = await getSessions();
    const newSessions = sessions.filter(
      (session: ChatSessionProps) => session.id !== sessionId
    );
    await set("chat-sessions", newSessions);
  };
  const addMessageToSession = async (
    sessionId: string,
    message: ChatMessageProps
  ) => {
    const session = await getSessionById(sessionId);
    const newSession = {
      ...session,
      messages: [...session.messages, message],
    };
    await setSessions(newSession);
  };

  const updateSession = async (
    sessionId: string,
    newSession: Omit<ChatSessionProps, "messages,id">
  ) => {
    const session = await getSessionById(sessionId);
    const updatedSession = {
      ...session,
      ...newSession,
    };
    await setSessions(updatedSession);
  };
  return {
    getSessions,
    setSessions,
    getSessionById,
    deleteSession,
    addMessageToSession,
    updateSession,
  };
};
export default useChatSession;

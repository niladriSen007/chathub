import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ReactNode } from "react";

export enum ModelType {
  GPT_3_5_turbo = "gpt-3.5-turbo",
  GPT_4o = "gpt-4o",
  GPT_4o_mini = "gpt-4o-mini",
  Claude_3_5_sonnet = "claude-3-5-sonnet",
  Claude_3_5_sonnet_mini = "claude-3-5-sonnet-mini",
}
export enum PromptType {
  ASK = "ask",
  ANSWER = "answer",
  EXPLAIN = "explain",
  SUMMARIZE = "summarize",
  REVIEW = "review",
  RECOMMEND = "recommend",
  DISCUSS = "discuss",
  IMPROVE = "improve",
  FIX_GRAMMAR = "fix_grammar",
  FIX_SPELLING = "fix_spelling",
  FIX_TYPO = "fix_typo",
  FIX_PUNCTUATION = "fix_punctuation",
  FIX_SENTENCE = "fix_sentence",
  FIX_PARAGRAPH = "fix_paragraph",
  FIX_DOCUMENT = "fix_document",
  REPLY = "reply",
  SHORT_REPLY = "short_reply",
}
export enum RoleType {
  ASSISTANT = "assistant",
  CODING_EXPERT = "coding_expert",
  CONTENT_WRITER = "content_writer",
}
export interface PromptProps {
  role: RoleType;
  context?: string;
  query?: string;
  regenerate?: boolean;
  promptType: PromptType;
}

export interface ChatMessageProps {
  id: string;
  model: ModelType;
  human: HumanMessage;
  assistant: AIMessage;
  rawHuman: string;
  rawAssistant: string;
  props?: PromptProps;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChatSessionProps {
  createdAt: string;
  id: string;
  messages: ChatMessageProps[];
  title?: string;
  updatedAt?: string;
}

export interface ChatContext{
  chatSession : ChatSessionProps[];
}


export interface ChatProviderProps {
  children : ReactNode;
}
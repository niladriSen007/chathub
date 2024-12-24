import { ChatMessageProps, ModelType, PromptProps } from "@/types";
import useChatSession from "./useChatSession";
import { ChatOpenAI } from "@langchain/openai";
import { v4 as uuidv4 } from "uuid";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { getInstructions, getRole } from "@/lib/prompts";
export const useLLM = () => {
  const { getSessionById, addMessageToSession } = useChatSession();

  const preparePrompt = async (
    props: PromptProps,
    history: ChatMessageProps[]
  ) => {
    const messageHistory = history;
    const prompts = ChatPromptTemplate.fromMessages(
      messageHistory?.length > 0
        ? [
            [
              "system",
              `You are {role} Answer user's question based on the following context:`,
            ],
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"],
          ]
        : [
            props?.context
              ? [
                  "system",
                  `You are {role} Answer user's question based on the following context: {context}`,
                ]
              : ["system", `You are {role} Answer user's question`],
            ["user", "{input}"],
          ]
    );

    const previousMessageHistory = messageHistory.reduce(
      (acc: (HumanMessage | AIMessage)[], { rawHuman, rawAssistant }) => [
        ...acc,
        new HumanMessage(rawHuman),
        new AIMessage(rawAssistant),
      ],
      []
    );

    return await prompts.formatMessages(
      messageHistory?.length > 0
        ? {
            role: getRole(props.role),
            chat_history: previousMessageHistory,
            input: props.query,
          }
        : {
            role: getRole(props.role),
            type: getInstructions(props.promptType),
            context: props.context,
            input: props.query,
          }
    );
  };

  const runModel = async (props: PromptProps, sessionId: string) => {
    const currentSession = await getSessionById(sessionId);

    if (!props?.query) return;

    const apiKey = process.env.OPENAI_API_KEY;
    const chatModel = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: "gpt-3.5-turbo",
    });

    const newMessageId = uuidv4();

    const formattedPrompt = await preparePrompt(
      props,
      currentSession.messages || []
    );

    const stream = await chatModel.stream(formattedPrompt);

    let streamedMessage = "";

    for await (const message of stream) {
      streamedMessage += message.content;
    }

    const chatMessage = {
      id: newMessageId,
      model: ModelType.GPT_3_5_turbo,
      human: new HumanMessage(props.query),
      assistant: new AIMessage(streamedMessage),
      rawHuman: props.query,
      rawAssistant: streamedMessage,
      props,
    };

    addMessageToSession(sessionId, chatMessage);
  };

  return {
    runModel,
  };
};

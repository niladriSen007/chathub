import { PromptType, RoleType } from "@/types";

export const getRole = (role: RoleType) => {
  switch (role) {
    case RoleType.CODING_EXPERT:
      return "expert in coding";
    case RoleType.CONTENT_WRITER:
      return "very much efficient and expert in writing content";
    default:
      return "assistant";
  }
};

export const getInstructions = (instruction: PromptType) => {
  switch (instruction) {
    case PromptType.ASK:
      return "based on {userQuery}";
    case PromptType.ANSWER:
      return "Answer this question";
    case PromptType.EXPLAIN:
      return "Explain this concept";
    case PromptType.SUMMARIZE:
      return "Summarize this text";
    case PromptType.REVIEW:
      return "Review this product";
    case PromptType.RECOMMEND:
      return "Recommend a product";
    case PromptType.DISCUSS:
      return "Discuss this topic";
    case PromptType.IMPROVE:
      return "Improve this text";
    case PromptType.FIX_GRAMMAR:
      return "Fix the grammar";
    case PromptType.FIX_SPELLING:
      return "Fix the spelling";
    case PromptType.FIX_TYPO:
      return "Fix the typo";
    case PromptType.FIX_PUNCTUATION:
      return "Fix the punctuation";
    case PromptType.FIX_SENTENCE:
      return "Fix the sentence";
    case PromptType.FIX_PARAGRAPH:
      return "Fix the paragraph";
    case PromptType.FIX_DOCUMENT:
      return "Fix the document";
    case PromptType.REPLY:
      return "Reply to this message";
    case PromptType.SHORT_REPLY:
      return "Short reply to this message";
    default:
      return "Answer this question";
  }
};

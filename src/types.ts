export type Role = "Deployment" | "Sales" | "CS" | "Product" | "Engineering";

export type WorkspaceTab = "Agent" | "The Hub" | "Daily Brief";

export type PromptIcon =
  | "paperclip"
  | "team"
  | "chart-down"
  | "presentation"
  | "building"
  | "inbox"
  | "roadmap"
  | "bug"
  | "code-review";

export type PromptDefinition = {
  role: Role;
  text: string;
  query: string;
  responseId: string;
  icon: PromptIcon;
};

export type SourceProvider =
  | "slack"
  | "linear"
  | "notion"
  | "junior"
  | "product"
  | "casejam"
  | "github"
  | "engineering";

export type SourceCitation = {
  label: string;
  url: string;
  provider: SourceProvider;
};

export type ResponseAttachment = {
  name: string;
  type: "presentation" | "document" | "spreadsheet";
  description: string;
};

export type AnswerBlock =
  | {
      kind: "paragraph";
      text: string;
      sources: SourceCitation[];
    }
  | {
      kind: "table";
      caption: string;
      headers: string[];
      rows: string[][];
      sources: SourceCitation[];
    }
  | {
      kind: "followUp";
      text: string;
    };

export type DemoResponse = {
  role: Role;
  prompt: string;
  answer: AnswerBlock[];
  attachments?: ResponseAttachment[];
  lastUpdated: string;
};

export type Message =
  | {
      id: string;
      type: "user";
      content: string;
    }
  | {
      id: string;
      type: "assistant";
      content: AnswerBlock[];
      attachments?: ResponseAttachment[];
      lastUpdated?: string;
      showSources?: boolean;
    };

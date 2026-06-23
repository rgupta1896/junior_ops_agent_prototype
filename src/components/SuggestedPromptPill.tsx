import { PromptIconGlyph } from "./icons/PromptIcons";
import type { PromptDefinition } from "../types";

type SuggestedPromptPillProps = {
  prompt: PromptDefinition;
  onClick: (prompt: PromptDefinition) => void;
};

export function SuggestedPromptPill({ prompt, onClick }: SuggestedPromptPillProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(prompt)}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm text-[#d9e3ec] shadow-[0_10px_25px_rgba(0,0,0,0.16)] transition hover:border-[#7bd0ff]/30 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7bd0ff]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1014]"
    >
      <PromptIconGlyph icon={prompt.icon} className="h-3.5 w-3.5 text-[#8ad2ff]" />
      <span>{prompt.text}</span>
    </button>
  );
}

type TypingIndicatorProps = {
  agentLabel: string;
};

export function TypingIndicator({ agentLabel }: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7bd0ff] [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7bd0ff] [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7bd0ff]" />
      </div>
      <p className="text-sm text-[#9fb0be]">{agentLabel} is drafting a response…</p>
    </div>
  );
}

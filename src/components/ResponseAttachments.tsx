import type { ResponseAttachment } from "../types";
import { JuniorIcon } from "./icons/JuniorIcon";

type ResponseAttachmentsProps = {
  attachments: ResponseAttachment[];
};

function AttachmentIcon() {
  return <JuniorIcon className="h-4 w-4" size="sm" />;
}

export function ResponseAttachments({ attachments }: ResponseAttachmentsProps) {
  return (
    <div className="mt-6 space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#8193a3]">
        Attachments
      </p>
      <div className="space-y-2">
        {attachments.map((attachment) => (
          <button
            key={attachment.name}
            type="button"
            className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left transition hover:border-[#7bd0ff]/25 hover:bg-white/8"
          >
            <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(123,97,255,0.24),rgba(70,212,255,0.18))]">
              <AttachmentIcon />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{attachment.name}</p>
              <p className="mt-1 text-sm leading-6 text-[#9fb0be]">{attachment.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

import type { AnswerBlock } from "../types";
import { SourceCitation } from "./SourceCitation";
import { ResponseAttachments } from "./ResponseAttachments";
import type { ResponseAttachment } from "../types";

type ResponseCardProps = {
  content: AnswerBlock[];
  attachments?: ResponseAttachment[];
  lastUpdated?: string;
  showSources?: boolean;
};

export function ResponseCard({
  content,
  attachments,
  lastUpdated,
  showSources = true,
}: ResponseCardProps) {
  return (
    <article className="max-w-[760px] rounded-[32px] border border-white/10 bg-[#0c141a]/88 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-7">
      <div className="space-y-5 text-[15px] leading-7 text-[#e7eef6]">
        {content.map((block, index) => {
          if (block.kind === "paragraph") {
            return (
              <p key={`paragraph-${index}`}>
                {block.text}
                {showSources ? <SourceCitation sources={block.sources} /> : null}
              </p>
            );
          }

          if (block.kind === "table") {
            return (
              <div key={`table-${index}`} className="space-y-3">
                <p className="text-[#dce7f1]">{block.caption}</p>
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a1116]">
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-white/10 bg-white/[0.03]">
                      <tr>
                        {block.headers.map((header) => (
                          <th
                            key={header}
                            className="px-4 py-3 font-medium text-[#8ad2ff]"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row) => (
                        <tr
                          key={row.join("-")}
                          className="border-b border-white/6 last:border-b-0"
                        >
                          {row.map((cell) => (
                            <td key={cell} className="px-4 py-3 align-top text-[#e7eef6]">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {showSources ? (
                  <p>
                    <SourceCitation sources={block.sources} />
                  </p>
                ) : null}
              </div>
            );
          }

          return (
            <p
              key={`followup-${index}`}
              className="rounded-2xl border border-[#7bd0ff]/16 bg-[linear-gradient(135deg,rgba(123,97,255,0.12),rgba(70,212,255,0.08))] px-4 py-3 text-[#dce8f5]"
            >
              {block.text}
            </p>
          );
        })}
      </div>

      {attachments && attachments.length > 0 ? (
        <ResponseAttachments attachments={attachments} />
      ) : null}

      {lastUpdated ? <p className="mt-5 text-xs text-[#8193a3]">Last updated {lastUpdated}</p> : null}
    </article>
  );
}

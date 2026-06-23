import type { PromptIcon } from "../../types";

type IconProps = {
  icon: PromptIcon;
  className?: string;
};

export function PromptIconGlyph({ icon, className = "h-3.5 w-3.5" }: IconProps) {
  const stroke = "currentColor";
  const strokeWidth = 1.75;

  switch (icon) {
    case "paperclip":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      );
    case "team":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
          <circle cx="9" cy="8" r="2.75" />
          <circle cx="16.5" cy="9.5" r="2.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18a4.5 4.5 0 0 1 9 0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 18a3.75 3.75 0 0 1 6.75 0" />
        </svg>
      );
    case "chart-down":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16M7 16l3-3 3 2 5-6" />
          <path strokeLinecap="round" d="M17 9h3v3" />
        </svg>
      );
    case "presentation":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path strokeLinecap="round" d="M8 20h8M12 16v4" />
        </svg>
      );
    case "building":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V8l8-4 8 4v12" />
          <path strokeLinecap="round" d="M9 20v-6h6v6M9 10h.01M15 10h.01" />
        </svg>
      );
    case "inbox":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
          <path strokeLinecap="round" d="M4 13h4l1 3h6l1-3h4" />
        </svg>
      );
    case "roadmap":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" d="M4 18h3M10 18h10M4 12h3M10 12h10M4 6h3M10 6h10" />
          <circle cx="7" cy="6" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="7" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="7" cy="18" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bug":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" d="M8 9V7a4 4 0 1 1 8 0v2" />
          <path strokeLinecap="round" d="M4 12h3M17 12h3M6 16h12M8 20h8" />
          <rect x="8" y="9" width="8" height="8" rx="4" />
        </svg>
      );
    case "code-review":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="12" r="2.5" />
          <path strokeLinecap="round" d="M8.2 7.4 15.8 10.6M8.2 16.6l7.6-3.2" />
        </svg>
      );
    default:
      return null;
  }
}

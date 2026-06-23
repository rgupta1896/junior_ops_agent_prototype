import {
  GithubIcon,
  LinearIcon,
  NotionIcon,
  SlackIcon,
} from "./icons/IntegrationIcons";
import { JuniorIcon } from "./icons/JuniorIcon";
import type { WorkspaceTab } from "../types";

type SidebarProps = {
  activeItem: WorkspaceTab;
  onSelect: (item: WorkspaceTab) => void;
};

const navigationItems = [
  {
    label: "Agent",
    description: "Customised AI agent with user context-awareness",
  },
  {
    label: "The Hub",
    description:
      "Central repository for client learnings, best practices, product updates, and cross-team knowledge-sharing",
  },
  {
    label: "Daily Brief",
    description: "Agent-generated daily digests relevant to your role",
  },
] as const;

const integrations = [
  { label: "Slack", icon: SlackIcon, connected: true },
  { label: "Linear", icon: LinearIcon, connected: true },
  { label: "Notion", icon: NotionIcon, connected: true },
  { label: "GitHub", icon: GithubIcon, connected: true },
] as const;

export function Sidebar({ activeItem, onSelect }: SidebarProps) {
  return (
    <aside className="w-full flex-none border-b border-white/10 bg-[#070d12]/78 px-5 py-6 text-[#f4f7fb] backdrop-blur-xl lg:min-h-screen lg:w-[270px] lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-2.5">
        <JuniorIcon className="h-7 w-7" size="sm" />
        <div className="text-[1.65rem] font-medium leading-none tracking-[-0.03em] text-white">
          Junior
        </div>
      </div>

      <div className="mt-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#6f8294]">
          Workspace
        </p>
        <nav className="mt-4 space-y-1">
          {navigationItems.map((item) => {
            const isActive = item.label === activeItem;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelect(item.label)}
                className={`relative flex w-full items-start justify-between gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-white/8 text-white shadow-[0_16px_40px_rgba(0,0,0,0.26)] ring-1 ring-white/10"
                    : "text-[#8da0b1] hover:bg-white/6 hover:text-white"
                }`}
              >
                {isActive ? (
                  <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-[#69d8ff]" />
                ) : null}
                <span className="min-w-0">
                  <span className={`block text-sm font-medium leading-5 ${isActive ? "text-white" : ""}`}>
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className={`mt-1 block text-xs leading-4 ${isActive ? "text-[#aebdca]" : "text-[#687b8d]"}`}>
                      {item.description}
                    </span>
                  ) : null}
                </span>
                {isActive ? (
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-[#69d8ff]" />
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#6f8294]">
          Integrations
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {integrations.map(({ label, icon: Icon, connected }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-[#c7d2de]"
            >
              <Icon className="h-[18px] w-[18px] flex-none" />
              <span className="flex-1">{label}</span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-[#6be3ae]" : "bg-[#6b7280]"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

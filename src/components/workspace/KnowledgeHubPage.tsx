import { useMemo, useState } from "react";
import type { Role } from "../../types";

type CollectionCard = {
  title: string;
  count: string;
  icon: "cap" | "target" | "markets" | "code" | "book" | "map" | "chat" | "user" | "doc" | "spark" | "shield" | "message" | "pod";
};

type HubFilter = "For You" | Role;

type DriveItem = {
  name: string;
  lastOpened: string;
  owner: string;
  kind: "folder" | "document";
};

const collectionsByRole: Record<Role, CollectionCard[]> = {
  Deployment: [
    { title: "Diligence Rollout Playbooks", count: "24 items", icon: "cap" },
    { title: "Client Workflow Patterns", count: "21 items", icon: "map" },
    { title: "Deployment Learnings", count: "15 items", icon: "chat" },
    { title: "Stakeholder Maps", count: "12 items", icon: "pod" },
    { title: "Onboarding Materials", count: "22 items", icon: "doc" },
    { title: "Prompt Library", count: "31 items", icon: "spark" },
  ],
  Sales: [
    { title: "Private Markets Messaging", count: "18 items", icon: "markets" },
    { title: "Objection Handling", count: "14 items", icon: "message" },
    { title: "Demo Storylines", count: "15 items", icon: "chat" },
    { title: "Buyer Research Briefs", count: "19 items", icon: "map" },
    { title: "Deal Team Personas", count: "11 items", icon: "user" },
    { title: "Account Briefs", count: "23 items", icon: "pod" },
  ],
  CS: [
    { title: "Adoption Playbooks", count: "19 items", icon: "book" },
    { title: "Expansion Signals", count: "16 items", icon: "target" },
    { title: "Enablement Templates", count: "22 items", icon: "doc" },
    { title: "Client Champions", count: "11 items", icon: "user" },
    { title: "Workflow Clinics", count: "13 items", icon: "chat" },
    { title: "Renewal Prep", count: "9 items", icon: "shield" },
  ],
  Product: [
    { title: "Alexandria Playbooks", count: "27 items", icon: "book" },
    { title: "Prompt Library", count: "31 items", icon: "spark" },
    { title: "Client Learnings", count: "15 items", icon: "chat" },
    { title: "Feature Readiness Notes", count: "22 items", icon: "doc" },
    { title: "QA & Caveats", count: "17 items", icon: "shield" },
    { title: "Roadmap Briefs", count: "23 items", icon: "pod" },
  ],
  Engineering: [
    { title: "Voice Intelligence Runbooks", count: "32 items", icon: "code" },
    { title: "QA & Caveats", count: "17 items", icon: "shield" },
    { title: "NER Patch Reviews", count: "14 items", icon: "doc" },
    { title: "Prompt Library", count: "31 items", icon: "spark" },
    { title: "Failure Reviews", count: "15 items", icon: "chat" },
    { title: "Platform Briefs", count: "23 items", icon: "pod" },
  ],
};

const forYouCollections: CollectionCard[] = [
  { title: "Diligence Rollout Playbooks", count: "24 items", icon: "cap" },
  { title: "Client Workflow Patterns", count: "21 items", icon: "map" },
  { title: "Demo Storylines", count: "15 items", icon: "chat" },
  { title: "Alexandria Playbooks", count: "27 items", icon: "book" },
  { title: "Voice Intelligence Runbooks", count: "32 items", icon: "code" },
];

const workflowPatternItems: DriveItem[] = [
  {
    name: "EY-Parthenon",
    lastOpened: "Opened 12m ago",
    owner: "Deployment",
    kind: "folder",
  },
  {
    name: "Bain Capital",
    lastOpened: "Opened 1h ago",
    owner: "Sales",
    kind: "folder",
  },
  {
    name: "Warburg Pincus",
    lastOpened: "Opened yesterday",
    owner: "CS",
    kind: "folder",
  },
  {
    name: "Cross-account onboarding notes",
    lastOpened: "Opened yesterday",
    owner: "Deployment",
    kind: "document",
  },
  {
    name: "Workflow handoff checklist",
    lastOpened: "Opened 2d ago",
    owner: "Ops",
    kind: "document",
  },
  {
    name: "Readout-to-retrieval examples",
    lastOpened: "Opened 3d ago",
    owner: "Deployment",
    kind: "document",
  },
];

function SearchIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path strokeLinecap="round" d="m16 16 4 4" />
    </svg>
  );
}

function KbdIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="13" rx="3" />
      <path strokeLinecap="round" d="M9 12h6M12 9v6" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h4l2 2h6a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 18 19H6A2.5 2.5 0 0 1 3.5 16.5v-9Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M7 4h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M14 4v5h5M8 13h8M8 17h5" />
    </svg>
  );
}

function CollectionIcon({ icon }: { icon: CollectionCard["icon"] }) {
  const className = "h-5 w-5";

  switch (icon) {
    case "cap":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="m3 10 9-4 9 4-9 4-9-4Z" />
          <path strokeLinecap="round" d="M7 12.5v4.2c0 .6 2.3 2.3 5 2.3s5-1.7 5-2.3v-4.2" />
        </svg>
      );
    case "code":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 8-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      );
    case "markets":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" d="M4 19h16" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 15.5 10 11l3 2.5L18 8.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5H18v2.5" />
        </svg>
      );
    case "book":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v14H7.5A2.5 2.5 0 0 0 5 20.5v-14Z" />
          <path d="M5 6.5A2.5 2.5 0 0 0 2.5 4H2v14h.5A2.5 2.5 0 0 1 5 20.5" />
        </svg>
      );
    case "map":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M4 19V8l6-3 4 3 6-3v11l-6 3-4-3-6 3Z" />
          <path d="M10 5v11M14 8v11" />
        </svg>
      );
    case "chat":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H10l-5 5v-5.5A2.5 2.5 0 0 1 2.5 12V6.5Z" />
        </svg>
      );
    case "user":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="12" cy="8" r="3.25" />
          <path strokeLinecap="round" d="M5.5 19a6.5 6.5 0 0 1 13 0" />
        </svg>
      );
    case "doc":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M7 4h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M14 4v5h5M8 13h8M8 17h5" />
        </svg>
      );
    case "spark":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
          <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="m12 3 7 3v5c0 4.4-2.8 8.4-7 10-4.2-1.6-7-5.6-7-10V6l7-3Z" />
        </svg>
      );
    case "message":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H9l-4 4v-4.5A2.5 2.5 0 0 1 2.5 12V6.5Z" />
        </svg>
      );
    case "pod":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="8" cy="8.5" r="2.5" />
          <circle cx="16" cy="8.5" r="2.5" />
          <path strokeLinecap="round" d="M3.5 18a4.5 4.5 0 0 1 9 0M11.5 18a4.5 4.5 0 0 1 9 0" />
        </svg>
      );
    default:
      return null;
  }
}

function FilterPill({
  label,
  active = false,
  onClick,
}: {
  label: HubFilter;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-[#7bd0ff]/40 bg-[linear-gradient(135deg,rgba(82,157,255,0.22),rgba(69,212,255,0.16))] text-white"
          : "border-white/10 bg-white/5 text-[#9db0c1] hover:border-white/18 hover:bg-white/8 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export function KnowledgeHubPage() {
  const [activeFilter, setActiveFilter] = useState<HubFilter>("For You");
  const [openedCollection, setOpenedCollection] = useState<string | null>(null);

  const collections = useMemo(
    () => (activeFilter === "For You" ? forYouCollections : collectionsByRole[activeFilter]),
    [activeFilter],
  );

  const guidedCollection = activeFilter === "For You" ? "Client Workflow Patterns" : null;

  function handleFilterChange(filter: HubFilter) {
    setActiveFilter(filter);
    setOpenedCollection(null);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
      <div className="max-w-3xl">
        <h1 className="text-[2.8rem] font-semibold leading-tight tracking-[-0.05em] text-white md:text-[3.4rem]">
          The Hub
        </h1>
        <p className="mt-5 text-lg text-[#a9b7c3]">
          Curated playbooks, learnings, and references
        </p>
      </div>

      <div className="mt-8 flex max-w-xl items-center gap-3 rounded-[24px] border border-white/10 bg-[#0d151b]/88 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.26)] backdrop-blur-xl">
        <span className="text-[#8aa0b2]">
          <SearchIcon />
        </span>
        <span className="flex-1 text-[15px] text-[#8aa0b2]">Search knowledge…</span>
        <span className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[#8aa0b2]">
          <KbdIcon />
          K
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["For You", "Deployment", "Sales", "CS", "Product", "Engineering"] as const).map((filter) => (
          <FilterPill
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onClick={() => handleFilterChange(filter)}
          />
        ))}
      </div>

      {activeFilter === "For You" && openedCollection === null ? (
        <div className="mt-8 rounded-[30px] border border-[#7bd0ff]/20 bg-[linear-gradient(135deg,rgba(123,97,255,0.08),rgba(70,212,255,0.08))] px-5 py-5 text-[#dbe9f4] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
          <p className="text-lg leading-8">
            Click <span className="font-medium text-white">Client Workflow Patterns</span> to open a built-out library path routing to a G-drive / SharePoint style data repository with a list of source data files
          </p>
        </div>
      ) : null}

      {openedCollection === "Client Workflow Patterns" ? (
        <section className="mt-8 rounded-[30px] border border-white/10 bg-[#0d151b]/88 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[#8aa0b2]">
                Hub &gt; For You &gt; Client Workflow Patterns
              </p>
              <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.04em] text-white">
                Client Workflow Patterns
              </h2>
              <p className="mt-2 text-base text-[#9fb0be]">
                SharePoint-style landing page showing account-specific subfolders and reference docs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpenedCollection(null)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#dbe8f4] transition hover:border-white/20 hover:bg-white/8 hover:text-white"
            >
              Back to library
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {workflowPatternItems
              .filter((item) => item.kind === "folder")
              .map((item) => (
                <div
                  key={item.name}
                  className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(123,97,255,0.24),rgba(70,212,255,0.18))] text-[#8ad2ff]">
                    <FolderIcon />
                  </span>
                  <p className="mt-4 text-lg font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-[#9fb0be]">{item.owner}</p>
                </div>
              ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-[24px] border border-white/10">
            <div className="grid grid-cols-[minmax(0,1.6fr)_180px_140px] gap-4 bg-white/5 px-5 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#8aa0b2]">
              <span>Name</span>
              <span>Last Opened</span>
              <span>Owner</span>
            </div>
            <div className="divide-y divide-white/10 bg-[#0a1116]">
              {workflowPatternItems.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-[minmax(0,1.6fr)_180px_140px] gap-4 px-5 py-4 text-sm text-[#e5edf5]"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[#8ad2ff]">
                      {item.kind === "folder" ? <FolderIcon /> : <FileIcon />}
                    </span>
                    <span>{item.name}</span>
                  </span>
                  <span className="text-[#9fb0be]">{item.lastOpened}</span>
                  <span className="text-[#dbe8f4]">{item.owner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-8 grid gap-4 pb-10 sm:grid-cols-2 xl:grid-cols-4">
          {collections.map((card) => {
            const isGuidedCard = card.title === guidedCollection;

            return (
              <button
                key={card.title}
                type="button"
                onClick={() => {
                  if (isGuidedCard) {
                    setOpenedCollection(card.title);
                  }
                }}
                className={`rounded-[28px] border px-5 py-5 text-left shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition ${
                  isGuidedCard
                    ? "border-[#7bd0ff]/40 bg-[linear-gradient(135deg,rgba(17,33,45,0.96),rgba(23,30,58,0.9))] ring-1 ring-[#7bd0ff]/20 hover:border-[#8ad2ff] hover:bg-[#13202a]"
                    : "border-white/10 bg-[#0d151b]/84 hover:border-[#7bd0ff]/25 hover:bg-[#101a22]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(123,97,255,0.2),rgba(70,212,255,0.14))] text-[#8ad2ff]">
                    <CollectionIcon icon={card.icon} />
                  </span>
                  {isGuidedCard ? (
                    <span className="rounded-full border border-[#7bd0ff]/30 bg-[#7bd0ff]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8ad2ff]">
                      Built Out
                    </span>
                  ) : null}
                </div>
                <p className="mt-5 text-[1.35rem] font-medium leading-8 text-white">{card.title}</p>
                <p className="mt-1 text-sm text-[#9fb0be]">{card.count}</p>
                <p className="mt-5 text-sm leading-6 text-[#7f95a7]">
                  {isGuidedCard ? "Open subfolders and example documents" : "Preview only in this prototype"}
                </p>
              </button>
            );
          })}
        </section>
      )}
    </div>
  );
}

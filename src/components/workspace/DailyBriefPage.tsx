import { useMemo, useState } from "react";
import type { Role } from "../../types";

type DailyBriefPageProps = {
  scope: "For You" | "Company-wide";
  activeRole: Role;
  onRoleSelect: (role: Role) => void;
};

type BriefCard = {
  title: string;
  updated: string;
  bullets: string[];
  icon: "cube" | "people" | "code" | "signals";
};

type EmailDraft = {
  recipient: string;
  subject: string;
  body: string[];
};

const briefsByRole: Record<Role, BriefCard[]> = {
  Deployment: [
    {
      title: "Onboarding Snapshot",
      updated: "Updated 2h ago",
      bullets: [
        "EY-Parthenon wants a tighter account overview before the next internal sync",
        "Deployment docs now lead with onboarding, workflow setup, and stakeholder handoff",
        "Three active accounts need clearer examples of how call outputs map into readouts",
      ],
      icon: "cube",
    },
    {
      title: "User Signals",
      updated: "Updated 3h ago",
      bullets: [
        "Maya Chen at Warburg Pincus is uploading calls but not reusing tagged retrieval",
        "Jonas Richter at EY-Parthenon still exports summaries before moving to parallel notes",
        "Priya Raman at Bain Capital dropped off after strong first-week management-meeting usage",
      ],
      icon: "people",
    },
    {
      title: "Feature Roll-out Watch",
      updated: "Updated 4h ago",
      bullets: [
        "Searchable call-library improvements are stable in internal demos",
        "Structured outputs remain the highest-value proof point for diligence teams",
        "Entity-tagging quality is the main caveat to mention in onboarding follow-ups",
      ],
      icon: "code",
    },
    {
      title: "Key Insights",
      updated: "Updated 6h ago",
      bullets: [
        "Deployment conversations are landing best when framed around account overview and workflow clarity",
        "Churn risk is more tied to weak habits than dissatisfaction with the product itself",
        "Management meetings remain the highest-engagement call type across active pilots",
      ],
      icon: "signals",
    },
  ],
  Sales: [
    {
      title: "Commercial Signals",
      updated: "Updated 2h ago",
      bullets: [
        "Bain Capital messaging is resonating when positioned around cumulative investment intelligence",
        "Feature roll-out questions are most common in late-stage client demo prep",
        "Talk tracks land better when they lead with diligence speed rather than transcription",
      ],
      icon: "cube",
    },
    {
      title: "Client Questions",
      updated: "Updated 3h ago",
      bullets: [
        "Prospects keep asking what is fully ready to show versus what is still monitored closely",
        "Private-markets buyers want proof that prior calls become reusable research assets",
        "The strongest demos still connect one live call to one follow-on investment workflow",
      ],
      icon: "people",
    },
    {
      title: "Product Signals",
      updated: "Updated 5h ago",
      bullets: [
        "Searchable call intelligence remains the cleanest feature to lead with in demos",
        "Structured outputs are the best bridge into IC prep and diligence memo workflows",
        "Entity quality should still be caveated when prospects ask about complex market maps",
      ],
      icon: "code",
    },
    {
      title: "Key Insights",
      updated: "Updated 6h ago",
      bullets: [
        "Feature roll-out status is now the most common follow-up after first demos",
        "Buyers respond best when Junior is framed as internal research infrastructure",
        "Bain Capital remains the strongest current reference for private-markets messaging",
      ],
      icon: "signals",
    },
  ],
  CS: [
    {
      title: "Adoption Check-in",
      updated: "Updated 2h ago",
      bullets: [
        "L.E.K. still needs a clearer playbook for turning uploads into daily retrieval habits",
        "Expansion signals are strongest where one client champion is sharing readouts internally",
        "Success outreach works best when tied to one live diligence workflow rather than generic training",
      ],
      icon: "cube",
    },
    {
      title: "Customer Signals",
      updated: "Updated 3h ago",
      bullets: [
        "Teams with weak tagging discipline plateau even when call uploads remain strong",
        "Usage dips are most recoverable when outreach includes a concrete workflow example",
        "Bain Capital is a strong expansion candidate if the next session proves research reuse",
      ],
      icon: "people",
    },
    {
      title: "Enablement Notes",
      updated: "Updated 5h ago",
      bullets: [
        "Readout templates are outperforming generic training decks in success sessions",
        "Clients want more examples of tagged search driving better follow-on work",
        "Proactive outreach converts better than passive office hours when usage is slipping",
      ],
      icon: "code",
    },
    {
      title: "Key Insights",
      updated: "Updated 6h ago",
      bullets: [
        "Customer success value is clearest when teams see one workflow improve immediately",
        "Account champions remain the biggest multiplier for expansion and retention",
        "Most at-risk users need workflow coaching more than feature education",
      ],
      icon: "signals",
    },
  ],
  Product: [
    {
      title: "Feature Status",
      updated: "Updated 2h ago",
      bullets: [
        "Searchable call-library improvements are tracking well against roadmap expectations",
        "Structured outputs remain the feature area with the clearest commercial pull",
        "Entity extraction quality is still the biggest blocker to a cleaner all-feature status update",
      ],
      icon: "cube",
    },
    {
      title: "User Feedback",
      updated: "Updated 3h ago",
      bullets: [
        "Internal teams want a cleaner summary of roadmap status across all core features",
        "Prospects ask for stronger clarity on what is generally demoable this week",
        "Feature naming matters less than explaining where each capability fits in the workflow",
      ],
      icon: "people",
    },
    {
      title: "Execution Notes",
      updated: "Updated 5h ago",
      bullets: [
        "Structured comparison workflows continue to outperform broad UI polish in field impact",
        "Roadmap communication needs to stay closer to feature readiness and caveats",
        "Internal teams are asking for a single view of status across all major capabilities",
      ],
      icon: "code",
    },
    {
      title: "Key Insights",
      updated: "Updated 6h ago",
      bullets: [
        "Product updates land best when they are mapped to concrete diligence workflows",
        "Roadmap status is now a repeat internal ask across Sales, Deployment, and CS",
        "The most valuable feature story is still how each call compounds future work",
      ],
      icon: "signals",
    },
  ],
  Engineering: [
    {
      title: "Engineering Notes",
      updated: "Updated 2h ago",
      bullets: [
        "The latest NER engine patch reduced diligence-readout misses on company and executive mentions",
        "Open PR comments are clustering around test coverage for extraction and retry logic",
        "Voice-intelligence infra remains stable across management meetings and diligence readouts",
      ],
      icon: "cube",
    },
    {
      title: "Runtime Signals",
      updated: "Updated 3h ago",
      bullets: [
        "Speaker attribution still needs close monitoring on longer meetings",
        "Export latency is improving, but structured outputs need more load testing",
        "Entity extraction regressions are surfacing fastest in messy multi-speaker transcripts",
      ],
      icon: "people",
    },
    {
      title: "Review Queue",
      updated: "Updated 5h ago",
      bullets: [
        "PR review feedback is focusing on integration coverage and failure-state messaging",
        "NER extraction reliability work is still the most visible engineering theme this week",
        "Runbook updates are helping non-engineering teams understand current caveats faster",
      ],
      icon: "code",
    },
    {
      title: "Key Insights",
      updated: "Updated 6h ago",
      bullets: [
        "The best engineering wins are still the ones that cut manual cleanup after live calls",
        "Reliability notes matter most when they can be translated into clear field caveats",
        "Test coverage on bug-fix work remains a recurring theme in open reviews",
      ],
      icon: "signals",
    },
  ],
};

const companyWideBriefs: BriefCard[] = [
  {
    title: "Business-wide Updates",
    updated: "Updated 2h ago",
    bullets: [
      "GTM teams are standardising the Junior story around diligence speed and reusable knowledge",
      "Product is concentrating on Alexandria retrieval, metadata quality, and exportable outputs",
      "Private-markets demand is strongest where call capture and investment research overlap",
    ],
    icon: "cube",
  },
  {
    title: "Cross-functional Risks",
    updated: "Updated 4h ago",
    bullets: [
      "Inconsistent call tagging is still weakening search trust on a few live accounts",
      "Engineering and Deployment teams need a tighter handoff on extraction caveats",
      "Old demo storylines still underplay Alexandria's role in cumulative knowledge capture",
    ],
    icon: "people",
  },
  {
    title: "Engineering Notes",
    updated: "Updated 5h ago",
    bullets: [
      "Voice intelligence reliability fixes shipped and are now under watch",
      "Call-type routing runbooks are documented for Engineering and Deployment",
      "Extraction QA is focused on deals, companies, markets, and people coverage",
    ],
    icon: "code",
  },
];

const quickActionsByRole: Record<Role, string[]> = {
  Deployment: [
    "Draft my onboarding summary",
    "Who is at churn risk?",
    "Top deployment risks to watch",
  ],
  Sales: [
    "Summarise feature roll-out status",
    "Prep a client talk track",
    "Top commercial risks to watch",
  ],
  CS: [
    "Draft proactive outreach",
    "Who needs enablement support?",
    "Top adoption risks to watch",
  ],
  Product: [
    "Summarise roadmap status",
    "What user feedback needs action?",
    "Top product risks to watch",
  ],
  Engineering: [
    "Summarise open PR comments",
    "What changed in the latest fix?",
    "Top engineering risks to watch",
  ],
};

const deploymentEmailDraft: EmailDraft = {
  recipient: "@EY-Parthenon",
  subject: "Onboarding brief for the EY-Parthenon account",
  body: [
    "Drafting a quick account brief ahead of the next EY-Parthenon sync.",
    "The account is centred on commercial due diligence teams using Junior to capture expert calls, management meetings, and readouts in one searchable workflow.",
    "Key focus for onboarding this week: tighten the account overview, reinforce the call-tagging taxonomy, and show how one captured meeting turns into reusable evidence for the full case team.",
    "Current watchouts: a few users still export summaries into parallel notes, and the team wants clearer examples of how tagged retrieval supports readout prep.",
    "Recommended next steps: lead with one live case example, confirm stakeholders for the deployment handoff, and align on what success looks like in the first two workstreams.",
  ],
};

function BriefIcon({ icon }: { icon: BriefCard["icon"] }) {
  const className = "h-7 w-7";

  switch (icon) {
    case "cube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="m12 3 8 4.5v9L12 21 4 16.5v-9L12 3Z" />
          <path d="M12 21V12M20 7.5l-8 4.5L4 7.5" />
        </svg>
      );
    case "people":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="9" cy="8" r="2.75" />
          <circle cx="16.5" cy="9.5" r="2.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18a4.5 4.5 0 0 1 9 0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 18a3.75 3.75 0 0 1 6.75 0" />
        </svg>
      );
    case "code":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 8-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      );
    case "signals":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" d="M4 19h16M7 15l3-3 3 2 5-6" />
          <path strokeLinecap="round" d="M17 8h3v3" />
        </svg>
      );
    default:
      return null;
  }
}

function OutlookIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="outlook-a" x1="11" y1="10" x2="56" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64D8FF" />
          <stop offset="0.52" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
        <linearGradient id="outlook-b" x1="4" y1="22" x2="29" y2="47" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1EAFFF" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path d="M20 9.5A6 6 0 0 1 26 8h21.3a6 6 0 0 1 4.2 1.7l7 6.8A6 6 0 0 1 60.3 21v21.6a6 6 0 0 1-1.8 4.3L48 57.4A6 6 0 0 1 43.8 59H26a6 6 0 0 1-6-6V9.5Z" fill="url(#outlook-a)" />
      <path d="M17 16.8 50.8 8 60 17.3v29.5L41.7 56 17 39.4V16.8Z" fill="url(#outlook-a)" opacity="0.92" />
      <rect x="4" y="20" width="28" height="28" rx="8" fill="url(#outlook-b)" />
      <circle cx="18" cy="34" r="8.2" stroke="white" strokeWidth="4.2" />
    </svg>
  );
}

function RoleFilterPill({
  role,
  active,
  onClick,
}: {
  role: Role;
  active: boolean;
  onClick: () => void;
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
      {role}
    </button>
  );
}

export function DailyBriefPage({
  scope,
  activeRole,
  onRoleSelect,
}: DailyBriefPageProps) {
  const [openedAction, setOpenedAction] = useState<string | null>(null);

  const briefs = useMemo(
    () => (scope === "For You" ? briefsByRole[activeRole] : companyWideBriefs),
    [activeRole, scope],
  );
  const quickActions = quickActionsByRole[activeRole];
  const showDraftGuide = activeRole === "Deployment";

  function handleRoleSelect(role: Role) {
    onRoleSelect(role);
    setOpenedAction(null);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
      <div className="max-w-4xl">
        <h1 className="text-[2.8rem] font-semibold leading-tight tracking-[-0.05em] text-white md:text-[3.4rem]">
          Daily Brief
        </h1>
        <p className="mt-5 text-lg text-[#a9b7c3]">
          Your curated briefing on all things Junior
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["Deployment", "Sales", "CS", "Product", "Engineering"] as const).map((role) => (
          <RoleFilterPill
            key={role}
            role={role}
            active={activeRole === role}
            onClick={() => handleRoleSelect(role)}
          />
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {briefs.map((brief) => (
          <button
            key={brief.title}
            type="button"
            className="w-full rounded-[30px] border border-white/10 bg-[#0d151b]/84 px-5 py-5 text-left shadow-[0_20px_55px_rgba(0,0,0,0.24)] transition hover:border-[#7bd0ff]/20 hover:bg-[#101a22] sm:px-7"
          >
            <div className="flex items-start gap-5">
              <span className="mt-1 flex h-20 w-20 flex-none items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,rgba(123,97,255,0.2),rgba(70,212,255,0.14))] text-[#8ad2ff]">
                <BriefIcon icon={brief.icon} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[1.7rem] font-medium leading-tight text-white">
                      {brief.title}
                    </h2>
                  </div>
                  <span className="mt-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[#8ea2b2]">
                    {brief.updated}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-[18px] leading-8 text-[#e5edf5]">
                  {brief.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-[0.8rem] h-1.5 w-1.5 flex-none rounded-full bg-[#7bd0ff]" />
                      <span className="flex-1">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-[#0d151b]/84 px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-3 text-sm font-medium text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(123,97,255,0.2),rgba(70,212,255,0.14))] text-[#8ad2ff]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m13 2-6 10h5l-1 10 6-10h-5l1-10Z" />
              </svg>
            </span>
            Quick actions
          </span>
          <div className="flex flex-1 flex-wrap gap-3">
            {quickActions.map((action) => {
              const isGuidedAction = showDraftGuide && action === "Draft my onboarding summary";

              return (
                <button
                  key={action}
                  type="button"
                  onClick={() => setOpenedAction(action)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                    isGuidedAction
                      ? "border-[#7bd0ff]/40 bg-[linear-gradient(135deg,rgba(82,157,255,0.22),rgba(69,212,255,0.16))] text-white shadow-[0_10px_30px_rgba(70,212,255,0.12)]"
                      : "border-white/10 bg-white/5 text-[#d8e2eb] hover:border-[#7bd0ff]/25 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {action}
                </button>
              );
            })}
          </div>
        </div>

        {showDraftGuide ? (
          <p className="mt-4 text-sm leading-7 text-[#9fb0be]">
            Click <span className="font-medium text-white">Draft my onboarding summary</span>
          </p>
        ) : null}
      </div>

      {openedAction === "Draft my onboarding summary" && activeRole === "Deployment" ? (
        <section className="mt-6 overflow-hidden rounded-[26px] border border-[#d8dbe1] bg-[#f6f7f9] shadow-[0_22px_60px_rgba(0,0,0,0.22)]">
          <div className="flex items-center gap-8 border-b border-[#dadce0] bg-[#fbfbfc] px-6 py-3 text-[15px] text-[#4b4f56]">
            <span>File</span>
            <span className="border-b-2 border-[#2563eb] pb-1 font-medium text-[#23262d]">Message</span>
            <span>Insert</span>
            <span>Format text</span>
            <span>Draw</span>
            <span>Options</span>
          </div>

          <div className="border-b border-[#dadce0] bg-white px-4 py-3">
            <div className="flex items-center gap-3 rounded-[14px] border border-[#dbdde2] px-4 py-2 shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[6px] bg-[#0f6cbd] px-4 py-2 text-sm font-medium text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4 20 12 4 20l3.6-8L4 4Z" />
                </svg>
                Send
              </button>
              <span className="h-8 w-px bg-[#e5e7eb]" />
              <span className="h-8 w-8 rounded-[6px] bg-[#f3f4f6]" />
              <span className="h-8 w-20 rounded-[6px] bg-[#f3f4f6]" />
              <span className="h-8 w-14 rounded-[6px] bg-[#f3f4f6]" />
              <span className="ml-auto flex items-center gap-3">
                <span className="text-[#0f6cbd]">
                  <OutlookIcon />
                </span>
                <span className="h-6 w-px bg-[#e5e7eb]" />
                <span className="h-5 w-5 rounded-full border border-[#cfd4dc]" />
              </span>
            </div>
          </div>

          <div className="bg-white">
            <div className="flex items-center justify-between gap-4 border-b border-[#e1e3e8] px-5 py-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpenedAction(null)}
                  className="rounded-[8px] border border-[#d5d9e0] bg-white px-3 py-1.5 text-sm text-[#4a4f57]"
                >
                  x
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-[6px] bg-[#0f6cbd] px-4 py-2 text-sm font-medium text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4 20 12 4 20l3.6-8L4 4Z" />
                  </svg>
                  Send
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5f646d]">
                <span className="h-5 w-5 rounded-full border border-[#9ca3af]" />
                <span>General</span>
              </div>
            </div>

            <div className="px-5 py-4 text-[#1f2328]">
              <div className="grid grid-cols-[60px_minmax(0,1fr)_46px] items-center gap-3 border-b border-[#dfe3e8] py-3 text-[15px]">
                <span className="rounded-[6px] border border-[#d9dde3] bg-[#f7f7f8] px-2.5 py-1.5 text-center text-[#30343b]">To</span>
                <span>{deploymentEmailDraft.recipient}</span>
                <span className="text-right text-[#6b7280]">Bcc</span>
              </div>
              <div className="grid grid-cols-[60px_minmax(0,1fr)] items-center gap-3 border-b border-[#dfe3e8] py-3 text-[15px]">
                <span className="rounded-[6px] border border-[#d9dde3] bg-[#f7f7f8] px-2.5 py-1.5 text-center text-[#30343b]">Cc</span>
                <span />
              </div>
              <div className="border-b border-[#dfe3e8] py-4 text-[15px] text-[#30343b]">
                {deploymentEmailDraft.subject}
              </div>
              <div className="min-h-[360px] pt-6 text-[15px] leading-8 text-[#1f2328]">
                {deploymentEmailDraft.body.map((paragraph) => (
                  <p key={paragraph} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

import type { DemoResponse, PromptDefinition, Role } from "./types";

export const roles: Role[] = ["Deployment", "Sales", "CS", "Product", "Engineering"];

const responses: Record<string, DemoResponse> = {
  "ey-parthenon-onboarding": {
    role: "Deployment",
    prompt: "What should I know about the EY-Parthenon account?",
    answer: [
      {
        kind: "paragraph",
        text: "Start with EY-Parthenon's commercial due diligence workflow. The team is using Junior to turn expert interviews, management meetings, and diligence readouts into searchable deal knowledge, so your first job is making sure every call can be captured, structured, and reused across the case team.",
        sources: [
          {
            label: "Notion · EY-Parthenon account brief",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Quick onboarding summary:",
        headers: ["Area", "What matters", "Lead with", "Watchout"],
        rows: [
          [
            "Primary use case",
            "Commercial DD teams need faster synthesis across interviews, market calls, and readouts",
            "A single place to search prior calls by deal, sector, and attendee",
            "Do not frame Junior as just another transcript store",
          ],
          [
            "Power features",
            "Automated call analysis, key takeaways, entity extraction, and exportable quant tables",
            "Show how one management meeting becomes reusable evidence for the whole team",
            "Use a clean diligence demo dataset with named entities already tagged",
          ],
          [
            "Pilot success metric",
            "Time saved in first-draft case team synthesis and IC prep",
            "Measure how quickly consultants can pull prior insights into the next readout",
            "Avoid broad ROI claims before the first two workstreams are live",
          ],
          [
            "Change management",
            "Partners want confidence, while associates want speed and searchability",
            "Anchor on fewer missed insights and less note hunting across workstreams",
            "If the taxonomy is loose, search quality will feel worse than the product is",
          ],
        ],
        sources: [
          {
            label: "Junior onboarding collateral",
            url: "#",
            provider: "junior",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Before the call, review the account's active diligence pipeline, the approved onboarding story, and the call-tagging taxonomy for deals, companies, markets, and people. The fastest way to lose trust is showing beautiful summaries without a clear explanation of where the evidence came from or how consultants will retrieve it later.",
        sources: [
          {
            label: "Slack #deployment-eyp",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
    ],
    attachments: [
      {
        name: "EY-Parthenon - Onboarding Brief.pdf",
        type: "document",
        description: "Stakeholders, use cases, and deployment priorities for the current diligence pod.",
      },
      {
        name: "Onboarding Story - Commercial DD.pptx",
        type: "presentation",
        description: "Approved walkthrough covering call capture, search, summaries, and structured outputs.",
      },
      {
        name: "Call Tagging Taxonomy - Deals Companies Markets People.xlsx",
        type: "spreadsheet",
        description: "Reference taxonomy used to keep search and entity extraction consistent across workstreams.",
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
  "deployment-churn": {
    role: "Deployment",
    prompt: "Which users are showing churn risk this week, and how should I respond?",
    answer: [
      {
        kind: "paragraph",
        text: "Three users are showing churn risk this week. The pattern is consistent: usage started well, then dropped when teams stopped routing their diligence workflow through Junior. The most useful response is user-specific coaching rather than a generic account check-in.",
        sources: [
          {
            label: "Notion · Weekly user health review",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Users with churn risk and recommended response:",
        headers: ["User", "Account", "Tags", "Churn signal", "Recommended response"],
        rows: [
          [
            "Maya Chen",
            "Warburg Pincus",
            "Associate, healthcare DD, low retrieval reuse",
            "Uploaded six calls in two weeks but has not returned to search or compare prior evidence",
            "Send a workflow clip on tagged retrieval and offer a 20-minute working session using her live case",
          ],
          [
            "Jonas Richter",
            "EY-Parthenon",
            "Manager, readout owner, parallel notes habit",
            "Still exporting summaries but keeping final readout notes outside Junior",
            "Share a readout template that maps call takeaways directly into the team update structure",
          ],
          [
            "Priya Raman",
            "Bain Capital",
            "Investor, private markets research, sporadic weekly usage",
            "Strong first-week engagement followed by drop-off after one management meeting sprint",
            "Reconnect with a proof-of-value example showing how prior calls feed new investment work",
          ],
        ],
        sources: [
          {
            label: "Junior usage tags export",
            url: "#",
            provider: "junior",
          },
        ],
      },
      {
        kind: "followUp",
        text: "Would you like me to draft churn-response outreach for Maya, Jonas, and Priya?",
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
  "feature-rollout-status": {
    role: "Sales",
    prompt: "What's the update status on Alexandria this week?",
    answer: [
      {
        kind: "paragraph",
        text: "Alexandria is in a strong demoable state this week. Searchable retrieval, call-level summaries, and tagged outputs are stable enough to show confidently, while the main caveat remains consistency on metadata quality and entity extraction in messier call sets.",
        sources: [
          {
            label: "Notion · Alexandria weekly update",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Alexandria update status this week:",
        headers: ["Area", "Status", "What changed", "How to position it"],
        rows: [
          [
            "Searchable call library",
            "Ready to demo",
            "Search by deal, sector, and attendee is performing well in current internal datasets",
            "Lead with faster retrieval of prior diligence evidence",
          ],
          [
            "Automated summaries and takeaways",
            "Ready with caveats",
            "Summary structure is more reliable, but some long multi-speaker calls still need cleanup",
            "Position it as first-draft acceleration, not fully hands-off output",
          ],
          [
            "Tagged outputs and structured exports",
            "Monitored rollout",
            "Exports are improving, especially for recurring metrics and cross-call comparisons",
            "Frame it as high-value for diligence synthesis with light analyst review",
          ],
        ],
        sources: [
          {
            label: "Slack #sales-demos",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Best practice: if a client asks about Alexandria specifically, explain what is ready to show today, what still benefits from analyst review, and why the workflow is already valuable even before every edge case is fully polished.",
        sources: [
          {
            label: "Junior demo guidance",
            url: "#",
            provider: "junior",
          },
        ],
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
  "bain-capital-talk-track": {
    role: "Sales",
    prompt: "What's the talk track for Bain Capital?",
    answer: [
      {
        kind: "paragraph",
        text: "For Bain Capital, lead with Junior as infrastructure for private-markets research and due diligence. Their likely bar is not just faster note-taking; it is whether the product helps investment teams capture proprietary call intelligence, surface comparable evidence quickly, and move from calls to investment conviction with less manual synthesis.",
        sources: [
          {
            label: "Notion · Bain Capital account brief",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Junior features most relevant to Bain Capital:",
        headers: ["Need", "Junior feature", "Why it fits", "How to position it"],
        rows: [
          [
            "Faster deal-team synthesis",
            "Automated call analysis with key takeaways and call summaries",
            "Turns live conversations into an immediate first draft for diligence teams",
            "Lead with reduced turnaround time from call to internal readout",
          ],
          [
            "Institutional memory across investments",
            "Alexandria library with search by deal, sector, and attendees",
            "Lets investors reuse knowledge from past calls instead of starting from zero",
            "Frame it as cumulative edge in private markets research",
          ],
          [
            "Better pattern recognition",
            "Every data point captured through tagged entities and exportable tables",
            "Enables cross-call comparison of themes, metrics, and management commentary",
            "Show how analysts can aggregate signal, not just read transcripts",
          ],
          [
            "Evidence-backed investment materials",
            "Sourceable transcripts and structured outputs",
            "Supports IC prep and diligence memos with traceable evidence",
            "Stress auditability and confidence, especially for partner review",
          ],
        ],
        sources: [
          {
            label: "Slack #private-markets-messaging",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Suggested close: 'Junior helps your team turn every call into reusable investment intelligence. Instead of losing insight in scattered notes, you build a searchable research asset that compounds across deals, sectors, and portfolio work.'",
        sources: [
          {
            label: "Junior sales prep notes",
            url: "#",
            provider: "junior",
          },
        ],
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
  "cs-touchpoints": {
    role: "CS",
    prompt: "Which accounts need proactive customer success outreach this week?",
    answer: [
      {
        kind: "paragraph",
        text: "Two consulting accounts and one PE account would benefit from a proactive CS touchpoint this week. The common pattern is not dissatisfaction; it is teams expanding usage faster than their habits and taxonomy are keeping up.",
        sources: [
          {
            label: "CS weekly signal review",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Recommended outreach list:",
        headers: ["Account", "Signal", "Touchpoint goal", "Suggested message"],
        rows: [
          [
            "L.E.K. Consulting",
            "Search usage is flat while uploads are rising",
            "Coach the team on getting more value from Alexandria retrieval",
            "Offer a 20-minute workflow refresher built around live diligence calls",
          ],
          [
            "EY-Parthenon",
            "Senior sponsors are engaged, junior users still work in parallel tools",
            "Increase weekly active usage among associate-heavy workstreams",
            "Share a 'calls to readout' playbook with one concrete case example",
          ],
          [
            "Bain Capital",
            "High curiosity around reusable investment research",
            "Translate pilot activity into a clear expansion path",
            "Propose a session on portfolio, diligence, and screening use cases",
          ],
        ],
        sources: [
          {
            label: "Slack #cs-weekly-review",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
      {
        kind: "followUp",
        text: "Would you like me to draft the outreach note for L.E.K. Consulting?",
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
  "lek-adoption": {
    role: "CS",
    prompt: "How should I drive Alexandria adoption with L.E.K. Consulting?",
    answer: [
      {
        kind: "paragraph",
        text: "Treat L.E.K. as an enablement problem, not a product problem. The team already sees value in captured calls; what they need is a tighter habit loop from upload to retrieval so Alexandria becomes the default place to find prior diligence knowledge.",
        sources: [
          {
            label: "L.E.K. success plan",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Adoption plan for the next two weeks:",
        headers: ["Step", "Why it matters", "Owner", "Success signal"],
        rows: [
          [
            "Run a live search clinic",
            "Users need to see how to retrieve by deal, sector, and attendee",
            "CS",
            "At least three active case teams repeat the workflow on their own",
          ],
          [
            "Standardise tags on incoming calls",
            "Search quality only compounds when metadata is consistent",
            "Client champion + CS",
            "90% of new calls tagged to the agreed taxonomy",
          ],
          [
            "Publish one sample readout sourced from Alexandria",
            "Creates social proof inside the account",
            "Client champion",
            "Partners ask for Alexandria in the next internal readout cycle",
          ],
        ],
        sources: [
          {
            label: "Junior enablement pack",
            url: "#",
            provider: "junior",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "The message to the client should be simple: Alexandria is most valuable when it is the first stop after every call and the first stop before every new workstream. If teams keep using it only as an archive, adoption will plateau.",
        sources: [
          {
            label: "Slack #cs-playbooks",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
  "alexandria-feedback": {
    role: "Product",
    prompt: "What user feedback should I prioritise for Alexandria this week?",
    answer: [
      {
        kind: "paragraph",
        text: "Prioritise the user feedback that affects whether Alexandria feels like a true institutional memory product: search precision, structured metadata quality, and clarity of what is extracted automatically versus what still needs user cleanup.",
        sources: [
          {
            label: "Notion · Alexandria user feedback round-up",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Highest-priority product themes this week:",
        headers: ["Theme", "Why users care", "Current pain", "Recommended product response"],
        rows: [
          [
            "Search by deal, sector, and attendee",
            "This is the fastest route back to prior insight during live diligence",
            "Inconsistent tagging weakens search confidence",
            "Tighten required metadata and improve empty-state guidance",
          ],
          [
            "Every data point captured",
            "Users want recurring metrics and claims surfaced, not buried in transcripts",
            "Tables feel powerful when complete and unreliable when sparse",
            "Improve extraction QA and communicate confidence more clearly",
          ],
          [
            "Entity coverage across deals, companies, markets, and people",
            "Consultants need high-confidence tagging on the entities that matter most",
            "Missed entities make Alexandria feel generic instead of finance-native",
            "Focus NER tuning on investor and advisor vocabularies",
          ],
        ],
        sources: [
          {
            label: "Slack #product-alexandria",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "If you can only ship one product narrative improvement this week, make it obvious how Alexandria compounds knowledge over time. That is the differentiator clients remember far more than any single summarisation feature.",
        sources: [
          {
            label: "Linear PROD-2318",
            url: "https://linear.app",
            provider: "linear",
          },
        ],
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
  "diligence-roadmap": {
    role: "Product",
    prompt: "What's the status against the roadmap across all core features?",
    answer: [
      {
        kind: "paragraph",
        text: "Roadmap status is healthiest where the feature directly strengthens the path from live call to reusable diligence knowledge. The clearest asks from internal teams are one compact status update across search, summaries, structured outputs, entity quality, and controls.",
        sources: [
          {
            label: "Notion · roadmap overview",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "table",
        caption: "Current roadmap status across core features:",
        headers: ["Feature", "Status", "Progress", "Current note"],
        rows: [
          [
            "Automated call analysis",
            "On track",
            "82%",
            "Summary quality and sectioning are stable enough for most live internal demos",
          ],
          [
            "NER engine",
            "At risk",
            "63%",
            "Entity quality is improving, but readout accuracy still slips on dense multi-company transcripts",
          ],
          [
            "Alexandria",
            "On track",
            "76%",
            "Search, retrieval, and library indexing are strong, with metadata consistency still under watch",
          ],
        ],
        sources: [
          {
            label: "Linear ROAD-118",
            url: "https://linear.app",
            provider: "linear",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Recommendation: keep internal roadmap updates centered on feature status, caveats, and field relevance. Teams are asking for a single answer to 'what is ready, what is close, and what still needs work?'",
        sources: [
          {
            label: "Slack #product-leads",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
  "voice-intelligence-release": {
    role: "Engineering",
    prompt: "What changed in the latest NER engine bug patch affecting diligence readouts?",
    answer: [
      {
        kind: "paragraph",
        text: "The latest NER engine bug patch focused on a readout-quality issue where company, buyer, and management references were being merged incorrectly in diligence readouts. The patch improves how Junior separates entities before the readout is generated, which should reduce misleading summary lines in company-heavy projects.",
        sources: [
          {
            label: "Linear ENG-2431",
            url: "https://linear.app",
            provider: "linear",
          },
        ],
      },
      {
        kind: "table",
        caption: "What changed in the NER patch:",
        headers: ["Area", "Improvement", "Expected effect"],
        rows: [
          [
            "Entity separation",
            "Buyer, target, and advisor mentions are resolved more cleanly when names are repeated across the transcript",
            "Diligence readouts should contain fewer blended or duplicated company references",
          ],
          [
            "Readout summaries",
            "Entity handoff from extraction to readout generation is less likely to collapse multiple actors into one line",
            "Management commentary and expert-call takeaways should read more accurately in exported summaries",
          ],
          [
            "Confidence filtering",
            "Low-confidence entity matches are less likely to be surfaced directly in the final readout",
            "Internal teams should spend less time manually correcting obvious NER mistakes before sharing notes",
          ],
        ],
        sources: [
          {
            label: "Notion · engineering release notes",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Engineering should still monitor false merges, missed entities, and how often Deployment teams manually edit diligence readouts after generation. If manual cleanup remains high, the patch improved edge cases without fixing the core NER trust gap.",
        sources: [
          {
            label: "Slack #ner-engine",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
  "pipeline-priorities": {
    role: "Engineering",
    prompt: "Summarise the open review comments on my PRs",
    answer: [
      {
        kind: "paragraph",
        text: "You have four PRs with open review comments across automated call analysis and the conversational library. Two need action before merge, one is waiting on reviewer sign-off, and one is blocked on a shared dependency.",
        sources: [
          {
            label: "Linear ENG sprint view",
            url: "https://linear.app",
            provider: "linear",
          },
        ],
      },
      {
        kind: "table",
        caption: "Open PR review summary:",
        headers: ["PR", "Status", "Action needed", "Deadline"],
        rows: [
          [
            "LIB-2241 · Index freshness tuning",
            "Changes requested",
            "Add regression coverage for delayed post-upload search visibility",
            "25 Jun 2026",
          ],
          [
            "ACA-2234 · Automated summary sectioning",
            "Approved with nits",
            "Tighten naming around summary sections and edge-case labels",
            "24 Jun 2026",
          ],
          [
            "PLAT-947 · Metadata mapping cleanup",
            "Waiting on review",
            "Ping platform reviewer for approval on shared metadata normalization rules",
            "26 Jun 2026",
          ],
          [
            "LIB-2219 · Duplicate record suppression",
            "Blocked",
            "Unblock after shared indexing helper lands",
            "27 Jun 2026",
          ],
        ],
        sources: [
          {
            label: "Notion · review roundup",
            url: "https://notion.so",
            provider: "notion",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Main theme in the review queue: engineers want more proof that Junior's outputs stay stable after processing edge cases, especially when indexing and summary generation interact.",
        sources: [
          {
            label: "Slack #eng-reviews",
            url: "https://slack.com",
            provider: "slack",
          },
        ],
      },
      {
        kind: "followUp",
        text: "Would you like me to draft replies to the outstanding review comments on LIB-2241 and ACA-2234?",
      },
    ],
    lastUpdated: "23 Jun 2026",
  },
};

export const promptsByRole: Record<Role, PromptDefinition[]> = {
  Deployment: [
    {
      role: "Deployment",
      text: "Users showing churn risk this week",
      query: "Which users are showing churn risk this week, and how should I respond?",
      responseId: "deployment-churn",
      icon: "chart-down",
    },
    {
      role: "Deployment",
      text: "EY-Parthenon account overview",
      query: "What should I know about the EY-Parthenon account?",
      responseId: "ey-parthenon-onboarding",
      icon: "team",
    },
  ],
  Sales: [
    {
      role: "Sales",
      text: "Alexandria update status",
      query: "What's the update status on Alexandria this week?",
      responseId: "feature-rollout-status",
      icon: "presentation",
    },
    {
      role: "Sales",
      text: "Talk track for Bain Capital",
      query: "What's the talk track for Bain Capital?",
      responseId: "bain-capital-talk-track",
      icon: "building",
    },
  ],
  CS: [
    {
      role: "CS",
      text: "Accounts needing proactive outreach",
      query: "Which accounts need proactive customer success outreach this week?",
      responseId: "cs-touchpoints",
      icon: "team",
    },
    {
      role: "CS",
      text: "L.E.K. adoption plan",
      query: "How should I drive Alexandria adoption with L.E.K. Consulting?",
      responseId: "lek-adoption",
      icon: "chart-down",
    },
  ],
  Product: [
    {
      role: "Product",
      text: "Alexandria user feedback priorities",
      query: "What user feedback should I prioritise for Alexandria this week?",
      responseId: "alexandria-feedback",
      icon: "inbox",
    },
    {
      role: "Product",
      text: "Roadmap status across all features",
      query: "What's the status against the roadmap across all core features?",
      responseId: "diligence-roadmap",
      icon: "roadmap",
    },
  ],
  Engineering: [
    {
      role: "Engineering",
      text: "NER engine bug patch for readouts",
      query: "What changed in the latest NER engine bug patch affecting diligence readouts?",
      responseId: "voice-intelligence-release",
      icon: "bug",
    },
    {
      role: "Engineering",
      text: "Open PR review comments",
      query: "Summarise the open review comments on my PRs",
      responseId: "pipeline-priorities",
      icon: "code-review",
    },
  ],
};

const queryToResponseId = Object.values(promptsByRole)
  .flat()
  .reduce<Record<string, string>>((lookup, prompt) => {
    lookup[prompt.query.toLowerCase()] = prompt.responseId;
    return lookup;
  }, {});

const fallbackResponse: DemoResponse = {
  role: "Deployment",
  prompt: "",
  answer: [
    {
      kind: "paragraph",
      text: "This prototype supports two hardcoded prompts per role across Deployment, Sales, CS, Product, and Engineering.",
      sources: [
        {
          label: "Junior prototype notes",
          url: "#",
          provider: "junior",
        },
      ],
    },
    {
      kind: "paragraph",
      text: "Try one of the suggested prompts for your current role, or ask about EY-Parthenon account overview, churn-risk users, Alexandria update status, Bain Capital talk tracks, proactive outreach, roadmap status, or the latest NER engine bug patch.",
      sources: [
        {
          label: "Junior agent notes",
          url: "#",
          provider: "junior",
        },
      ],
    },
  ],
  lastUpdated: "23 Jun 2026",
};

const keywordMatchers: Array<{ match: (input: string) => boolean; responseId: string }> = [
  { match: (input) => input.includes("ey-parthenon") || input.includes("ey parthenon"), responseId: "ey-parthenon-onboarding" },
  { match: (input) => input.includes("churn risk") || input.includes("user churn") || input.includes("showing churn"), responseId: "deployment-churn" },
  { match: (input) => input.includes("alexandria update") || (input.includes("alexandria") && input.includes("status")) || input.includes("feature roll-out"), responseId: "feature-rollout-status" },
  { match: (input) => input.includes("bain capital") || input.includes("talk track"), responseId: "bain-capital-talk-track" },
  { match: (input) => input.includes("proactive outreach") || input.includes("customer success outreach") || input.includes("success touchpoint"), responseId: "cs-touchpoints" },
  { match: (input) => input.includes("l.e.k.") || input.includes("lek") || input.includes("adoption"), responseId: "lek-adoption" },
  { match: (input) => input.includes("alexandria") && input.includes("feedback"), responseId: "alexandria-feedback" },
  { match: (input) => input.includes("alexandria") && input.includes("user feedback"), responseId: "alexandria-feedback" },
  { match: (input) => input.includes("roadmap") || input.includes("core features"), responseId: "diligence-roadmap" },
  { match: (input) => input.includes("ner engine") || input.includes("diligence readouts") || input.includes("readout patch"), responseId: "voice-intelligence-release" },
  { match: (input) => input.includes("pr review") || input.includes("review comments") || input.includes("my prs"), responseId: "pipeline-priorities" },
];

export function getResponseForInput(input: string): DemoResponse {
  const normalized = input.trim().toLowerCase();
  const exactId = queryToResponseId[normalized];
  if (exactId) {
    return responses[exactId];
  }

  const keywordId = keywordMatchers.find((entry) => entry.match(normalized))?.responseId;
  if (keywordId) {
    return responses[keywordId];
  }

  return fallbackResponse;
}

import { useEffect, useRef, useState } from "react";
import { ResponseCard } from "./components/ResponseCard";
import { RoleChips } from "./components/RoleChips";
import { Sidebar } from "./components/Sidebar";
import { SuggestedPromptPill } from "./components/SuggestedPromptPill";
import { TypingIndicator } from "./components/TypingIndicator";
import { DailyBriefPage } from "./components/workspace/DailyBriefPage";
import { KnowledgeHubPage } from "./components/workspace/KnowledgeHubPage";
import { getResponseForInput, promptsByRole, roles } from "./data";
import type { Message, PromptDefinition, Role, WorkspaceTab } from "./types";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  }
  if (hour < 18) {
    return "Good afternoon";
  }
  return "Good evening";
}

function formatToday() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

const initialInputMessage = "This prototype is illustrative. Choose a sample prompt below to explore a response.";
const followUpInputMessage = "Ask a follow up question or something else";

function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceTab>("Agent");
  const [activeRole, setActiveRole] = useState<Role>("Deployment");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingTimeoutId, setPendingTimeoutId] = useState<number | null>(null);
  const chatViewportRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = promptsByRole[activeRole];
  const hasConversation = messages.length > 0 || isTyping;
  const activeAgentLabel = "Ops Agent";
  const formattedDate = formatToday();
  const inputMessage = hasConversation ? followUpInputMessage : initialInputMessage;

  useEffect(() => {
    return () => {
      if (pendingTimeoutId) {
        window.clearTimeout(pendingTimeoutId);
      }
    };
  }, [pendingTimeoutId]);

  useEffect(() => {
    chatViewportRef.current?.scrollTo({
      top: chatViewportRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  function resetConversation(nextRole: Role) {
    if (pendingTimeoutId) {
      window.clearTimeout(pendingTimeoutId);
      setPendingTimeoutId(null);
    }

    setActiveRole(nextRole);
    setMessages([]);
    setIsTyping(false);
  }

  function handleWorkspaceSelect(nextWorkspace: WorkspaceTab) {
    setActiveWorkspace(nextWorkspace);

    if (nextWorkspace === "Daily Brief") {
      setActiveRole("Deployment");
    }
  }

  function queueResponse(question: string, role: Role, showSources = false) {
    if (pendingTimeoutId) {
      window.clearTimeout(pendingTimeoutId);
      setPendingTimeoutId(null);
    }

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }

    const response = getResponseForInput(trimmedQuestion);

    setActiveRole(role);
    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        type: "user",
        content: trimmedQuestion,
      },
    ]);
    setIsTyping(true);

    const delay = 700 + Math.floor(Math.random() * 501);
    const timeoutId = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          type: "assistant",
          content: response.answer,
          attachments: response.attachments,
          lastUpdated: response.lastUpdated,
          showSources,
        },
      ]);
      setIsTyping(false);
      setPendingTimeoutId(null);
    }, delay);

    setPendingTimeoutId(timeoutId);
  }

  function handlePromptClick(prompt: PromptDefinition) {
    queueResponse(prompt.query, prompt.role, true);
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-[#f4f7fb]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(164,209,255,0.14),transparent_28%),radial-gradient(circle_at_18%_24%,rgba(102,87,255,0.12),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(69,212,255,0.14),transparent_22%)]" />
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_50%_0%,rgba(187,210,255,0.18),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <Sidebar activeItem={activeWorkspace} onSelect={handleWorkspaceSelect} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-white/10 bg-[#0a1014]/70 px-6 py-4 backdrop-blur-xl lg:px-10">
            <div className="flex items-center justify-between gap-6">
              {activeWorkspace === "Daily Brief" || activeWorkspace === "The Hub" ? (
                <div className="hidden h-10 lg:block" />
              ) : (
                <RoleChips
                  activeRole={activeRole}
                  roles={roles}
                  onSelect={activeWorkspace === "Agent" ? resetConversation : setActiveRole}
                />
              )}
              <p className="hidden text-sm text-[#9baab7] sm:block">{formattedDate}</p>
            </div>
          </header>

          <main className="flex flex-1 flex-col px-5 py-8 lg:px-10 lg:py-10">
          {activeWorkspace === "The Hub" ? (
            <KnowledgeHubPage />
          ) : activeWorkspace === "Daily Brief" ? (
            <DailyBriefPage
              scope="For You"
              activeRole={activeRole}
              onRoleSelect={setActiveRole}
            />
          ) : !hasConversation ? (
            <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center pt-[8vh] sm:pt-[10vh]">
              <div className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.26em] text-[#8ad2ff]">
                {activeAgentLabel}
              </div>
              <h1 className="mt-6 text-center text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-[4rem]">
                {getGreeting()}, Timothy
              </h1>
              <p className="mt-5 max-w-2xl text-center text-lg leading-8 text-[#a9b7c3]">
                Junior's internal operations cockpit for account context, product signals, and team knowledge.
                {" "}
                Select a role to see the questions that matter most.
              </p>

              <div className="mt-12 w-full">
                <div className="rounded-[30px] border border-white/10 bg-[#0d151b]/88 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
                  <label>
                    <span className="sr-only">{inputMessage}</span>
                    <textarea
                      value={inputMessage}
                      readOnly
                      rows={3}
                      className="min-h-[88px] w-full resize-none rounded-[22px] border border-transparent bg-transparent px-3 py-2 text-[15px] leading-7 text-[#8ea2b2] outline-none"
                    />
                  </label>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-[#93a6b6]"
                      aria-label="Add attachment"
                    >
                      +
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#93a6b6]">
                        {activeAgentLabel} • {activeRole}
                      </span>
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#93a6b6]"
                        aria-label="Voice input"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path strokeLinecap="round" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
                          <path strokeLinecap="round" d="M8 11.5a4 4 0 0 0 8 0M12 15.5V19" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7b61ff,#46d4ff)] text-lg text-white shadow-[0_8px_28px_rgba(70,212,255,0.25)] disabled:opacity-55"
                        disabled
                        aria-label="Send message"
                      >
                        ↑
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex min-h-28 w-full flex-wrap content-start justify-center gap-3">
                {suggestedPrompts.map((prompt) => (
                  <SuggestedPromptPill
                    key={prompt.text}
                    prompt={prompt}
                    onClick={handlePromptClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
              <div
                ref={chatViewportRef}
                className="flex-1 space-y-8 overflow-y-auto pb-8"
              >
                {messages.map((message) =>
                  message.type === "user" ? (
                    <div key={message.id} className="flex justify-end">
                      <div className="max-w-[85%] rounded-[24px] rounded-br-md border border-[#7bd0ff]/20 bg-[linear-gradient(135deg,rgba(64,120,255,0.18),rgba(27,38,48,0.92))] px-5 py-3.5 text-[15px] leading-7 text-[#ecf4ff] shadow-[0_16px_40px_rgba(0,0,0,0.24)]">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex justify-start">
                      <ResponseCard
                        content={message.content}
                        attachments={message.attachments}
                        lastUpdated={message.lastUpdated}
                        showSources={message.showSources}
                      />
                    </div>
                  ),
                )}

                {isTyping ? <TypingIndicator agentLabel={activeAgentLabel} /> : null}
              </div>

              <div className="sticky bottom-0 border-t border-white/10 bg-[#06090d]/88 pb-2 pt-4 backdrop-blur-xl">
                <div className="rounded-[28px] border border-white/10 bg-[#0d151b]/88 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.3)]">
                  <div className="flex items-end gap-3">
                    <label className="flex-1">
                      <span className="sr-only">{inputMessage}</span>
                      <textarea
                        value={inputMessage}
                        readOnly
                        rows={2}
                        className="min-h-[56px] w-full resize-none rounded-[18px] border border-transparent bg-transparent px-3 py-2 text-[15px] leading-6 text-[#8ea2b2] outline-none"
                      />
                    </label>
                    <button
                      type="button"
                      className="mb-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[linear-gradient(135deg,#7b61ff,#46d4ff)] text-lg text-white shadow-[0_8px_28px_rgba(70,212,255,0.25)] disabled:opacity-55"
                      disabled
                      aria-label="Send message"
                    >
                      ↑
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex min-h-24 w-full flex-wrap content-start gap-3">
                  {suggestedPrompts.map((prompt) => (
                    <SuggestedPromptPill
                      key={prompt.text}
                      prompt={prompt}
                      onClick={handlePromptClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, type FormEvent } from "react";

const SUGGESTIONS = [
  "What did you do at Check24?",
  "Tell me about the molecular dynamics project.",
  "Are you open for summer 2027 internships?",
  "What's your stack?",
];

export function AskFrederik() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll to bottom as messages stream
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || status === "streaming" || status === "submitted") return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit(input);
  }

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <>
      <button
        type="button"
        className={`ask-launcher ${open ? "is-open" : ""}`}
        aria-label={open ? "Close Ask Frederik" : "Open Ask Frederik"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l1.6 3.5L17 8l-3.4 1.5L12 13l-1.6-3.5L7 8l3.4-1.5z" />
              <path d="M19 14l.8 1.8L21.5 16.5l-1.7.7L19 19l-.8-1.8L16.5 16.5l1.7-.7z" />
            </svg>
            <span>Ask Frederik</span>
          </>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="ask-panel"
          role="dialog"
          aria-label="Ask Frederik — AI assistant"
        >
          <header className="ask-panel__head">
            <div className="ask-panel__title">
              <span className="ask-panel__dot" aria-hidden="true" />
              <span>Ask Frederik</span>
            </div>
            <span className="ask-panel__sub">AI assistant grounded on the CV. Not the real Frederik.</span>
          </header>

          <div ref={scrollRef} className="ask-panel__body">
            {messages.length === 0 && (
              <div className="ask-panel__intro">
                <p>Ask me anything about Frederik&apos;s work — experience, projects, stack, availability.</p>
                <div className="ask-panel__suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="ask-suggestion"
                      onClick={() => submit(s)}
                      disabled={isLoading}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`ask-msg ask-msg--${m.role}`}>
                {m.parts.map((part, i) => {
                  if (part.type === "text") {
                    return <span key={`${m.id}-${i}`}>{part.text}</span>;
                  }
                  return null;
                })}
              </div>
            ))}

            {isLoading && messages.at(-1)?.role !== "assistant" && (
              <div className="ask-msg ask-msg--assistant ask-msg--thinking">
                <span className="ask-thinking">
                  <span /><span /><span />
                </span>
              </div>
            )}

            {error && (() => {
              const msg = error.message ?? "";
              const isRateLimited = /429|rate.?limit/i.test(msg);
              if (isRateLimited) {
                return (
                  <div className="ask-error ask-error--limit">
                    <strong>You&apos;ve hit the chat limit</strong> (5 messages per hour). Try again later, or email me directly at <a href="mailto:frederik.willemsen@tum.de">frederik.willemsen@tum.de</a>.
                  </div>
                );
              }
              return (
                <div className="ask-error">
                  Couldn&apos;t reach the model. The <code>GOOGLE_GENERATIVE_AI_API_KEY</code> env var likely isn&apos;t set.
                </div>
              );
            })()}
          </div>

          <form className="ask-panel__form" onSubmit={onSubmit}>
            <textarea
              ref={inputRef}
              className="ask-panel__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(input);
                }
              }}
              placeholder="Ask about a role, a project, the stack…"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="ask-panel__send"
              aria-label="Send message"
              disabled={isLoading || !input.trim()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

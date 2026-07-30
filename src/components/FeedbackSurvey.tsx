"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/posthog";

interface FeedbackSurveyProps {
  /** What this feedback is attached to — e.g. the product name from the demo
   *  request, so responses in the inbox and in PostHog stay correlated with
   *  what the visitor was actually looking at. */
  context: string;
  /** Reuses the email already collected on the request form, so a reply is
   *  possible without asking for it a second time. */
  email?: string;
}

const questions = [
  { key: "attention", label: "What caught your attention?" },
  { key: "confusion", label: "What confused you, if anything?" },
  { key: "intent", label: "Would you sign up / request a demo? Why or why not?" },
  { key: "missing", label: "What's missing from what we offer?" },
] as const;

type AnswerKey = (typeof questions)[number]["key"];
type Answers = Record<AnswerKey, string>;

const emptyAnswers: Answers = { attention: "", confusion: "", intent: "", missing: "" };

export default function FeedbackSurvey({ context, email }: FeedbackSurveyProps) {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [status, setStatus] = useState<"pending" | "sending" | "done">("pending");
  const hasFiredShown = useRef(false);

  useEffect(() => {
    if (hasFiredShown.current) return;
    hasFiredShown.current = true;
    trackEvent("feedback_survey_shown", { context });
  }, [context]);

  const handleSkip = () => {
    trackEvent("feedback_survey_skipped", { context });
    setStatus("done");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const answeredCount = questions.filter((q) => answers[q.key].trim()).length;
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, email, ...answers }),
      });
    } catch {
      // Best-effort — a failed feedback send shouldn't block the visitor or
      // look like the (already-successful) request itself failed.
    }
    trackEvent("feedback_survey_submitted", { context, answered_count: answeredCount });
    setStatus("done");
  };

  if (status === "done") {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center gap-1.5 text-[12px] text-[var(--lw-text-3)] mt-5"
      >
        <CheckCircle2 size={12} className="text-[var(--lw-accent)]" />
        Thanks for the feedback.
      </motion.p>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      onSubmit={handleSubmit}
      className="mt-6 pt-5 border-t border-[var(--lw-border)] text-left"
    >
      <p className="text-[12px] text-[var(--lw-text-2)] mb-3.5">
        One quick favor, totally optional — helps us improve this page.
      </p>
      <div className="space-y-2.5">
        {questions.map((q) => (
          <div key={q.key}>
            <label className="block text-[11px] text-[var(--lw-text-2)] mb-1">{q.label}</label>
            <textarea
              rows={1}
              value={answers[q.key]}
              onChange={(e) => setAnswers({ ...answers, [q.key]: e.target.value })}
              className="w-full bg-[var(--lw-surface)] border border-[var(--lw-border-strong)] rounded-md px-3 py-2 text-[12.5px] text-[var(--lw-text-1)] placeholder-[var(--lw-text-3)] focus:border-[var(--lw-accent)]/60 transition-all duration-150 resize-none"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-3.5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-8 px-4 rounded-md text-white text-[12px] font-medium active:scale-[0.98] disabled:opacity-50 transition-all duration-150"
          style={{ backgroundColor: "var(--lw-accent)" }}
        >
          {status === "sending" ? "Sending…" : "Send feedback"}
        </button>
        <button
          type="button"
          onClick={handleSkip}
          disabled={status === "sending"}
          className="text-[12px] text-[var(--lw-text-3)] hover:text-[var(--lw-text-1)] transition-colors duration-150"
        >
          Skip
        </button>
      </div>
    </motion.form>
  );
}

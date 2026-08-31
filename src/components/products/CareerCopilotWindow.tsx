import { Gauge, PenLine, MessagesSquare } from "lucide-react";
import BrowserWindow from "@/components/instruments/BrowserWindow";

// Career Copilot is the one product that lives on its own domain
// (resumebuilder.inframiq.com), so, unlike the Simulyn / Mail Shield
// instruments, this window is a faithful static rendering of its resume-
// match view rather than the live app embedded. Same light-window design
// language as the other two so the /products rows stay visually consistent.

const ATS_SCORE = 82;

const checks = [
  { label: "Keywords", value: "14 / 17" },
  { label: "Format", value: "Pass" },
  { label: "Readability", value: "Strong" },
];

const capabilities = [
  { icon: Gauge, name: "ATS Score", detail: "How well your resume matches any job description." },
  { icon: PenLine, name: "AI Tailoring", detail: "Rewrites your bullets to match keywords, with a humanize slider." },
  { icon: MessagesSquare, name: "Interview Prep", detail: "Questions grounded in the job description and your resume." },
];

function Body() {
  return (
    <div className="flex-1 flex flex-col p-6 lg:p-7">
      <div className="flex flex-wrap items-end gap-x-3 gap-y-1 mb-4">
        <span className="font-mono text-[44px] lg:text-[52px] leading-none tracking-tight text-[var(--lw-text-1)] tabular-nums">
          {ATS_SCORE}
        </span>
        <span className="font-mono text-[13px] text-[var(--lw-text-3)] mb-1.5">ATS match score</span>
      </div>

      <div className="h-1.5 rounded-full bg-[var(--lw-surface-2)] overflow-hidden mb-5">
        <div className="h-full rounded-full" style={{ width: `${ATS_SCORE}%`, backgroundColor: "var(--lw-accent)" }} />
      </div>

      <div className="grid grid-cols-3 gap-4 pb-5 border-b border-[var(--lw-border)]">
        {checks.map((c) => (
          <div key={c.label}>
            <p className="font-mono text-[17px] text-[var(--lw-text-1)] tabular-nums">{c.value}</p>
            <p className="text-[10.5px] text-[var(--lw-text-3)] mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <ul className="mt-auto pt-5 space-y-3.5">
        {capabilities.map(({ icon: Icon, name, detail }) => (
          <li key={name} className="flex items-start gap-3">
            <span className="flex-shrink-0 mt-0.5 grid place-items-center w-6 h-6 rounded-md bg-[var(--lw-accent-dim)]">
              <Icon size={13} style={{ color: "var(--lw-accent)" }} />
            </span>
            <span className="min-w-0">
              <span className="block text-[12.5px] font-medium text-[var(--lw-text-1)]">{name}</span>
              <span className="block text-[11px] text-[var(--lw-text-3)] leading-snug">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CareerCopilotWindow({
  className = "",
  chrome = "browser",
}: { className?: string; chrome?: "browser" | "app" } = {}) {
  if (chrome === "app") {
    return (
      <BrowserWindow variant="app" title="Career Copilot · Resume Match" status="Live" statusColor="var(--lw-success)" className={className}>
        <Body />
      </BrowserWindow>
    );
  }

  return (
    <BrowserWindow url="resumebuilder.inframiq.com" className={className}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--lw-border)]">
        <span className="text-[13px] font-semibold text-[var(--lw-text-1)]">Career Copilot - Resume Match</span>
        <span className="font-mono text-[10px] text-[var(--lw-success)] uppercase tracking-wide">Live</span>
      </div>
      <Body />
    </BrowserWindow>
  );
}

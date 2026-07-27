import { Lock } from "lucide-react";

// The site's primary visual artifact: a real browser frame around a
// light-mode interface. Every "we build software" claim on the site should
// resolve to one of these rather than to a paragraph — contrast comes from
// this light window floating over the dark page, not from the page
// background itself.
export default function BrowserWindow({
  url,
  children,
  className = "",
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`browser-chrome flex flex-col ${className}`}>
      <div className="browser-chrome-bar flex-shrink-0">
        <span className="browser-chrome-dot" style={{ backgroundColor: "#ff5f57" }} />
        <span className="browser-chrome-dot" style={{ backgroundColor: "#febc2e" }} />
        <span className="browser-chrome-dot" style={{ backgroundColor: "#28c840" }} />
        <div className="browser-chrome-url">
          <Lock size={10} strokeWidth={2} />
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className="bg-[var(--lw-bg)] text-[var(--lw-text-1)] flex-1 min-h-0 flex flex-col">{children}</div>
    </div>
  );
}

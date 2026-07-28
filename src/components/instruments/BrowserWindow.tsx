import { Lock } from "lucide-react";

// The site's primary visual artifact: a real window frame around a
// light-mode interface. Every "we build software" claim on the site should
// resolve to one of these rather than to a paragraph — contrast comes from
// this light window floating over the dark page, not from the page
// background itself.
//
// Two variants so every window on the site isn't the identical browser tab:
// "browser" (default) is for genuine web apps with a URL — Simulyn, Mail
// Shield, the request form. "app" is for internal desk tools nobody
// navigates to by URL — it drops the address pill and folds the title/status
// straight into the bar instead of a separate header row underneath.
type BrowserWindowProps =
  | {
      variant?: "browser";
      url: string;
      children: React.ReactNode;
      className?: string;
    }
  | {
      variant: "app";
      title: string;
      icon?: React.ReactNode;
      status?: string;
      statusColor?: string;
      children: React.ReactNode;
      className?: string;
    };

export default function BrowserWindow(props: BrowserWindowProps) {
  const { children, className = "" } = props;

  return (
    <div className={`browser-chrome flex flex-col ${className}`}>
      {props.variant === "app" ? (
        <div className="browser-chrome-bar browser-chrome-bar--app flex-shrink-0">
          <span className="app-chrome-dot" />
          <span className="app-chrome-dot" />
          <span className="app-chrome-dot" />
          {props.icon}
          <span className="app-chrome-title">{props.title}</span>
          {props.status && (
            <span className="app-chrome-status" style={{ color: props.statusColor }}>
              {props.status}
            </span>
          )}
        </div>
      ) : (
        <div className="browser-chrome-bar flex-shrink-0">
          <span className="browser-chrome-dot" style={{ backgroundColor: "#ff5f57" }} />
          <span className="browser-chrome-dot" style={{ backgroundColor: "#febc2e" }} />
          <span className="browser-chrome-dot" style={{ backgroundColor: "#28c840" }} />
          <div className="browser-chrome-url">
            <Lock size={10} strokeWidth={2} />
            <span className="truncate">{props.url}</span>
          </div>
        </div>
      )}
      <div className="bg-[var(--lw-bg)] text-[var(--lw-text-1)] flex-1 min-h-0 flex flex-col">{children}</div>
    </div>
  );
}

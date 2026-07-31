import posthog from "posthog-js";

// Guards double-init in dev (React Strict Mode mounts effects twice) and
// lets every other call in this module become a safe no-op until a key is
// configured, mirroring how /api/feedback degrades when RESEND_API_KEY
// is missing rather than throwing.
let initialized = false;

export function initPostHog() {
  if (initialized || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("NEXT_PUBLIC_POSTHOG_KEY is not set — PostHog events will not be sent.");
    }
    return;
  }
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    capture_pageview: false, // captured manually in PostHogProvider, on route change
    person_profiles: "identified_only",
  });
  initialized = true;
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined" || !initialized) return;
  posthog.capture(name, properties);
}

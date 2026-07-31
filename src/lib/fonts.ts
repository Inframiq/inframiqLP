import { Inter } from "next/font/google";

// Real SF Pro (what apple.com's headlines actually render in on Apple
// devices) isn't licensed for web embedding — apple.com itself just falls
// back to the OS font stack rather than bundling it, which is why the site's
// own system-font stack renders as SF Pro on Mac/iOS but Segoe UI elsewhere.
// Inter is the standard free substitute: geometrically close enough to SF
// Pro Display that it reads the same way cross-platform. Scoped to hero
// headlines only — the rest of the site stays on the system stack.
export const inter = Inter({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

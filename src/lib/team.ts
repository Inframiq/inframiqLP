// Single source of truth for the team roster — consumed by AboutContent.tsx
// for display and by layout.tsx for Organization/Person structured data, so
// the two never drift out of sync.

export interface TeamMember {
  name: string;
  role: string;
}

export const team: TeamMember[] = [
  { name: "Bhargav", role: "Co-Founder" },
  { name: "Bharath.K", role: "Co-Founder" },
  { name: "Jaswanth Kongara", role: "Global Client Management Lead" },
  { name: "Kundrapu Tanishq", role: "Technical Head" },
  { name: "Manideep Boorla", role: "CFO" },
  { name: "Srinivas Katragadda", role: "Full Stack Developer" },
];

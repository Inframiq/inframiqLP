// Single source of truth for the team roster — consumed by AboutContent.tsx
// for display and by layout.tsx for Organization/Person structured data, so
// the two never drift out of sync.

export interface TeamMember {
  name: string;
  role: string;
  employeeId: string;
}

export const team: TeamMember[] = [
  { name: "Bhargav", role: "Co-Founder", employeeId: "2605001" },
  { name: "Bharath.K", role: "Co-Founder & CEO", employeeId: "2605002" },
  { name: "Jaswanth Kongara", role: "Global Client Management Lead", employeeId: "2607001" },
  { name: "Kundrapu Tanishq", role: "Technical Head", employeeId: "2606001" },
  { name: "Manideep Boorla", role: "CFO", employeeId: "2607002" },
  { name: "Srinivas Katragadda", role: "Full Stack Developer", employeeId: "2607003" },
  { name: "Kundrapu Jaya Sai Deep", role: "Full Stack Developer", employeeId: "2607004" },
  { name: "Ashok Reddy", role: "Sales Associate", employeeId: "2607005" },
  { name: "Mounika", role: "Service Desk Lead", employeeId: "2607006" },
];

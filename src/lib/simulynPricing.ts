// Drives the live Simulyn pricing simulator on the homepage. Revenue follows
// a logistic (S-curve) growth model rather than a flat rate per seat: slow
// among small teams, steepest through the mid-market where most deals land,
// then saturating toward a ceiling at enterprise scale — the standard shape
// for adoption-driven revenue, and one that visibly bends against a straight
// reference line instead of reading as flat. Margin and break-even are
// illustrative — what a founder would see for a hypothetical cost structure,
// which is the entire premise of a pricing *simulator* — not a claim about
// Inframiq's own finances.

export const SEATS_MIN = 10;
export const SEATS_MAX = 750;
export const SEATS_DEFAULT = 100;

const REVENUE_CEILING = 26000;
const CURVE_MIDPOINT = 200;
const CURVE_STEEPNESS = 0.015;

const FIXED_MONTHLY_COST = 400;
const VARIABLE_COST_PER_SEAT = 14;
const ONE_TIME_SETUP_COST = 20000;

function interpolateRevenue(seats: number): number {
  if (seats <= 0) return 0;
  return REVENUE_CEILING / (1 + Math.exp(-CURVE_STEEPNESS * (seats - CURVE_MIDPOINT)));
}

export interface PricingScenario {
  seats: number;
  revenue: number;
  monthlyProfit: number;
  marginPct: number;
  breakEvenMonths: number;
}

export function computeScenario(seats: number): PricingScenario {
  const clamped = Math.min(SEATS_MAX, Math.max(SEATS_MIN, seats));
  const revenue = interpolateRevenue(clamped);
  const monthlyProfit = revenue - FIXED_MONTHLY_COST - VARIABLE_COST_PER_SEAT * clamped;
  const marginPct = revenue > 0 ? Math.max(0, Math.min(95, (monthlyProfit / revenue) * 100)) : 0;
  const breakEvenMonths =
    monthlyProfit > 0 ? Math.ceil(ONE_TIME_SETUP_COST / monthlyProfit) : Infinity;

  return {
    seats: clamped,
    revenue,
    monthlyProfit,
    marginPct,
    breakEvenMonths,
  };
}

export function formatCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

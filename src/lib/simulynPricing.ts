// Drives the live Simulyn pricing simulator on the homepage. Revenue is
// piecewise-linear through the three real reference points already quoted
// in Simulyn's own product copy (25 seats/$1,250, 100/$4,800, 500/$21,000),
// so the curve the visitor drags through is the same one the product
// actually claims. Margin and break-even are illustrative — what a founder
// would see for a hypothetical cost structure, which is the entire premise
// of a pricing *simulator* — not a claim about Inframiq's own finances.

export const SEATS_MIN = 10;
export const SEATS_MAX = 750;
export const SEATS_DEFAULT = 100;

const REFERENCE_POINTS: [number, number][] = [
  [0, 0],
  [25, 1250],
  [100, 4800],
  [500, 21000],
];

const FIXED_MONTHLY_COST = 400;
const VARIABLE_COST_PER_SEAT = 14;
const ONE_TIME_SETUP_COST = 20000;

function interpolateRevenue(seats: number): number {
  if (seats <= REFERENCE_POINTS[0][0]) return 0;

  const lastIndex = REFERENCE_POINTS.length - 1;
  if (seats >= REFERENCE_POINTS[lastIndex][0]) {
    const [x0, y0] = REFERENCE_POINTS[lastIndex - 1];
    const [x1, y1] = REFERENCE_POINTS[lastIndex];
    const rate = (y1 - y0) / (x1 - x0);
    return y1 + (seats - x1) * rate;
  }

  for (let i = 0; i < lastIndex; i++) {
    const [x0, y0] = REFERENCE_POINTS[i];
    const [x1, y1] = REFERENCE_POINTS[i + 1];
    if (seats >= x0 && seats <= x1) {
      const t = (seats - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return 0;
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

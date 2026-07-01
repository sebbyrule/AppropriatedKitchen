/**
 * Recipe scaling utilities (framework-agnostic, unit-aware).
 *
 * Powers the live serving scaler: parses cooking quantities — including
 * unicode fractions ("2 ¼"), ascii fractions ("1 1/2"), decimals, and ranges
 * ("8-10") — multiplies by a factor, and re-formats back to tidy kitchen
 * fractions. Also scales the per-serving nutrition block.
 */

import type { Nutrition } from "@/types/recipe";

const UNICODE_FRACTIONS: Record<string, number> = {
  "¼": 0.25, "½": 0.5, "¾": 0.75,
  "⅓": 1 / 3, "⅔": 2 / 3,
  "⅕": 0.2, "⅖": 0.4, "⅗": 0.6, "⅘": 0.8,
  "⅙": 1 / 6, "⅚": 5 / 6,
  "⅛": 0.125, "⅜": 0.375, "⅝": 0.625, "⅞": 0.875,
};

// Fractions we're happy to render back to the user, closest-match.
const NICE_FRACTIONS: [number, string][] = [
  [0, ""], [1 / 8, "⅛"], [1 / 4, "¼"], [1 / 3, "⅓"], [3 / 8, "⅜"],
  [1 / 2, "½"], [5 / 8, "⅝"], [2 / 3, "⅔"], [3 / 4, "¾"], [7 / 8, "⅞"], [1, ""],
];

const VALUE_TOKEN = /^(\d+\/\d+|\d*\.\d+|\d+|[¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])/u;
const FRACTION_NEXT = /^(\d+\/\d+|[¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])/u;

function tokenValue(tok: string): number | null {
  if (tok in UNICODE_FRACTIONS) return UNICODE_FRACTIONS[tok];
  if (/^\d+\/\d+$/.test(tok)) {
    const [a, b] = tok.split("/").map(Number);
    return b ? a / b : null;
  }
  const n = parseFloat(tok);
  return Number.isNaN(n) ? null : n;
}

/** Consume a leading quantity (e.g. "2 ¼", "1 1/2", "8", "½") from a string. */
function takeNumber(s: string): { value: number; rest: string } | null {
  let i = 0;
  while (i < s.length && s[i] === " ") i++;

  let value = 0;
  let consumed = false;
  let lastEnd = i;

  while (i < s.length) {
    const m = s.slice(i).match(VALUE_TOKEN);
    if (!m) break;
    const v = tokenValue(m[1]);
    if (v === null) break;

    value += v;
    consumed = true;
    i += m[1].length;
    lastEnd = i;

    // Allow one space before a fractional continuation ("2 ¼", "1 1/2").
    let j = i;
    while (j < s.length && s[j] === " ") j++;
    if (FRACTION_NEXT.test(s.slice(j))) {
      i = j;
      continue;
    }
    break;
  }

  return consumed ? { value, rest: s.slice(lastEnd) } : null;
}

/**
 * Parse a leading cooking quantity from a string, returning its numeric value
 * and the remaining text (the unit + anything after). Exposed for the
 * volume→weight converter. Returns null when there's no leading number.
 */
export function parseLeadingQuantity(input: string): { value: number; rest: string } | null {
  return takeNumber(input);
}

/** Render a number as a tidy kitchen quantity ("2 ¼", "½", "1 ½", "0.4"). */
export function formatQuantity(v: number): string {
  if (!Number.isFinite(v) || v < 0) return "";
  if (v === 0) return "0";

  const whole = Math.floor(v + 1e-9);
  const frac = v - whole;

  let best = NICE_FRACTIONS[0];
  let bestDist = Infinity;
  for (const candidate of NICE_FRACTIONS) {
    const d = Math.abs(frac - candidate[0]);
    if (d < bestDist) {
      bestDist = d;
      best = candidate;
    }
  }

  let w = whole;
  let glyph = best[1];
  if (best[0] === 1) {
    w += 1;
    glyph = "";
  }

  // Not near a nice fraction and not near an integer → fall back to a decimal.
  if (glyph === "" && bestDist > 0.06) {
    return String(Math.round(v * 100) / 100);
  }

  if (w === 0) return glyph || "0";
  if (glyph === "") return String(w);
  return `${w} ${glyph}`;
}

/**
 * Scale an amount string ("2 ¼ tsp" → "4 ½ tsp") by a factor, preserving the
 * trailing unit/text. Handles ranges ("8-10 min") and passes through anything
 * with no leading quantity ("to taste", "").
 */
export function scaleAmount(amount: string, factor: number): string {
  const s = amount.trim();
  if (!s || factor === 1) return amount;

  const first = takeNumber(s);
  if (!first) return amount; // no leading number — leave untouched

  const sep = first.rest.match(/^\s*[-–]\s*/);
  if (sep) {
    const second = takeNumber(first.rest.slice(sep[0].length));
    if (second) {
      const a = formatQuantity(first.value * factor);
      const b = formatQuantity(second.value * factor);
      return `${a}–${b}${second.rest}`;
    }
  }

  return `${formatQuantity(first.value * factor)}${first.rest}`;
}

function scaleStat(value: string | undefined, factor: number): string | undefined {
  if (value === undefined) return undefined;
  const m = value.match(/^\s*([\d.]+)\s*(.*)$/);
  if (!m) return value;
  const scaled = Math.round(parseFloat(m[1]) * factor);
  return `${scaled}${m[2] ?? ""}`;
}

/**
 * Scale a per-serving nutrition block. Used to show "whole recipe" totals:
 * pass `servings` to multiply the per-serving values up to the full yield.
 */
export function scaleNutrition(nutrition: Nutrition, factor: number): Nutrition {
  return {
    calories: Math.round(nutrition.calories * factor),
    protein: scaleStat(nutrition.protein, factor)!,
    carbs: scaleStat(nutrition.carbs, factor)!,
    fat: scaleStat(nutrition.fat, factor)!,
    fiber: scaleStat(nutrition.fiber, factor),
    sodium: scaleStat(nutrition.sodium, factor),
    sugar: scaleStat(nutrition.sugar, factor),
  };
}

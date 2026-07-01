/**
 * Curated cooking densities (g/mL) for volume-measured ingredients.
 *
 * The nutrition DB carries USDA-derived densities for liquids, oils, sugars,
 * etc., but most dry goods (flour, oats, cocoa…) have none — so measuring them
 * by volume would treat "a cup of flour" like a cup of water and overstate the
 * weight (and therefore the calories). These hand-tuned values fill those gaps.
 *
 * Used by BOTH the nutrition calculator (src/lib/nutrition-calc.ts) and the
 * volume↔weight toggle (src/lib/convert.ts), so the two always agree.
 *
 * Order matters: more specific patterns must precede generic ones
 * ("almond flour" before "flour").
 */

const CURATED_DENSITY: [RegExp, number][] = [
  // Flours & starches
  [/\balmond flour\b/, 0.38],
  [/\bcoconut flour\b/, 0.45],
  [/\b(all-purpose|bread|cake|pastry|whole.?wheat|rye|spelt|self.?rising)?\s*flour\b/, 0.53],
  [/\bcornstarch\b/, 0.48],
  [/\b(cornmeal|polenta|grits)\b/, 0.68],
  [/\b(bread.?crumbs|panko)\b/, 0.45],
  [/\bcocoa\b/, 0.41],

  // Grains & legumes (dry / uncooked)
  [/\b(white|brown|jasmine|basmati|arborio|wild|long.?grain|short.?grain)?\s*rice\b/, 0.85],
  [/\bquinoa\b/, 0.85],
  [/\bcouscous\b/, 0.6],
  [/\b(rolled|quick|steel.?cut)?\s*oats\b/, 0.4],
  [/\b(lentils?|split peas|dried beans)\b/, 0.85],
  [/\b(barley|bulgur|millet|farro|amaranth|buckwheat)\b/, 0.8],

  // Baking
  [/\bbrown sugar\b/, 0.8],
  [/\b(powdered|confectioners?)\b.*\bsugar\b/, 0.56],
  [/\byeast\b/, 0.62],

  // Dairy & fats measured by volume
  [/\bbutter\b/, 0.96],
  [/\b(shredded|grated)\b/, 0.4], // shredded/grated cheese, coconut

  // Nuts & seeds (chopped/whole, approximate)
  [/\b(almonds|walnuts|pecans|cashews|peanuts|pistachios|hazelnuts|pine nuts)\b/, 0.5],

  // Leafy herbs & greens (loosely packed)
  [/\b(basil|parsley|cilantro|mint|dill|chives|tarragon|sage|oregano)\b/, 0.12],
  [/\b(spinach|arugula|kale|lettuce|greens|watercress|chard)\b/, 0.2],
];

/** A curated cooking density for the named ingredient, if we have one. */
export function curatedDensity(name: string): number | undefined {
  const lower = name.toLowerCase();
  for (const [pattern, density] of CURATED_DENSITY) {
    if (pattern.test(lower)) return density;
  }
  return undefined;
}

/**
 * Resolve a density (g/mL) for an ingredient. The DB's USDA-derived value
 * always wins; a curated cooking density fills the gaps. Returns undefined when
 * neither is known (caller falls back to a water-equivalent default).
 */
export function resolveDensity(name: string, dbDensity?: number): number | undefined {
  return dbDensity ?? curatedDensity(name);
}

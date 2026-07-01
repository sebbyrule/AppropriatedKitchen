"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";

/**
 * Compact yield control. Adjusts the serving count; the parent rescales
 * ingredient amounts and nutrition live.
 */
export function ServingScaler({
  servings,
  base,
  min = 1,
  max = 99,
  onChange,
}: {
  servings: number;
  base: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
}) {
  const set = (n: number) => onChange(Math.min(max, Math.max(min, n)));
  const factor = servings / base;
  const changed = servings !== base;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border border-border bg-card px-4 py-3">
      <div>
        <p className="eyebrow">Yield</p>
        <p className="mt-1 font-serif text-lg">
          {servings} {servings === 1 ? "serving" : "servings"}
          {changed && (
            <span className="ml-2 align-middle text-sm text-primary">
              ×{Number.isInteger(factor) ? factor : factor.toFixed(2)}
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-1" role="group" aria-label="Adjust servings">
        <button
          type="button"
          onClick={() => set(servings - 1)}
          disabled={servings <= min}
          aria-label="Decrease servings"
          className="flex size-9 items-center justify-center border border-border text-foreground transition-colors hover:bg-accent hover:text-primary disabled:pointer-events-none disabled:opacity-40"
        >
          <Minus className="size-4" />
        </button>
        <span
          aria-live="polite"
          className="w-10 text-center font-serif text-xl tabular-nums"
        >
          {servings}
        </span>
        <button
          type="button"
          onClick={() => set(servings + 1)}
          disabled={servings >= max}
          aria-label="Increase servings"
          className="flex size-9 items-center justify-center border border-border text-foreground transition-colors hover:bg-accent hover:text-primary disabled:pointer-events-none disabled:opacity-40"
        >
          <Plus className="size-4" />
        </button>
        {changed && (
          <button
            type="button"
            onClick={() => onChange(base)}
            aria-label={`Reset to ${base} servings`}
            className="ml-1 flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
          >
            <RotateCcw className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

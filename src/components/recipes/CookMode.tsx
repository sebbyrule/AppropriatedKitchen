"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  ListChecks,
  Pause,
  Play,
  RotateCcw,
  Timer as TimerIcon,
  X,
} from "lucide-react";
import { parseSteps, type StepTimer } from "@/lib/recipe-steps";
import { cn } from "@/lib/utils";
import type { Ingredient } from "@/types/recipe";

interface ActiveTimer {
  total: number;
  remaining: number;
  running: boolean;
  finished: boolean;
  label: string;
}

function formatClock(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = h ? String(m).padStart(2, "0") : String(m);
  return `${h ? `${h}:` : ""}${mm}:${String(sec).padStart(2, "0")}`;
}

function beep() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 880;
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.35, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    osc.start(t);
    osc.stop(t + 0.95);
  } catch {
    /* audio unavailable */
  }
}

export function CookMode({
  title,
  ingredients,
  content,
}: {
  title: string;
  ingredients: Ingredient[];
  content: string;
}) {
  const steps = useMemo(() => parseSteps(content), [content]);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [showIngredients, setShowIngredients] = useState(false);
  const [timer, setTimer] = useState<ActiveTimer | null>(null);

  const current = steps[step];

  const next = useCallback(
    () => setStep((s) => Math.min(steps.length - 1, s + 1)),
    [steps.length],
  );
  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  const close = useCallback(() => {
    setOpen(false);
    setShowIngredients(false);
  }, []);

  const start = useCallback(() => {
    setStep(0);
    setDone(new Set());
    setChecked(new Set());
    setOpen(true);
  }, []);

  const markDoneNext = () => {
    setDone((d) => new Set(d).add(step));
    next();
  };

  // ── Timer ticking ──
  useEffect(() => {
    if (!timer?.running) return;
    const id = window.setInterval(() => {
      setTimer((t) => {
        if (!t || !t.running) return t;
        const remaining = t.remaining - 1;
        if (remaining <= 0) return { ...t, remaining: 0, running: false, finished: true };
        return { ...t, remaining };
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timer?.running]);

  // Beep once when a timer finishes.
  const beepedRef = useRef(false);
  useEffect(() => {
    if (timer?.finished && !beepedRef.current) {
      beepedRef.current = true;
      beep();
    }
    if (!timer?.finished) beepedRef.current = false;
  }, [timer?.finished]);

  const startTimer = (t: StepTimer) =>
    setTimer({ total: t.seconds, remaining: t.seconds, running: true, finished: false, label: t.label });

  // ── Screen wake lock ──
  useEffect(() => {
    if (!open || !("wakeLock" in navigator)) return;
    let sentinel: WakeLockSentinel | null = null;
    let cancelled = false;

    const acquire = async () => {
      try {
        sentinel = await navigator.wakeLock.request("screen");
      } catch {
        /* user denied / unsupported */
      }
    };
    acquire();

    const onVisible = () => {
      if (document.visibilityState === "visible" && !cancelled) acquire();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      sentinel?.release().catch(() => {});
    };
  }, [open]);

  // ── Body scroll lock + keyboard nav ──
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showIngredients) setShowIngredients(false);
        else close();
      } else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, showIngredients, next, prev, close]);

  if (steps.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={start}
        className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:border-primary hover:text-primary"
      >
        <CookingPot className="size-4" />
        Cook Mode
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background" role="dialog" aria-modal="true" aria-label="Cook mode">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <p className="eyebrow">Cook Mode</p>
              <p className="truncate font-serif text-lg">{title}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setShowIngredients(true)}
                className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
              >
                <ListChecks className="size-4" />
                <span className="hidden sm:inline">Ingredients</span>
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Exit cook mode"
                className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="flex gap-1.5 px-4 py-4 sm:px-6">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i === step ? "bg-primary" : done.has(i) ? "bg-primary/40" : "bg-border",
                )}
              />
            ))}
          </div>

          {/* Step body */}
          <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-8 text-center">
            <p className="eyebrow mb-6">
              Step {step + 1} of {steps.length}
            </p>
            {current.title && (
              <h2 className="mb-6 max-w-3xl font-serif text-3xl font-light leading-tight sm:text-5xl">
                {current.title}
              </h2>
            )}
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-2xl sm:leading-relaxed">
              {current.text}
            </p>
            {current.timer && (
              <button
                type="button"
                onClick={() => startTimer(current.timer!)}
                className="mt-10 inline-flex items-center gap-2 border border-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <TimerIcon className="size-4" />
                Start {current.timer.label} timer
              </button>
            )}
          </div>

          {/* Active timer */}
          {timer && (
            <div
              className={cn(
                "flex items-center justify-between gap-4 border-t px-4 py-3 sm:px-6",
                timer.finished ? "animate-pulse border-primary bg-primary/15" : "border-border",
              )}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl tabular-nums">{formatClock(timer.remaining)}</span>
                <span className="eyebrow">{timer.finished ? "Time's up" : `of ${formatClock(timer.total)}`}</span>
              </div>
              <div className="flex items-center gap-1">
                {!timer.finished && (
                  <button
                    type="button"
                    onClick={() => setTimer((t) => (t ? { ...t, running: !t.running } : t))}
                    aria-label={timer.running ? "Pause timer" : "Resume timer"}
                    className="flex size-10 items-center justify-center text-foreground transition-colors hover:text-primary"
                  >
                    {timer.running ? <Pause className="size-5" /> : <Play className="size-5" />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    beepedRef.current = false;
                    setTimer((t) => (t ? { ...t, remaining: t.total, running: false, finished: false } : t));
                  }}
                  aria-label="Reset timer"
                  className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTimer(null)}
                  aria-label="Dismiss timer"
                  className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="size-4" /> Prev
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={markDoneNext}
                className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Done — Next <ChevronRight className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Finish <Check className="size-4" />
              </button>
            )}
          </div>

          {/* Ingredients drawer */}
          {showIngredients && (
            <div className="absolute inset-0 z-10 flex flex-col bg-background">
              <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
                <div>
                  <p className="eyebrow">Have everything?</p>
                  <p className="font-serif text-lg">Ingredients</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIngredients(false)}
                  aria-label="Close ingredients"
                  className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>
              <ul className="flex-1 divide-y divide-border overflow-y-auto px-4 sm:px-6">
                {ingredients.map((ing, i) => {
                  const isChecked = checked.has(i);
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() =>
                          setChecked((c) => {
                            const nextSet = new Set(c);
                            if (nextSet.has(i)) nextSet.delete(i);
                            else nextSet.add(i);
                            return nextSet;
                          })
                        }
                        className="flex w-full items-start gap-3 py-3.5 text-left"
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center border transition-colors",
                            isChecked ? "border-primary bg-primary text-primary-foreground" : "border-border",
                          )}
                        >
                          {isChecked && <Check className="size-3.5" />}
                        </span>
                        <span className={cn("text-base", isChecked && "text-muted-foreground line-through")}>
                          {ing.amount && <strong className="font-medium">{ing.amount}</strong>}{" "}
                          {ing.name}
                          {ing.notes && <span className="text-sm text-muted-foreground"> — {ing.notes}</span>}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/**
 * Parses a recipe's markdown body into structured cooking steps.
 *
 * Each numbered list item becomes a step with an optional bold "title" lead and
 * a detected timer (e.g. "simmer for 20 minutes" → a 20:00 countdown). Shared
 * by Cook Mode (interactive timers) and the JSON-LD builder (HowToStep text).
 */

export interface StepTimer {
  /** Duration in seconds (upper bound for ranges, so it never ends early). */
  seconds: number;
  /** Human label of the matched phrase, e.g. "8–10 minutes". */
  label: string;
}

export interface CookStep {
  title: string | null;
  text: string;
  timer: StepTimer | null;
}

const TIME_RE =
  /(\d+)\s*(?:(?:to|–|-)\s*(\d+))?\s*(seconds?|secs?|minutes?|mins?|hours?|hrs?)\b/i;

/** Find the first cooking duration in a string, if any. */
export function parseTimer(text: string): StepTimer | null {
  const m = text.match(TIME_RE);
  if (!m) return null;

  const lo = parseInt(m[1], 10);
  const hi = m[2] ? parseInt(m[2], 10) : null;
  const unitWord = m[3].toLowerCase();
  const unit = unitWord.startsWith("h") ? 3600 : unitWord.startsWith("m") ? 60 : 1;

  const value = hi ?? lo; // upper bound for ranges
  if (!value) return null;

  const label = hi ? `${lo}–${hi} ${unitWord}` : `${lo} ${unitWord}`;
  return { seconds: value * unit, label };
}

/** Parse the ordered-list instructions into structured steps. */
export function parseSteps(content: string): CookStep[] {
  const steps: CookStep[] = [];

  for (const line of content.split("\n")) {
    const m = line.trim().match(/^\d+\.\s+(.*)$/);
    if (!m) continue;

    let raw = m[1];
    let title: string | null = null;

    const boldLead = raw.match(/^\*\*(.+?)\*\*\s*/);
    if (boldLead) {
      title = boldLead[1].trim();
      raw = raw.slice(boldLead[0].length);
    }

    const text = raw.replace(/\*\*/g, "").replace(/[*_`]/g, "").trim();
    steps.push({ title, text, timer: parseTimer(`${title ?? ""} ${text}`) });
  }

  return steps;
}

/** Flatten a step back to a single plain-text sentence (title + body). */
export function stepPlainText(step: CookStep): string {
  return step.title ? `${step.title} ${step.text}`.trim() : step.text;
}

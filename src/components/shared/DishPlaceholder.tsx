import { cn } from "@/lib/utils";

/**
 * Replaces the old gradient + ChefHat image placeholder.
 * A restrained "place setting" — thin-line plate, fork & knife —
 * drawn in bone on a warm charcoal panel with a faint dot texture.
 */
export function DishPlaceholder({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-secondary",
        className,
      )}
    >
      {/* faint dot grid for texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 0.5px, transparent 0.5px)",
          backgroundSize: "14px 14px",
          color: "var(--muted-foreground)",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 72%)",
        }}
      />

      <svg
        viewBox="0 0 120 120"
        className="relative h-1/2 w-1/2 max-h-24 max-w-24 text-foreground/25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        aria-hidden
      >
        {/* plate */}
        <circle cx="60" cy="60" r="30" />
        <circle cx="60" cy="60" r="22" className="opacity-60" />
        {/* fork */}
        <path d="M20 38 V60 M16 38 V49 M24 38 V49 M20 60 V96" />
        {/* knife */}
        <path d="M100 38 C108 44 108 56 100 62 V96 M100 62 V38" />
      </svg>

      {label ? (
        <span className="eyebrow absolute bottom-3 left-3 text-foreground/35">
          {label}
        </span>
      ) : null}
    </div>
  );
}

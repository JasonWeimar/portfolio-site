/**
 * ProofTiles.tsx
 * --------------
 * Purpose:
 * - A recruiter/hiring-manager scan aid.
 * - "High-signal, low-noise" summary blocks.
 *
 * Upgrade in this version:
 * - Supports both plain text lines AND clickable proof links.
 *
 * Why the upgrade matters:
 * - It converts "claims" into "verifiable clicks" with minimal UI complexity.
 */

import { Card } from "../components/ui/Card";
import type { ProofTile, ProofLine } from "../data/proofTiles";

/**
 * Type guard for ProofLine
 * ------------------------
 * This function lets TypeScript narrow:
 * - string vs link object
 *
 * Teaching note:
 * - This is a standard TS pattern for union types.
 * - It keeps the render loop clean and type-safe.
 */
function isLinkLine(line: ProofLine): line is Exclude<ProofLine, string> {
  return typeof line !== "string";
}

export function ProofTiles({ items }: { items: readonly ProofTile[] }) {
  return (
    /**
     * Layout:
     * - 1 column on mobile (readable)
     * - 2 columns on desktop (efficient scan)
     */
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((t) => (
        <Card key={t.title} className="p-6">
          <p className="text-sm font-semibold">{t.title}</p>

          <ul className="mt-3 space-y-1 text-sm text-(--muted)">
            {t.lines.map((line, idx) => {
              /**
               * Key strategy:
               * - For strings, the string itself is often stable, but could duplicate.
               * - For link objects, href is stable.
               * - We include idx to guarantee uniqueness without overthinking it.
               */
              const key =
                typeof line === "string"
                  ? `text:${idx}:${line}`
                  : `link:${idx}:${line.href}`;

              // Plain text line
              if (!isLinkLine(line)) {
                return <li key={key}>{line}</li>;
              }

              /**
               * Link line:
               * - Underline only on hover to keep the tile visually clean
               * - External links open in a new tab + noreferrer (best practice)
               */
              return (
                <li key={key}>
                  <a
                    href={line.href}
                    target={line.external ? "_blank" : undefined}
                    rel={line.external ? "noreferrer" : undefined}
                    className="underline underline-offset-4 decoration-white/20 hover:decoration-white/60 hover:text-white"
                  >
                    {line.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </Card>
      ))}
    </div>
  );
}

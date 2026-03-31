/**
 * Now.tsx
 * -------
 * Purpose:
 * - A small, high-signal block that communicates momentum.
 *
 * Why:
 * - It tells recruiters/hiring managers what I'm actively doing NOW.
 * - It looks current, intentional, and in-progress (in a good way/conveys real-person feel).
 */

import { Card } from "../components/ui/Card";

type NowProps = {
  items: readonly string[];
};

export function Now({ items }: NowProps) {
  return (
    <Card className="p-6">
      <p className="text-sm font-semibold">Right now</p>

      <ul className="mt-3 space-y-2 text-sm text-(--muted)">
        {items.map((x) => (
          <li key={x} className="flex gap-2">
            <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

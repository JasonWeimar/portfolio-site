/**
 * ProofTiles.tsx
 * --------------
 * Recruiter/manager scan aid:
 * - minimal reading effort
 * - high-signal, low-noise
 */

import { Card } from "../components/ui/Card";
import type { ProofTile } from "../data/proofTiles";

export function ProofTiles({ items }: { items: ProofTile[] }) {
    return (
        /**
         * 1 column on mobile, 2 on desktop
         * Why: cards remain readable; avoids tiny text density.
         */
        <div className="grid gap-4 sm:grid-cols-2">
            {items.map((t) => (
                <Card key={t.title} className="p-6">
                    <p className="text-sm font-semibold">{t.title}</p>

                    <ul className="mt-3 space-y-1 text-sm text-(--muted)">
                        {t.lines.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                </Card>
            ))}
        </div>
    );
}
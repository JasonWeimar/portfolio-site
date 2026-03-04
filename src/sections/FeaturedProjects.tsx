/**
 * FeaturedProjects.tsx
 * --------------------
 * This section is intentionally "dumb":
 * - It receives typed data (FeaturedProject[])
 * - It renders consistent UI based on that data
 *
 * Why this is good:
 * - Content changes do NOT require component rewrites.
 * - You can add/remove projects in projects.ts with confidence.
 */

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import type { FeaturedProject } from "../data/projects";

/**
 * Small helper component:
 * - Keeps FeaturedProjects component clean
 * - Encodes link behavior rules in one place (external vs internal)
 */
function ProjectLinks({ links }: { links: FeaturedProject["links"] }) {
    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {links.map((l) => {
                /**
                 * We'll render links as Buttons (anchors under the hood).
                 * Design principle: consistent CTAs look more intentional.
                 */
                const common = {
                    href: l.href,
                    variant: "secondary" as const, // as const keeps TS from widening the string
                };

                if (l.external) {
                    /**
                     * External link best practice:
                     * - new tab
                     * - rel="noreferrer" (prevents referrer leakage + protects against tab-nabbing patterns)
                     */
                    return (
                        <Button key={l.label} {...common} target="_blank" rel="noreferrer">
                            {l.label}
                        </Button>
                    );
                }

                // Internal link: anchor scroll or same-tab navigation.
                return (
                    <Button key={l.label} {...common}>
                        {l.label}
                    </Button>
                );
            })}
        </div>
    );
}

export function FeaturedProjects({ items }: { items: FeaturedProject[] }) {
    return (
        /**
         * Layout: 1-column on mobile, 3 columns on desktop
         * - This matches recruiter skim behavior: cards stack naturally on phone.
         */
        <div className="grid gap-4 md:grid-cols-3">
            {items.map((p) => (
                <Card key={p.title} className="p-6">
                    {/* Title row + optional first tag */}
                    <div className="flex items-start justify-between gap-4">
                        <p className="text-sm font-semibold">{p.title}</p>

                        {/* Tags are optional. Keep them subtle so they don't compete with content. */}
                        {p.tags?.length ? (
                            <span className="rounded-full border border-(--border) px-2 py-1 text-[11px] text-(--muted)">
                                {p.tags[0]}
                            </span>
                        ) : null}
                    </div>

                    {/* One-line description */}
                    <p className="mt-2 text-sm text-(--muted)">{p.description}</p>

                    {/* Optional ASCII diagram: good “engineer scent” without heavy visuals */}
                    {p.diagram ? (
                        <pre className="mt-4 overflow-x-auto rounded-xl border border-(--border) bg-white/5 px-3 py-2 text-[11px] text-(--muted)">
                            {p.diagram}
                        </pre>
                    ) : null}

                    {/* "What it proves" bullets (max 3) */}
                    <ul className="mt-4 space-y-2 text-sm">
                        {p.proves.slice(0, 3).map((x) => (
                            <li key={x} className="flex gap-2 text-(--muted)">
                                {/* Bullet dot with accent color = visual rhythm */}
                                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-(--accent)" />
                                <span>{x}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Links rendered as Button CTAs */}
                    <ProjectLinks links={p.links} />
                </Card>
            ))}
        </div>
    );
}
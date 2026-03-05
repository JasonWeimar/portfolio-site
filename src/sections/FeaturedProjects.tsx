/**
 * FeaturedProjects.tsx
 * --------------------
 * Purpose:
 * - Render the "Featured Projects" grid using typed data from `src/data/projects.ts`.
 *
 * Why "data-driven" matters:
 * - Content changes should not require JSX surgery.
 * - This keeps UI consistent and prevents layout drift over time.
 *
 * Component responsibilities:
 * - FeaturedProjects: layout + card structure
 * - ProjectLinks: link rendering rules (internal vs external)
 */

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import type { FeaturedProject } from "../data/projects";

/**
 * ProjectLinks
 * ------------
 * Why this helper exists:
 * - Keeps FeaturedProjects readable (separates "card content" from "CTA rendering rules")
 * - Encodes link behavior in one place:
 *   - external links open in a new tab and include rel="noreferrer"
 *   - internal links use normal anchors (#section)
 *
 * TypeScript note:
 * - `FeaturedProject["links"]` is a nice trick:
 *   It references the exact type of the `links` field from FeaturedProject.
 *   If you ever change the model, this stays correct automatically.
 */
function ProjectLinks({ links }: { links: FeaturedProject["links"] }) {
    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {links.map((l) => {
                /**
                 * We use our Button component as a consistent CTA style.
                 * Under the hood, Button will render <a> when `href` is present.
                 *
                 * TypeScript teaching note:
                 * - `variant: "secondary" as const` prevents TS from widening the string
                 *   into a generic `string` type. It stays the literal union member.
                 */
                const common = {
                    href: l.href,
                    variant: "secondary" as const,
                    "aria-label": l.label, // tiny accessibility signal, no extra UI
                };

                /**
                 * External link best practice:
                 * - target="_blank": opens new tab
                 * - rel="noreferrer": prevents leaking referrer + reduces tab-nabbing risk
                 */
                if (l.external) {
                    return (
                        <Button key={l.label} {...common} target="_blank" rel="noreferrer">
                            {l.label}
                        </Button>
                    );
                }

                // Internal link: same-tab navigation (anchors or same-site URL).
                return (
                    <Button key={l.label} {...common}>
                        {l.label}
                    </Button>
                );
            })}
        </div>
    );
}

/**
 * FeaturedProjects
 * ----------------
 * Props:
 * - items: FeaturedProject[] (typed content model)
 *
 * UI pattern:
 * - Card = consistent surface style (from Step B design spine)
 * - Each card has the same information hierarchy:
 *   Title → description → (optional diagram) → "what it proves" → CTAs
 *
 * Design note:
 * - Grid is 1-column on mobile, 3-columns on desktop.
 * - We keep text sizes small but readable because these are "scan cards".
 */
export function FeaturedProjects({ items }: { items: FeaturedProject[] }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {items.map((p) => (
                <Card key={p.title} className="p-6">
                    {/* Title row + tags */}
                    <div className="flex items-start justify-between gap-4">
                        {/* Title: small but bold (cards are dense; headline belongs in Hero) */}
                        <p className="text-sm font-semibold">{p.title}</p>

                        {/* Tags are optional. Keep them subtle; they’re “tech scent,” not the focus. */}
                        {p.tags?.length ? (
                            <div className="flex flex-wrap justify-end gap-2">
                                {/* Show up to 2 tags to avoid visual noise */}
                                {p.tags.slice(0, 2).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-(--border) px-2 py-1 text-[11px] text-(--muted)"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {/* One-line description (what it is) */}
                    <p className="mt-2 text-sm text-(--muted)">{p.description}</p>

                    {/* Optional diagram: great “engineer scent” without needing a graphic */}
                    {p.diagram ? (
                        <pre className="mt-4 overflow-x-auto rounded-xl border border-(--border) bg-white/5 px-3 py-2 text-[11px] text-(--muted)">
                            {p.diagram}
                        </pre>
                    ) : null}

                    {/* "What it proves" bullets: cap to 3 so every card is equally scannable */}
                    <ul className="mt-4 space-y-2 text-sm">
                        {p.proves.slice(0, 3).map((x) => (
                            <li key={x} className="flex gap-2 text-(--muted)">
                                {/* Bullet dot: accent color adds rhythm and reinforces brand color */}
                                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                                <span>{x}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA row */}
                    <ProjectLinks links={p.links} />
                </Card>
            ))}
        </div>
    );
}
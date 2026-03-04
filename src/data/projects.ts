/**
 * projects.ts
 * ----------
 * Why this file exists:
 * - Keeps project content out of React components.
 * - Makes Projects section "data-driven" (easier edits, less JSX clutter).
 * - Models are typed, so you can’t accidentally forget required fields.
 */

export type ProjectLink = {
    /** Text shown on the button (e.g. "Live", "Repo", "Infra Notes") */
    label: string;

    /** URL or anchor (e.g. https://..., or "#about-this-site") */
    href: string;

    /**
     * If true: open in a new tab and add rel="noreferrer".
     * Why: external links should not navigate away from your site.
     */
    external?: boolean;
};

export type FeaturedProject = {
    /** Title shown at top of the card */
    title: string;

    /** One sentence: what it is */
    description: string;

    /**
     * "What it proves" bullets.
     * Recruiter scan: they should understand value instantly.
     * Engineer scan: they see the technical signals.
     */
    proves: string[];

    /**
     * Optional tiny ASCII diagram.
     * Why: helps engineers understand quickly with minimal visual complexity.
     */
    diagram?: string;

    /** Usually 2 links: Live + Repo (or Infra Notes) */
    links: ProjectLink[];

    /** Small tags used as "tech scent" on the card */
    tags?: string[];
};

export const featuredProjects: FeaturedProject[] = [
    {
        title: "Flagship App — (MVP)",
        description:
            "A polished UI product that proves front-end strength while still showcasing AWS competence.",
        proves: [
            "Front-end taste: layout, type scale, responsive behavior",
            "Real data flow: state, loading/errors, edge cases",
            "AWS depth: (services used in MVP)",
        ],
        links: [
            // TODO: replace with real repo once created
            { label: "Repo", href: "https://github.com/JasonWeimar", external: true },
            // TODO: replace when live
            { label: "Live", href: "#", external: false },
        ],
        tags: ["React", "TypeScript", "AWS"],
    },
    {
        title: "Portfolio Shell — S3 + CloudFront",
        description:
            "This site hosted on AWS with a simple, cheap, always-on architecture.",
        proves: [
            "Static hosting + CDN + HTTPS",
            "Caching + invalidation awareness",
            "Reproducible deploy steps in repo",
        ],
        diagram: "Browser → CloudFront → (OAC) S3",
        links: [
            // TODO: replace with your actual CloudFront/custom domain URL
            { label: "Live", href: "#", external: false },
            // Internal anchor to your About This Website section
            { label: "Infra Notes", href: "#about-this-site", external: false },
        ],
        tags: ["S3", "CloudFront", "Route 53"],
    },
    {
        title: "AWS Workflow Lab — (Lab 04 or 05)",
        description:
            "One clear AWS workflow with screenshots + diagram + ‘what it proves’.",
        proves: [
            "Event-driven thinking (trigger → handler → persistence)",
            "IAM least-privilege patterns",
            "Reliability patterns (retries / idempotency)",
        ],
        diagram: "S3 → Lambda → DynamoDB",
        links: [
            // TODO: swap to the exact lab repo link (Lab 04 or Lab 05)
            { label: "Repo", href: "https://github.com/JasonWeimar", external: true },
            // Optional: you can deep link to README section later
            { label: "Readme", href: "#", external: false },
        ],
        tags: ["Lambda", "DynamoDB", "Step Functions"],
    },
];
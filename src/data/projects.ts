/**
 * projects.ts
 * ----------
 * Purpose:
 * - Keep project content OUT of components.
 * - Make the Projects section "data-driven".
 *
 * Why this matters:
 * - Updating a project becomes an edit in ONE place.
 * - Your UI stays consistent because the card renderer expects a stable shape.
 * - TypeScript can enforce your design rules (e.g., "3 bullets max").
 */

/**
 * A link shown on a project card.
 *
 * Teaching note:
 * - We keep it small: label + href + external flag.
 * - This prevents "link objects" from becoming mini frameworks.
 */
export type ProjectLink = {
    /** Text shown on the button (e.g. "Live", "Repo", "Infra Notes") */
    label: string;

    /**
     * URL or anchor.
     * Examples:
     * - External: "https://github.com/..."
     * - Internal: "#about-this-site"
     */
    href: string;

    /**
     * If true, the UI treats this as an external link:
     * - target="_blank"
     * - rel="noreferrer"
     *
     * Why:
     * - Keeps users on your site.
     * - Avoids navigating away from the page while scanning.
     */
    external?: boolean;
};

/**
 * FeaturedProject = the exact content required to render one project card.
 *
 * "Design rule enforcement" via types:
 * - proves: exactly 3 bullets (tuple)
 * - links: exactly 2 CTAs (tuple)
 *
 * Why enforce?
 * - Keeps every card equally scannable
 * - Prevents future you from accidentally bloating one card
 */
export type FeaturedProject = {
    /** Title shown at top of the card */
    title: string;

    /** One sentence: what it is */
    description: string;

    /**
     * "What it proves" bullets (exactly 3).
     * Recruiter scan: value quickly.
     * Engineer scan: technical signals quickly.
     */
    proves: readonly [string, string, string];

    /**
     * Optional tiny ASCII diagram.
     * Why: engineers can verify architecture at a glance without a complex diagram tool.
     */
    diagram?: string;

    /**
     * Two links max (exactly 2).
     * Usually:
     * - Live + Repo
     * OR
     * - Live + Infra Notes
     */
    links: readonly [ProjectLink, ProjectLink];

    /**
     * Tags are optional. They’re "tech scent".
     * Keep them short; UI will typically display 1–2.
     */
    tags?: readonly string[];
};

/**
 * featuredProjects
 * ---------------
 * This array is the "source of truth" for the Featured Projects section.
 *
 * Teaching note:
 * - Your UI shouldn't care *which* projects exist — it just maps over this list.
 * - Later we can move this into JSON or a CMS, but right now: keep it local and simple.
 */
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
            // Replace with the actual flagship repo when it exists
            { label: "Coming Soon", href: "#projects", external: false },

            /**
             * No live link yet, options:
             * 1) Point to a "Coming soon" section on page.
             * 2) Leav as # for now (not ideal)
             *
             * improve this in Step D by adding a real link or a "coming soon" anchor.
             */
            { label: "Plan", href: "#projects", external: false }, //temporary
        ],
        tags: ["React", "TypeScript", "AWS"],
    },

    {
        title: "Profile Site — S3 + CloudFront",
        description:
            "This profile site deployed on AWS with a simple, cheap, always-on architecture.",
        proves: [
            "Static hosting + CDN + HTTPS",
            "Caching + invalidation awareness",
            "Reproducible deploy steps in repo",
        ],
        diagram: "Browser → CloudFront → (OAC) S3",
        links: [
            // Site Repo
            { label: "Repo", href: "https://github.com/JasonWeimar/portfolio-site", external: true },

            // Internal anchor to the About This Website section (engineer verification)
            { label: "Infra Notes", href: "#about-this-site", external: false },
        ],
        tags: ["S3", "CloudFront", "Route 53"],
    },

    {
        title: "AWS Workflow Lab — S3 → Lambda → DynamoDB (Image Metadata Pipeline)",
        description:
            "This lab builds an event-driven serverless ingestion pipeline: when an image is uploaded to S3, an S3 ObjectCreated event triggers a TypeScript Lambda that fetches object metadata via HeadObject and writes a normalized record to DynamoDB using a conditional write for idempotency. CloudWatch Logs provide evidence and debugging telemetry.",
        proves: [
            "Event-driven thinking (trigger → handler → persistence)",
            "IAM least-privilege patterns",
            "Reliability patterns (retries / idempotency)",
        ],
        diagram: "S3 → Lambda → DynamoDB",
        links: [
            // Lab repo
            { label: "Repo", href: "https://github.com/JasonWeimar/AWS-Dev-Labs/tree/main/labs/04-image-metadata-pipeline", external: true },

            // Labs ReadMe
            { label: "Readme", href: "https://github.com/JasonWeimar/AWS-Dev-Labs", external: true },
        ],
        tags: ["Lambda", "DynamoDB", "Step Functions"],
    },
];
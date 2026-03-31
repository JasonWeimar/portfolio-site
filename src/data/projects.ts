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
   */
  external?: boolean;
};

/**
 * FeaturedProject = the exact content required to render one project card.
 *
 * "Design rule enforcement" via types:
 * - proves: exactly 3 bullets (tuple)
 * - links: exactly 2 CTAs (tuple)
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
   */
  links: readonly [ProjectLink, ProjectLink];

  /**
   * Tags are optional. They're "tech scent".
   */
  tags?: readonly string[];

  /**
   * Optional status badge.
   * Signals build progress to engineers reviewing the portfolio.
   */
  status?: string;
};

/**
 * featuredProjects
 * ---------------
 * This array is the "source of truth" for the Featured Projects section.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    title: "ClientFlow Portal",
    status: "In Progress — Phase E (API Integration)",
    description:
      "A full-stack serverless client portal for service businesses — structured request intake, real-time status tracking, file uploads via S3 pre-signed URLs, and event-driven email notifications.",
    proves: [
      "9 AWS services: Cognito, Lambda, API Gateway, DynamoDB, S3, CloudFront, SES, SNS, IAM — all wired end-to-end",
      "React 18 + TypeScript + TailwindCSS — 24 components built across 7 screens with a 28-component Figma design system",
      "Phases complete: A (scaffold + Figma) → B (components) → C (auth + routing) → D (Lambda + API Gateway). Phase E: live API wiring. Phase F: CI/CD deploy.",
    ],
    diagram:
      "React → CloudFront → API Gateway (JWT/Cognito) → Lambda → DynamoDB\n                                                              ↓ EventBridge → SES / SNS",
    links: [
      {
        label: "Repo",
        href: "https://github.com/JasonWeimar/clientflow-portal",
        external: true,
      },
      {
        label: "Figma",
        href: "https://www.figma.com/proto/oJFmuI4LtDbxAclJpWCB4D/02-Screens-Desktop?page-id=0%3A1&node-id=10-2&p=f&viewport=-201%2C410%2C0.08&t=7LZr5Vkwwvbm912B-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=10%3A2",
        external: true,
      },
    ],
    tags: ["React", "TypeScript", "AWS", "TailwindCSS", "Serverless"],
  },

  {
    title: "GitHub Profile Lookup",
    description:
      "A React/Vite app that queries the GitHub Users REST API and renders profile data into a glass-morphism card. Built as a deliberate AJAX + async/await refresher — every step of the request lifecycle is annotated. Deployed on AWS S3 + CloudFront with OAC and a wildcard ACM cert.",
    proves: [
      "fetch() lifecycle: response.ok guard, async response.json(), try/catch for both network and HTTP errors — the patterns that trip up most juniors",
      "Custom hook (useGithubUser) isolates all fetch state so components stay clean; SearchForm owns its own input state and only surfaces the submitted value",
      "S3 + CloudFront OAC with block-all-public-access — subdomain deployed via existing Route 53 hosted zone, Vite content-hashed assets for safe long-term caching",
    ],
    diagram:
      "Browser → Route 53 → CloudFront (OAC) → S3\n         └─ fetch() → api.github.com/users/{username}",
    links: [
      {
        label: "Live",
        href: "https://github-lookup.jasonweimarstack1.com/",
        external: true,
      },
      {
        label: "Repo",
        href: "https://github.com/JasonWeimar/Mini-Projects/tree/main/github-profile-lookup",
        external: true,
      },
    ],
    tags: ["React", "Vite", "Fetch API", "S3", "CloudFront", "Route 53"],
  },

  {
    title: "Profile Site — S3 + CloudFront",
    description:
      "This profile site deployed on AWS with a simple, cheap, always-on architecture.",
    proves: [
      "Static hosting + CDN + HTTPS with Origin Access Control",
      "Content-hashed assets — long-term CloudFront caching + targeted invalidation",
      "Reproducible deploy steps documented in repo",
    ],
    diagram: "Browser → CloudFront → (OAC) S3",
    links: [
      {
        label: "Repo",
        href: "https://github.com/JasonWeimar/portfolio-site",
        external: true,
      },
      {
        label: "Infra Notes",
        href: "#about-this-site",
        external: false,
      },
    ],
    tags: ["S3", "CloudFront", "Route 53", "React", "TypeScript"],
  },

  {
    title: "AWS Workflow Lab — S3 → Lambda → DynamoDB",
    description:
      "An event-driven serverless ingestion pipeline: S3 ObjectCreated triggers a TypeScript Lambda that fetches object metadata via HeadObject and writes a normalized record to DynamoDB with a conditional write for idempotency.",
    proves: [
      "Event-driven thinking: trigger → handler → persistence",
      "IAM least-privilege patterns — scoped execution role per function",
      "Reliability patterns: conditional writes for idempotency, CloudWatch telemetry",
    ],
    diagram:
      "S3 ObjectCreated → Lambda (HeadObject) → DynamoDB (conditional write)",
    links: [
      {
        label: "Repo",
        href: "https://github.com/JasonWeimar/AWS-Dev-Labs/tree/main/labs/04-image-metadata-pipeline",
        external: true,
      },
      {
        label: "Labs README",
        href: "https://github.com/JasonWeimar/AWS-Dev-Labs",
        external: true,
      },
    ],
    tags: ["Lambda", "DynamoDB", "S3", "TypeScript", "CloudWatch"],
  },
];

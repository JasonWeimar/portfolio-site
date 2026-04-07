/**
 * siteConfig.ts
 * -------------
 * Purpose:
 * - Centralize identity + links so you don't hardcode them in multiple files.
 *
 * Why this matters:
 * - Reduces mistakes (changing a link in one place updates everywhere)
 * - Makes future refactors easy (add/remove socials without hunting through components)
 * - Keeps App.tsx "composition" and not "content"
 *
 * Design rule:
 * - `links` is the source of truth.
 * - `socials` is derived from `links` so you don't duplicate URLs.
 */

/**
 * SocialLink
 * ----------
 * Used for the Contact/Socials section rendering.
 */
export type SocialLink = {
  label: "Email" | "LinkedIn" | "GitHub" | "Calendly" | "Instagram";
  href: string;
  external?: boolean;
};

export const siteConfig = {
  /** Display name */
  name: "Jason Weimar",

  /**
   * Hero eyebrow line (short identity label).
   */
  tagline: "Full-Stack Developer · AWS Cloud Specialist",

  /**
   * Hero headline (outcome statement).
   * Updated to reflect "What I Build" framing from resume.
   */
  headline:
    "Serverless AWS architectures. Event-driven pipelines. Full-stack applications.",

  /**
   * Hero supporting line (tech + approach).
   * Tightened to lead with what I build, then tie to flagship project.
   */
  summary:
    "AWS-certified full-stack developer building production-grade serverless systems and polished React frontends. IAM and access control design included. Currently shipping ClientFlow Portal — a full-stack SaaS spanning 9 AWS services end-to-end.",

  /**
   * About paragraphs.
   */
  about: [
    "AWS Certified Developer (DVA-C02) and full-stack engineer building serverless systems on AWS and polished React frontends. I care about things that are fast to verify: clear logs, least-privilege IAM, predictable behavior end-to-end.",
    "My background is enterprise IT — Lockheed Martin L3 Desktop Support, then Senior IT Systems Project Lead at the U.S. Patent & Trademark Office. That means I've worked in zero-downtime environments, written SOPs that other people actually use, and debugged production issues with structured root-cause methodology. That context makes me a better cloud engineer: I scope permissions properly, instrument for observability early, and build systems that are easy to hand off.",
    "On the development side, I'm full-stack across React, TypeScript, Node, Python, and serverless AWS. I'm comfortable with both relational and non-relational data models and I like building projects where the frontend and backend fit together cleanly — not just wired up, but designed to work as a system.",
    "Outside of code, I'm a lifelong creative — music production, photography, color grading, graphic design. That shows up directly in my UI work: layout decisions, typographic rhythm, the details that make a product feel intentional rather than assembled. I'm looking for a team building something real on AWS where both the interface and the infrastructure are taken seriously.",
  ] as const,

  /**
   * "Now" bullets — current focus (2–4 max for scanability).
   * Updated: March 2026
   */
  now: [
    "ClientFlow Portal is live — client sign-up open at d2m1l4se2aia7z.cloudfront.net. Phase 3 in progress: AWS CDK for infrastructure-as-code, X-Ray distributed tracing, and custom domain via Route 53.",
    "Continuing AWS workflow labs with evidence-first READMEs and CloudWatch telemetry.",
    "Actively seeking roles in serverless full-stack or cloud-native web application development — React + Node/TypeScript frontend with AWS Lambda, DynamoDB, Cognito, and EventBridge on the backend. Best fit: teams building SaaS products, internal tools, or APIs on AWS where both UI quality and backend reliability matter.",
  ] as const,

  /**
   * Primary outbound links (SOURCE OF TRUTH)
   */
  links: {
    email: "mailto:JasonCWeimar@gmail.com",
    linkedin: "https://www.linkedin.com/in/jason-weimar-3b6592228/",
    github: "https://github.com/JasonWeimar",
    liveUrl: "https://jasonweimarstack1.com",
    siteRepo: "https://github.com/JasonWeimar/portfolio-site",
    resume: "https://jasonweimarstack1.com/resume.pdf",
    instagram: "https://www.instagram.com/jasonweimar",
    calendly: "",
  } as const,

  /**
   * Convenience list for rendering UI.
   */
  socials: [
    { label: "Email", href: "mailto:JasonCWeimar@gmail.com", external: false },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jason-weimar-3b6592228/",
      external: true,
    },
    { label: "GitHub", href: "https://github.com/JasonWeimar", external: true },
    {
      label: "Instagram",
      href: "https://www.instagram.com/jasonweimar",
      external: true,
    },
  ] satisfies readonly SocialLink[],
} as const;

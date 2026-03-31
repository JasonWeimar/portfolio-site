/**
 * proofTiles.ts
 * -------------
 * Purpose:
 * - Provide "fast scan" credibility blocks (like a mini-resume grid).
 *
 * Single source of truth:
 * - Proof links come from siteConfig to prevent drift.
 */

import { siteConfig } from "./siteConfig";

/**
 * ProofLine
 * ---------
 * A tile line can be plain text or a link object.
 */
export type ProofLine =
  | string
  | {
      label: string;
      href: string;
      external?: boolean;
    };

/**
 * TileLines — enforces 3–5 lines per tile.
 */
export type TileLines =
  | readonly [ProofLine, ProofLine, ProofLine]
  | readonly [ProofLine, ProofLine, ProofLine, ProofLine]
  | readonly [ProofLine, ProofLine, ProofLine, ProofLine, ProofLine];

export type ProofTile = {
  title: string;
  lines: TileLines;
};

export const proofTiles = [
  {
    title: "This Site",
    lines: [
      {
        label: "Live site",
        href: siteConfig.links.liveUrl,
        external: true,
      },
      {
        label: "Source (GitHub)",
        href: siteConfig.links.siteRepo,
        external: true,
      },
      "React + TypeScript + TailwindCSS",
      "S3 + CloudFront OAC · content-hashed assets",
    ],
  },
  {
    title: "Credentials",
    lines: [
      "AWS Developer Associate (DVA-C02)",
      "AWS Cloud Practitioner (CLF-C02)",
      "Coding Dojo Full-Stack (CTU-aligned)",
      "CompTIA A+",
    ],
  },
  {
    title: "Current Stack",
    lines: [
      "React 18 + TypeScript + TailwindCSS",
      "TanStack Query · React Hook Form · Zod",
      "AWS: Lambda · API Gateway · DynamoDB · Cognito",
      "AWS: S3 · CloudFront · SES · SNS · EventBridge · IAM",
    ],
  },
  {
    title: "ClientFlow Portal",
    lines: [
      "Phase E — Wiring pages to live Lambda + API Gateway",
      "Phases A–D complete: scaffold → components → auth/routing → Lambda/API",
      "24 components · 7 screens · 9 AWS services · event-driven",
      {
        label: "View Figma",
        href: "https://www.figma.com/proto/oJFmuI4LtDbxAclJpWCB4D/02-Screens-Desktop?page-id=0%3A1&node-id=10-2",
        external: true,
      },
    ],
  },
] as const satisfies readonly ProofTile[];

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
      "Live — client sign-up open, admin demo coming",
      "9 AWS services · Cognito RBAC · EventBridge + SES",
      "Figma → React + TypeScript → deployed · $0–2/mo",
      {
        label: "Live Demo",
        href: "https://d2m1l4se2aia7z.cloudfront.net",
        external: true,
      },
    ],
  },
] as const satisfies readonly ProofTile[];

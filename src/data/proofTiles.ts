/**
 * proofTiles.ts
 * -------------
 * Purpose:
 * - Provide "fast scan" credibility blocks (like a mini-resume grid).
 *
 * Why tiles work:
 * - Recruiters skim. Hiring managers skim. Engineers skim.
 * - Tiles are high-signal with minimal reading effort.
 *
 * Design rule:
 * - Each tile should contain 3–5 short lines max.
 *   (Keeps density consistent and prevents paragraphs.)
 */

/**
 * A tuple type that enforces 3–5 lines.
 *
 * Teaching note:
 * - A tuple encodes "exact structure" in TypeScript.
 * - This prevents a tile from accidentally becoming 8 lines and wrecking the layout.
 *
 * Allowed:
 * - [a,b,c]
 * - [a,b,c,d]
 * - [a,b,c,d,e]
 */
export type TileLines =
    | readonly [string, string, string]
    | readonly [string, string, string, string]
    | readonly [string, string, string, string, string];

export type ProofTile = {
    /** Tile heading (short + scannable) */
    title: string;

    /** 3–5 lines (enforced by the TileLines tuple union) */
    lines: TileLines;
};

export const proofTiles: ProofTile[] = [
    {
        title: "Certs",
        lines: [
            "Coding Dojo Full-Stack",
            "AWS Developer Associate",
            "AWS Cloud Practitioner",
        ],
    },
    {
        title: "Stack",
        lines: [
            "React + TypeScript",
            "TailwindCSS",
            "Node.js",
            "AWS (Lambda/DDB/CloudFront)",
        ],
    },
    {
        title: "Current focus",
        lines: [
            "Ship profile site",
            "Build flagship MVP",
            "Polish UI system + deploy flow",
        ],
    },
    {
        title: "Looking for",
        lines: [
            "Front-end / Full-stack",
            "AWS-focused teams",
            "Product-minded environment",
        ],
    },
];
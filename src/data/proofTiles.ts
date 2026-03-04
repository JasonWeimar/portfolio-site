/**
 * proofTiles.ts
 * ------------
 * Why this exists:
 * - Proof tiles are a scan-friendly way to communicate credibility quickly.
 * - Recruiters don’t want paragraphs; they want signal.
 */

export type ProofTile = {
    /** Tile heading */
    title: string;

    /** 3–5 short lines, max */
    lines: string[];
};

export const proofTiles: ProofTile[] = [
    {
        title: "Certs",
        lines: ["AWS Cloud Practitioner", "Coding Dojo Full-Stack", "AWS Developer Associate"],
    },
    {
        title: "Stack",
        lines: ["React + TypeScript", "TailwindCSS", "Node.js", "AWS (Lambda/DDB/CloudFront)"],
    },
    {
        title: "Current focus",
        lines: ["Ship profile site", "Build flagship MVP", "Polish UI system + deploy flow"],
    },
    {
        title: "Looking for",
        lines: ["Front-end / Full-stack", "AWS-focused teams", "Product-minded environment"],
    },
];
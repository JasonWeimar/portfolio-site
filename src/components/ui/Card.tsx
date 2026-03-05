/**
 * Card.tsx
 * --------
 * Purpose:
 * - Provide a consistent "surface" style for content blocks (projects, proof tiles, about boxes).
 *
 * Why cards matter:
 * - They create visual grouping and hierarchy.
 * - They allow you to reuse one surface style everywhere (cohesion).
 *
 * Design principle:
 * - Keep the default card understated.
 * - Let typography and spacing do the heavy lifting (not heavy shadows).
 */

import type { ReactNode } from "react";

type CardProps = {
    /** Card content */
    children: ReactNode;

    /**
     * Escape hatch for layout tweaks:
     * - add padding, change grid behavior, etc.
     */
    className?: string;
};

export function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={[
                /**
                 * Radius: use your token so it matches the design system.
                 * - If you later change radius in CSS tokens, you won't have to refactor every card.
                 */
                "rounded-[var(--radius-lg)]",

                /** Border: subtle separation against dark background */
                "border border-(--border)",

                /**
                 * Background:
                 * - Use CSS variable for your surface color.
                 * - Use /60 alpha for a lifted feel.
                 *
                 * Note:
                 * - bg-(--surface)/60 may not behave reliably unless --surface is RGB-ready.
                 * - bg-[color:var(--surface)]/60 is the safe minimal option.
                 */
                "bg-[color:var(--surface)]/60",

                /** Blur gives a modern, glassy feel without being overdone */
                "backdrop-blur",

                /** Light shadow: subtle depth without looking like a “dashboard UI kit” */
                "shadow-sm",

                /** Caller-provided classes last so they can extend/override */
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}
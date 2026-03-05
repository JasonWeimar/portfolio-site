/**
 * Section.tsx
 * -----------
 * Purpose:
 * - Provide consistent vertical spacing and layout for each page section.
 * - Normalize the "eyebrow + title + content" pattern so the site feels cohesive.
 *
 * Design principles this enforces:
 * - Rhythm: every section has predictable spacing (py-16 / sm:py-20).
 * - Hierarchy: eyebrow (small) → title (bigger) → content (your cards/blocks).
 * - Composition: sections are wrappers; they don’t own content logic.
 */

import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
    /**
     * Optional anchor ID for navigation (e.g. "#projects").
     * This is how your sticky nav scrolls to sections.
     */
    id?: string;

    /** Optional section title (e.g. "Featured Projects") */
    title?: string;

    /**
     * Optional eyebrow text (small label above the title).
     * Why: adds category context without stealing attention from the title.
     */
    eyebrow?: string;

    /** Section body content (cards, grids, etc.) */
    children: ReactNode;

    /**
     * Optional className for the <section> element itself.
     * Why: sometimes you want tighter spacing for a specific section later.
     */
    className?: string;

    /**
     * Optional className for the inner Container wrapper.
     * Why: occasionally you want a section-specific max width or padding.
     * (Most of the time you won't touch this.)
     */
    containerClassName?: string;
};

export function Section({
    id,
    title,
    eyebrow,
    children,
    className = "",
    containerClassName = "",
}: SectionProps) {
    return (
        /**
         * The section element:
         * - holds the anchor (id)
         * - defines vertical spacing
         */
        <section id={id} className={`py-16 sm:py-20 ${className}`.trim()}>
            {/* Container is your global width + padding constraint */}
            <Container className={containerClassName}>
                {/* Only render header block if we have eyebrow or title */}
                {(eyebrow || title) && (
                    <header className="mb-10">
                        {/* Eyebrow: subtle label, often used for scanning ("Work", "Proof", etc.) */}
                        {eyebrow && (
                            <p className="text-sm font-medium tracking-wide text-(--muted)">
                                {eyebrow}
                            </p>
                        )}

                        {/* Title: section headline (smaller than H1, but clear) */}
                        {title && (
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                {title}
                            </h2>
                        )}
                    </header>
                )}

                {/* The content passed by the caller (grids, cards, etc.) */}
                {children}
            </Container>
        </section>
    );
}
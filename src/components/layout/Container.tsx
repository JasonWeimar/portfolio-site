/**
 * Container.tsx
 * -------------
 * Purpose:
 * - Enforce consistent page width + horizontal padding.
 *
 * Why this matters (design principle):
 * - Consistency creates "taste":
 *   everything aligns to the same left/right edges across sections.
 * - It prevents a common portfolio problem: every section has slightly different padding.
 *
 * Implementation notes:
 * - `mx-auto` centers the container.
 * - `max-w-*` caps the line length for readability.
 * - `px-6` gives comfortable side padding on mobile.
 */

import type { ReactNode, ElementType } from "react";

/**
 * Controlled max-width options:
 * - The default (5xl) is a good “reading width” for a personal site.
 * - You can widen specific areas later (e.g., galleries) without random one-off classes.
 */
type MaxWidth = "4xl" | "5xl" | "6xl";

type ContainerProps<T extends ElementType = "div"> = {
    /** Children content inside the container */
    children: ReactNode;

    /** Additional classes for the container wrapper */
    className?: string;

    /**
     * Render the container as a different element type.
     * Examples:
     * - as="header" for semantic structure
     * - as="footer" for the footer area
     *
     * Default: "div"
     */
    as?: T;

    /**
     * Max width preset.
     * Default: 5xl (good balance of readable text + roomy layout).
     */
    maxWidth?: MaxWidth;
};

/**
 * Map maxWidth presets to Tailwind classes.
 * This avoids string building all over the app.
 */
const maxWidthClass: Record<MaxWidth, string> = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
};

export function Container<T extends ElementType = "div">({
    children,
    className = "",
    as,
    maxWidth = "5xl",
}: ContainerProps<T>) {
    /**
     * If `as` is provided, use it; otherwise default to div.
     * This improves semantic HTML without changing layout.
     */
    const Component = (as ?? "div") as ElementType;

    return (
        <Component
            className={[
                "mx-auto w-full",
                maxWidthClass[maxWidth],
                "px-6", // consistent horizontal padding across the site
                className, // caller overrides/extensions last
            ].join(" ")}
        >
            {children}
        </Component>
    );
}
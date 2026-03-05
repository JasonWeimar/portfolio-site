/**
 * siteConfig.ts
 * -------------
 * Purpose:
 * - Centralize identity + links so you don't hardcode them in multiple files.
 *
 * Why this matters:
 * - Reduces mistakes (changing email in one place updates everywhere)
 * - Makes future refactors easy (e.g., adding Twitter/Calendly later)
 * - Makes App.tsx more "composition" and less "content"
 */

export type SocialLink = {
    /** Visible label in the UI */
    label: "Email" | "LinkedIn" | "GitHub" | "Calendly";

    /** Href used by <a> or our <Button href="..."> */
    href: string;

    /**
     * external = true means:
     * - open new tab
     * - rel="noreferrer"
     */
    external?: boolean;
};

export const siteConfig = {
    /** Your display name */
    name: "Jason Weimar",

    /**
     * Your one-line positioning (hero eyebrow or hero subline).
     * Keep this short and specific.
     */
    tagline: "Full-Stack + AWS Cloud Dev Specialist ",

    /**
     * Optional: a slightly longer line that explains your value.
     * Keep it to 1–2 sentences max.
     */
    summary:
        "React + TypeScript + Tailwind on the front end. AWS workflows on the back end. Built to be fast to verify.",

    /**
     * These are your primary outbound links (high ROI).
     * Replace with your real URLs.
     */
    links: {
        email: "JasonCWeimar@Gmail.com", 
        linkedin: "https://www.linkedin.com/in/jason-weimar-3b6592228/",
        github: "https://github.com/JasonWeimar",
        calendly: "", // optional later
    },

    /**
     * Convenience list for rendering UI.
     * This avoids repeated mapping logic in components.
     */
    socials: [
        { label: "Email", href: "JasonCWeimar@Gmail.com", external: false },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/jason-weimar-3b6592228/",
            external: true,
        },
        { label: "GitHub", href: "https://github.com/JasonWeimar", external: true },
        // Calendly is optional; add later when ready.
    ] satisfies SocialLink[],
} as const;
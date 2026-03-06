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
    label: "Email" | "LinkedIn" | "GitHub" | "Calendly" | "Instagram";

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
     * My one-line positioning (hero eyebrow or hero subline).
     * Keep short and specific.
     */
    tagline: "Full-Stack + AWS Cloud Dev Specialist ",

    /**
     * A slightly longer line that explains my value.
     * 1–2 sentences max.
     */
    headline: "I ship polished UI and production-minded AWS systems.",

    summary:
        "React + TypeScript + Tailwind frontends deployed on AWS with serverless and cloud-native architectures.",

    about: [
        "I’m a cloud-focused builder with an enterprise IT foundation and a strong eye for design. I’m AWS certified and I like systems that are fast to verify: clear logs, clean infra, predictable behavior.",
        "I started in operations leadership (uBreakiFix/Asurion), then joined Lockheed Martin as L3 Desktop Support, handling deployments, imaging, escalations, and complex troubleshooting with a structured, logs-first approach. Most recently I served as a Senior IT Systems Project Lead at the U.S. Patent &amp; Trademark Office, coordinating projects end-to-end, building SOPs/training, and improving workflows across systems and network components.",
        "Alongside enterprise work, I earned a Full-Stack Software Development certification through Coding Dojo (accredited by Colorado Technical University and used within their B.S. Computer Science curriculum), covering JavaScript/MERN, Python, and Java. I’m comfortable designing across both relational (SQL) and non-relational (MongoDB/DynamoDB) data models, and I enjoy building full projects where the front end and back end fit together cleanly.",
        "Outside of work, I’m a lifelong creative—music production, photography (post + color grading), and graphic design. That background shows up in my UI work: layout, polish, and details that make products feel intentional. I’m excited by any software engineering role where I can ship end-to-end—especially roles leaning front end—while still getting to build reliable backend logic and AWS workflows.",
    ],

    now: [
        "Shipping this profile site and tightening the story (projects + proof).",
        "Building a flagship app MVP that highlights front-end strength.",
        "Continuing AWS workflow labs (evidence-first READMEs + screenshots).",
    ],


    /**
     * Primary outbound links.
     */
    links: {
        email: "JasonCWeimar@Gmail.com",
        linkedin: "https://www.linkedin.com/in/jason-weimar-3b6592228/",
        github: "https://github.com/JasonWeimar",
        siteRepo: "https://github.com/JasonWeimar/portfolio-site",
        instagram: "https://www.instagram.com/jasonweimar",
        calendly: "", //  later
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
        { label: "Instagram", href: "https://www.instagram.com/jasonweimar", external: true }
        // TODO Add Calendly later
    ] satisfies SocialLink[],

} as const;
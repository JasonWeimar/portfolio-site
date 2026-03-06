/**
 * App.tsx (Step C)
 * ----------------
 * This file is the "table of contents" for your one-page site.
 *
 * Design principle:
 * - Keep App.tsx focused on composition (what sections exist, in what order).
 * - Avoid stuffing "content data" here (projects + tiles live in src/data).
 *
 * Teaching note:
 * - When your app grows, this stays readable because each section is a small component.
 */

import { siteConfig } from "./data/siteConfig";
import { Container } from "./components/layout/Container";
import { Section } from "./components/layout/Section";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";

// Data (content) lives in src/data so UI stays clean and edits are fast.
import { featuredProjects } from "./data/projects";
import { proofTiles } from "./data/proofTiles";

// Sections (UI) render data in consistent, reusable layouts.
import { FeaturedProjects } from "./sections/FeaturedProjects";
import { ProofTiles } from "./sections/ProofTiles";
import { AboutThisSite } from "./sections/AboutThisSite";
import { Now } from "./sections/Now";

export default function App() {
  return (
    <main>
      {/**
       * Skip link (accessibility):
       * Helps keyboard/screen-reader users jump past the sticky nav.
       * This is a tiny pro-signal and costs almost nothing.
       */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-xl focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to projects
      </a>

      {/* Navbar (simple, sticky) */}
      <header
        className={[
          /**
           * Why sticky + blur?
           * - Keeps navigation visible while scrolling.
           * - Blur + translucent background maintains readability without feeling heavy.
           *
           * Note on Tailwind + CSS variables:
           * - bg-(--bg)/70 is not always valid unless --bg is a special RGB value.
           * - bg-[color:var(--bg)]/70 is the safe, minimal approach for now.
           */
          "sticky top-0 z-50",
          "border-b border-(--border)",
          "bg-[color:var(--bg)]/70 backdrop-blur",
        ].join(" ")}
      >
        <Container className="flex h-14 items-center justify-between">
          {/* Brand link: returns to top. */}
          <a href="#" className="text-sm font-semibold tracking-tight" aria-label="Home">
            {siteConfig.name}
          </a>

          {/* Desktop nav only; on mobile we keep it clean for now. */}
          <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary navigation">
            <a className="text-sm text-(--muted) hover:text-white" href="#projects">
              Projects
            </a>
            <a className="text-sm text-(--muted) hover:text-white" href="#about">
              About
            </a>
            <a className="text-sm text-(--muted) hover:text-white" href="#contact">
              Contact
            </a>
          </nav>
        </Container>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <Container>
          {/* Eyebrow line: small positioning statement (scan-first). */}
          <p className="test-sm font-medium text-(--muted)">
            {siteConfig.tagline}
          </p>

          {/* H1: one clear promise. Keep it short and confident. */}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {siteConfig.headline}
          </h1>

          {/* Supporting line: gives stack + credibility without bloating hero. */}
          <p className="mt-5 max-2-2xl text-(--muted)">
            {siteConfig.summary}
          </p>

          {/* Primary CTAs: “View Projects” is the conversion goal. */}
          <div className="flex flex-wrap gap-3 mt-5">
            {siteConfig.socials.map((s) => (
              <Button
                key={s.label}
                href={s.href}
                variant={s.label === "Email" ? "primary" : "secondary"}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noreferrer" : undefined}
              >
                {s.label}
              </Button>
            ))}
          </div>

          {/**
           * Proof pills:
           * - quick “credential scent” without distracting from CTA
           * - keep them subtle (muted) so the hero headline still wins
           */}
          <div className="mt-10 flex flex-wrap gap-2 text-xs text-(--muted)">
            <span className="rounded-full border border-(--border) px-3 py-1">
              Coding Dojo Full-Stack Developer
            </span>
            <span className="rounded-full border border-(--border) px-3 py-1">
              AWS Developer Associate
            </span>
            <span className="rounded-full border border-(--border) px-3 py-1">
              AWS Cloud Practitioner
            </span>
            <span className="rounded-full border border-(--border) px-3 py-1">
              CompTIA A+
            </span>
          </div>
        </Container>
      </section>

      {/**
       * Featured Projects (data-driven)
       * - Content comes from featuredProjects in src/data/projects.ts
       * - UI is handled by FeaturedProjects component
       */}
      <Section id="projects" eyebrow="Work" title="Featured Projects">
        <FeaturedProjects items={featuredProjects} />
      </Section>

      {/**
       * Proof Tiles (fast-scan credibility)
       * - Like a mini resume grid
       * - Great for recruiters; low effort to parse
       */}
      <Section eyebrow="Proof" title="Quick proof">
        <ProofTiles items={proofTiles} />
      </Section>

      <Section eyebrow="Status" title="Now">
        <Now items={siteConfig.now} />
      </Section>

      {/**
       * About This Website (engineer-verifiable depth)
       * - This is where you “show your work” for S3/CloudFront + deploy flow
       */}
      <Section id="about-this-site" eyebrow="Details" title="About this website">
        <AboutThisSite />
      </Section>

      {/* About */}
      <Section id="about" eyebrow="Bio" title="About">
        <Card className="p-6">
          <div className="space-y-4">
            {siteConfig.about.map((para) => (
              <p key={para} className="text-sm leading-relaxed text-(--muted)">
                {para}
              </p>
            ))}
          </div>
        </Card>
      </Section>

      {/* Contact  */}
      <Section id="contact" eyebrow="Reach out" title="Contact | Socials">
        <div className="flex flex-wrap gap-3">
          {siteConfig.socials.map((s) => (
            <Button
              key={s.label}
              href={s.href}
              variant={s.label === "Email" ? "primary" : "secondary"}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noreferrer" : undefined}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </Section>

      {/* Footer: tiny credibility + stack summary */}
      <footer className="border-t border-(--border) py-10">
        <Container>
          <p className="text-xs text-(--muted)">
            © {new Date().getFullYear()} {siteConfig.name}. Built with React, TypeScript, Tailwind, and AWS.
          </p>
        </Container>
      </footer>
    </main>
  );
}
import { Section } from "./components/layout/Section";
import { Container } from "./components/layout/Container";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card"

export default function App() {
  return (
    <main>
      {/* Navbar (simple, sticky) */}
      <header className="sticky top-0 z-50 border-b border-(--border) bg-(--bg)/70 backdrop-blur">
        <Container className="flex h-14 items-center justify-between">
          <a href="#" className="text-sm font-semibold tracking-tight">
            Jason Weimar
          </a>

          <nav className="hidden items-center gap-6 sm:flex">
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
          <p className="text-sm font-medium text-(--muted)">
            Front-end leaning dev + AWS builder
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            I ship clean UI and production-minded cloud workflows.
          </h1>

          <p className="mt-5 max-w-2xl text-(--muted)">
            React + TypeScript + Tailwind on the front end. Lambda, DynamoDB, Step Functions,
            CloudFront on the back end. Built to be easy to verify.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary">
              View Projects
            </Button>
            <Button href="#contact" variant="secondary">
              Contact
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 text-xs text-(--muted)">
            <span className="rounded-full border border-(--border) px-3 py-1">
              AWS Cloud Practitioner
            </span>
            <span className="rounded-full border border-(--border) px-3 py-1">
              Coding Dojo Full-Stack
            </span>
            <span className="rounded-full border border-(--border) px-3 py-1">
              AWS Developer Associate
            </span>
          </div>
        </Container>
      </section>

      {/* Projects placeholder */}
      <Section id="projects" eyebrow="Work" title="Featured Projects">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm font-semibold">Flagship App (MVP)</p>
            <p className="mt-2 text-sm text-(--muted)">
              Polished UI product that proves front-end strength + AWS depth.
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold">Portfolio Shell (This Site)</p>
            <p className="mt-2 text-sm text-(--muted)">
              S3 + CloudFront + Route 53 + ACM. Fast, cheap, verifiable.
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold">AWS Workflow Lab</p>
            <p className="mt-2 text-sm text-(--muted)">
              One clear pipeline with “what it proves” + diagram.
            </p>
          </Card>
        </div>
      </Section>

      {/* About placeholder */}
      <Section id="about" eyebrow="Bio" title="About">
        <Card className="p-6">
          <p className="text-sm text-(--muted)">
            Short, credible bio goes here. (tighten copy in Step C.)
          </p>
        </Card>
      </Section>

      {/* Contact placeholder */}
      <Section id="contact" eyebrow="Reach out" title="Contact">
        <div className="flex flex-wrap gap-3">
          <Button href="mailto:you@example.com" variant="primary">
            Email Me
          </Button>
          <Button
            href="https://linkedin.com"
            variant="secondary"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Button>
          <Button
            href="https://github.com"
            variant="secondary"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Button>
        </div>
      </Section>

      <footer className="border-t border-(--border) py-10">
        <Container>
          <p className="text-xs text-(--muted)">
            © {new Date().getFullYear()} Jason Weimar. Built with React, TypeScript, Tailwind, and AWS.
          </p>
        </Container>
      </footer>
    </main>
  );
}
/**
 * AboutThisSite.tsx
 * -----------------
 * Purpose:
 * - This is the "engineer verification" section of your portfolio site.
 * - It tells a technical reviewer: "Yes, I understand how this is actually hosted and deployed."
 *
 * It answers:
 * 1) Architecture: What services are involved and how traffic flows
 * 2) Security posture: Is the S3 bucket public or private?
 * 3) Deploy mechanics: What gets uploaded, and when do you invalidate caches?
 * 4) CDN caching: Do you understand why CloudFront exists and how it’s configured at a high level?
 *
 * Design principle:
 * - Keep this section readable in ~20 seconds.
 * - It should feel like a tiny runbook, not a blog post.
 */

import { Card } from "../components/ui/Card";

export function AboutThisSite() {
    return (
        <Card className="p-6">
            {/* Two-column layout on desktop so it reads like concise docs / a runbook */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Column 1: architecture + security */}
                <div>
                    <p className="text-sm font-semibold">Hosting architecture</p>

                    <p className="mt-2 text-sm text-(--muted)">
                        This site is a static React build deployed to an S3 bucket and served globally through
                        CloudFront (CDN). HTTPS is terminated with ACM, and DNS is managed with Route 53 (custom domain).
                    </p>

                    {/* ASCII diagram = fast comprehension with almost no UI complexity */}
                    <pre className="mt-4 overflow-x-auto rounded-xl border border-(--border) bg-white/5 px-3 py-2 text-[11px] text-(--muted)">
                        Browser → CloudFront → (OAC) S3 (static assets)
                    </pre>

                    <p className="mt-3 text-xs text-(--muted)">
                        <span className="font-medium text-white">OAC</span> (Origin Access Control) keeps the S3 bucket
                        private so assets are only accessible through CloudFront (no public bucket browsing).
                    </p>
                </div>

                {/* Column 2: deploy flow + caching behavior */}
                <div>
                    <p className="text-sm font-semibold">Deploy flow</p>

                    {/* Ordered steps read like a runbook — fast to verify */}
                    <ol className="mt-2 space-y-2 text-sm text-(--muted)">
                        <li>
                            1) Build:{" "}
                            <code className="text-white">npm run build</code> → outputs{" "}
                            <code className="text-white">dist/</code>
                        </li>
                        <li>
                            2) Upload: sync <code className="text-white">dist/</code> to S3 (the deploy artifact)
                        </li>
                        <li>
                            3) Cache: invalidate CloudFront when needed (usually when{" "}
                            <span className="text-white">HTML</span> changes)
                        </li>
                    </ol>

                    <p className="mt-4 text-xs text-(--muted)">
                        Caching note: hashed assets (JS/CSS) can be cached longer because new builds generate new filenames.
                        HTML is often shorter-lived, so invalidations matter when the entry page changes.
                    </p>

                    <p className="mt-3 text-xs text-(--muted)">
                        Cost note: S3 + CloudFront is low-cost for a personal site, and scales automatically without a server.
                    </p>
                </div>
            </div>
        </Card>
    );
}
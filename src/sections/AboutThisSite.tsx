/**
 * AboutThisSite.tsx
 * -----------------
 * This is the "engineer verification" section.
 * It answers:
 * - What’s the architecture?
 * - How deployment functions?
 * - Is there an understanding of caching + why CDNs work?
 */

import { Card } from "../components/ui/Card";

export function AboutThisSite() {
    return (
        <Card className="p-6">
            {/* Two-column layout on desktop so it reads like concise documentation */}
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <p className="text-sm font-semibold">Hosting architecture</p>

                    <p className="mt-2 text-sm text-(--muted)">
                        This is a static React build deployed to an S3 bucket and delivered globally through
                        CloudFront (CDN). HTTPS is handled by ACM, and DNS by Route 53 (when using a custom domain).
                    </p>

                    <pre className="mt-4 overflow-x-auto rounded-xl border border-(--border) bg-white/5 px-3 py-2 text-[11px] text-(--muted)">
                        Browser → CloudFront → (OAC) S3 (static assets)
                    </pre>
                </div>

                <div>
                    <p className="text-sm font-semibold">Deploy flow</p>

                    {/* Ordered steps read like a runbook—fast to verify */}
                    <ol className="mt-2 space-y-2 text-sm text-(--muted)">
                        <li>
                            1) Build: <code className="text-white">npm run build</code> → outputs{" "}
                            <code className="text-white">dist/</code>
                        </li>
                        <li>2) Sync the build output to S3 (deploy artifact)</li>
                        <li>3) Invalidate CloudFront when needed (HTML changes)</li>
                    </ol>

                    <p className="mt-4 text-xs text-(--muted)">
                        Note: hashed assets can be cached longer; HTML is typically shorter-lived.
                    </p>
                </div>
            </div>
        </Card>
    );
}

import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
    id?: string;
    title?: string;
    eyebrow?: string;
    children: ReactNode;
};

export function Section({ id, title, eyebrow, children }: SectionProps) {
    return (
        <section id={id} className="py-16 sm:py-20">
            <Container>
                {(eyebrow || title) && (
                    <header className="mb-10">
                        {eyebrow && (
                            <p className="text-sm font-medium tracking-wide text-(--muted)">
                                {eyebrow}
                            </p>
                        )}
                        {title && (
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                {title}
                            </h2>
                        )}
                    </header>
                )}

                {children}
            </Container>
        </section>
    );
}
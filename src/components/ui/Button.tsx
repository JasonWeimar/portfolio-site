import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
    variant?: Variant;
    className?: string;
    children: ReactNode;
};

type AnchorProps = CommonProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    };

type NativeButtonProps = CommonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
    };

type ButtonProps = AnchorProps | NativeButtonProps;

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-[var(--accent)] text-white hover:opacity-90 focus-visible:outline-[var(--accent)]",
    secondary:
        "border border-[var(--border)] bg-white/0 text-white hover:bg-white/5 focus-visible:outline-white/30",
    ghost:
        "bg-transparent text-white hover:bg-white/5 focus-visible:outline-white/30",
};

const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium " +
    "transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

function isAnchorProps(p: ButtonProps): p is AnchorProps {
    return "href" in p;
}

// Overloads (return ReactNode to avoid JSX namespace issues)
export function Button(props: AnchorProps): ReactNode;
export function Button(props: NativeButtonProps): ReactNode;
export function Button(props: ButtonProps) {
    const variant: Variant = props.variant ?? "primary";
    const className = props.className ?? "";
    const classes = `${base} ${variantClasses[variant]} ${className}`.trim();

    if (isAnchorProps(props)) {
        const { href, children, variant: _v, className: _c, ...rest } = props;
        return (
            <a href={href} className={classes} {...rest}>
                {children}
            </a>
        );
    }

    const { children, variant: _v, className: _c, ...rest } = props;
    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
}
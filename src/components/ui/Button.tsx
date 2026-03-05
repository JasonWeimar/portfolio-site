/**
 * Button.tsx
 * ----------
 * Goal:
 * - Provide ONE component that can render either:
 *   1) a real <button> (for actions)
 *   2) an <a> link (for navigation)
 *
 * Why this is useful:
 * - Consistent CTA styling across the whole site
 * - Cleaner app code (no duplicated "button-like link" styles everywhere)
 *
 * TypeScript challenge:
 * - <a> and <button> have different attribute types (events differ by element type).
 * - If you spread the wrong props onto the wrong element, TS complains (correctly).
 *
 * Solution:
 * - Use a discriminated union (presence of `href`)
 * - Use overloads + a type guard so TS can narrow correctly in each branch
 */

import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

/**
 * Variants are intentionally limited.
 * Design principle: constrain choices so the UI remains cohesive.
 */
type Variant = "primary" | "secondary" | "ghost";

/**
 * Common props shared by both the <a> and <button> versions.
 */
type CommonProps = {
    /** Visual style: primary / secondary / ghost */
    variant?: Variant;

    /** Optional extra Tailwind classes for local tweaks */
    className?: string;

    /** Button label/content */
    children: ReactNode;

    /**
     * Optional "disabled" semantics.
     * - Buttons support disabled natively.
     * - Anchors do not, so we simulate it with aria-disabled + pointer-events.
     */
    disabled?: boolean;
};

/**
 * AnchorProps:
 * - When `href` exists, we render <a>.
 * - We intersect (combine) CommonProps with anchor attributes.
 */
type AnchorProps = CommonProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string; // anchor MUST have href
    };

/**
 * NativeButtonProps:
 * - When there is NO href, we render <button>.
 *
 * The `href?: never` trick:
 * - Prevents accidentally passing href to the button version.
 * - "never" means "this property must not exist here".
 */
type NativeButtonProps = CommonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
    };

/**
 * ButtonProps is the union of the two shapes.
 * TypeScript will narrow it based on checking `href`.
 */
type ButtonProps = AnchorProps | NativeButtonProps;

/**
 * Tailwind classes per variant.
 * - Use CSS variables so your theme can change without rewriting every class.
 */
const variantClasses: Record<Variant, string> = {
    primary:
        "bg-[var(--accent)] text-white hover:opacity-90 focus-visible:outline-[var(--accent)]",
    secondary:
        "border border-[var(--border)] bg-white/0 text-white hover:bg-white/5 focus-visible:outline-white/30",
    ghost:
        "bg-transparent text-white hover:bg-white/5 focus-visible:outline-white/30",
};

/**
 * Shared base classes:
 * - consistent sizing / typography / focus ring
 *
 * Teaching note:
 * - We keep spacing + radius consistent across all CTAs.
 * - That consistency is part of "front-end taste".
 */
const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium " +
    "transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Type guard:
 * - TS uses this to narrow ButtonProps into AnchorProps in the `if` branch.
 * - This is the key to making `...rest` safe to spread.
 */
function isAnchorProps(p: ButtonProps): p is AnchorProps {
    return "href" in p;
}

/**
 * Overloads:
 * - These give callers correct IntelliSense and help TS inference.
 * - We return ReactNode to avoid JSX namespace issues in some TS setups.
 */
export function Button(props: AnchorProps): ReactNode;
export function Button(props: NativeButtonProps): ReactNode;
export function Button(props: ButtonProps) {
    const variant: Variant = props.variant ?? "primary";
    const className = props.className ?? "";
    const disabled = props.disabled ?? false;

    /**
     * Disabled styling:
     * - opacity + pointer-events prevents interactions
     * - cursor communicates state
     *
     * Note: for <a> we also add aria-disabled and remove click via pointer-events.
     */
    const disabledClasses = disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "";

    const classes = `${base} ${variantClasses[variant]} ${disabledClasses} ${className}`.trim();

    if (isAnchorProps(props)) {
        /**
         * Anchor branch:
         * - Because of narrowing, `rest` is now AnchorHTMLAttributes<HTMLAnchorElement>
         * - No more event handler mismatch errors (button vs anchor events).
         */
        const {
            href,
            children,
            variant: _v,      // strip custom props so they don't land on <a>
            className: _c,
            disabled: _d,
            ...rest
        } = props;

        return (
            <a
                href={href}
                className={classes}
                aria-disabled={disabled || undefined}
                {...rest}
            >
                {children}
            </a>
        );
    }

    /**
     * Button branch:
     * - Default type="button" prevents accidental form submits
     *   (HTML default is type="submit" if inside a <form>).
     */
    const {
        children,
        variant: _v,
        className: _c,
        disabled: _d,
        type,             // we allow callers to override type if they want
        ...rest
    } = props;

    return (
        <button
            className={classes}
            disabled={disabled}
            type={type ?? "button"}
            {...rest}
        >
            {children}
        </button>
    );
}
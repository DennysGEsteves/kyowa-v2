import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ActionButtonVariant = "primary" | "ghost" | "danger";

const variantClass: Record<ActionButtonVariant, string> = {
  primary:
    "bg-kyowa-maroon text-white font-semibold uppercase tracking-wide hover:bg-kyowa-maroon-dark",
  ghost: "font-medium text-kyowa-muted hover:text-kyowa-ink",
  danger: "bg-red-700 font-semibold text-white hover:bg-red-800",
};

type ActionButtonProps = {
  variant?: ActionButtonVariant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={`px-4 py-2.5 text-sm transition ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

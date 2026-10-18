import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ActionButtonVariant = "primary" | "ghost" | "danger";
export type ActionButtonSize = "default" | "sm";

const variantClass: Record<ActionButtonVariant, string> = {
  primary:
    "bg-kyowa-maroon text-white font-semibold uppercase tracking-wide hover:bg-kyowa-maroon-dark",
  ghost: "font-medium text-kyowa-muted hover:text-kyowa-ink",
  danger: "bg-red-700 font-semibold text-white hover:bg-red-800",
};

function sizeClass(
  variant: ActionButtonVariant,
  size: ActionButtonSize,
): string {
  if (size === "default") {
    return "px-4 py-2.5 text-sm";
  }
  if (variant === "ghost") {
    return "p-2 text-sm";
  }
  return "px-2.5 py-1 text-sm";
}

type ActionButtonProps = {
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton({
  variant = "primary",
  size = "default",
  children,
  className = "",
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={`${sizeClass(variant, size)} transition ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

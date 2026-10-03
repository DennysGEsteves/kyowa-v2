type KyowaLogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function KyowaLogo({ variant = "dark", className = "" }: KyowaLogoProps) {
  const isLight = variant === "light";

  return (
    <div className={`leading-tight ${className}`}>
      <p
        className={`font-serif text-2xl font-bold tracking-[0.3em] sm:text-3xl sm:tracking-[0.35em] ${
          isLight ? "text-white" : "text-kyowa-maroon"
        }`}
      >
        KYOWA
      </p>
      <p
        className={`mt-1 text-[10px] font-sans uppercase tracking-[0.2em] ${
          isLight ? "text-white/85" : "text-kyowa-muted"
        }`}
      >
        Tudo pra sua casa, muito pra sua vida.
      </p>
    </div>
  );
}

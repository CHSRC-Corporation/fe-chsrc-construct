import { type ButtonHTMLAttributes } from "react";
import "./button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  /** Exibe spinner e desabilita o botão durante envios assíncronos. */
  loading?: boolean;
  /** Ocupa 100% da largura do contêiner. */
  fullWidth?: boolean;
  loadingLabel?: string;
};

export function Button({
  label,
  className,
  loading = false,
  fullWidth = false,
  loadingLabel = "Enviando...",
  disabled,
  type,
  ...rest
}: ButtonProps) {
  const classes = ["btn-primary", fullWidth ? "btn-primary--block" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      type={type ?? "button"}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className="btn-primary__spinner" aria-hidden="true" /> : null}
      <span>{loading ? loadingLabel : label}</span>
    </button>
  );
}

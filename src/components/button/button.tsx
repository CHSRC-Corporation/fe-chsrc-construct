import { ButtonHTMLAttributes } from "react";
import "./button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export function Button({ label, className, ...rest }: ButtonProps) {
  return (
    <button className={`btn-primary ${className ?? ""}`.trim()} type="button" {...rest}>
      {label}
    </button>
  );
}

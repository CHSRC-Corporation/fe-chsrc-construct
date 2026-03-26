import { ChangeEvent, InputHTMLAttributes, ReactNode, useMemo } from "react";
import "./input.scss";

type InputProps = {
  id?: string;
  label?: string;
  icon?: ReactNode;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export function Input({
  id,
  label,
  icon,
  error,
  placeholder,
  value,
  onChange,
  ...rest
}: InputProps) {
  const computedId = useMemo(() => {
    if (id) return id;
    if (label) return `input-${label.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
    return "input-field";
  }, [id, label]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
  };

  return (
    <div className={`input-control ${error ? "input-control--error" : ""}`}>
      {label ? (
        <label htmlFor={computedId} className="input-control__label">
          {label}
        </label>
      ) : null}

      <div className="input-wrap">
        {icon ? <span className="input-wrap__icon">{icon}</span> : null}

        <input
          id={computedId}
          className="input-wrap__input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...rest}
        />
      </div>

      {error ? <span className="input-control__error">{error}</span> : null}
    </div>
  );
}

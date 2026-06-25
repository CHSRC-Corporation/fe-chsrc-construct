import { ChangeEvent, InputHTMLAttributes, ReactNode, useMemo } from 'react';
import './input.scss';

type InputProps = {
  id?: string;
  label?: string;
  icon?: ReactNode;
  /** Ação opcional renderizada à direita do campo (ex.: mostrar/ocultar senha). */
  trailing?: ReactNode;
  /** Texto auxiliar exibido abaixo do campo quando não há erro. */
  hint?: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export function Input({
  id,
  label,
  icon,
  trailing,
  hint,
  error,
  placeholder,
  value,
  onChange,
  required,
  ...rest
}: InputProps) {
  const computedId = useMemo(() => {
    if (id) return id;
    if (label)
      return `input-${label.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
    return 'input-field';
  }, [id, label]);

  const describedById = error
    ? `${computedId}-error`
    : hint
      ? `${computedId}-hint`
      : undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
  };

  return (
    <div className={`input-control ${error ? 'input-control--error' : ''}`}>
      {label ? (
        <label htmlFor={computedId} className="input-control__label">
          {label}
          {required ? (
            <span className="input-control__required" aria-hidden="true">
              {' '}
              *
            </span>
          ) : null}
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
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedById}
          {...rest}
        />

        {trailing ? (
          <span className="input-wrap__trailing">{trailing}</span>
        ) : null}
      </div>

      {error ? (
        <span
          id={`${computedId}-error`}
          className="input-control__error"
          role="alert"
        >
          {error}
        </span>
      ) : hint ? (
        <span id={`${computedId}-hint`} className="input-control__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

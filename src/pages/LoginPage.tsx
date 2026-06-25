import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaHardHat,
  FaLock,
} from "react-icons/fa";
import { Input } from "../components/input/input";
import { Button } from "../components/button/button";
import isValidEmail from "../utils/isValidEmail";
import login from "../utils/login";
import "../styles/auth.scss";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

type FormErrors = Partial<Record<"email" | "password", string>>;

const INITIAL_FORM: FormState = {
  email: "",
  password: "",
  remember: false,
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.email.trim()) {
    errors.email = "Informe seu email.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Digite um email válido.";
  }

  if (!values.password) {
    errors.password = "Informe sua senha.";
  }

  return errors;
}

export function LoginPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loggedUser, setLoggedUser] = useState<string | null>(null);

  const setField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "remember" ? event.target.checked : event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (field !== "remember" && errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (serverError) setServerError("");
    };

  const validateField = (field: keyof FormErrors) => () => {
    const fieldError = validate(form)[field];
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError("");

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      // TODO(back-end): substituir o mock pela autenticação real, ex.:
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      // });
      // if (!res.ok) throw new Error("invalid_credentials");
      await new Promise((resolve) => setTimeout(resolve, 700));
      const result = login(form.email.trim(), form.password);
      if (!result.success) {
        setServerError("Email ou senha inválidos. Verifique e tente novamente.");
        return;
      }
      setLoggedUser(result.user.email);
    } catch {
      setServerError("Não foi possível entrar agora. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth">
      <header className="auth__hero">
        <span className="auth__badge">
          <FaHardHat aria-hidden="true" />
          CHSRC Construct
        </span>
        <h2 className="auth__hero-title">Bem-vindo de volta</h2>
        <p className="auth__hero-text">
          Acesse sua conta para continuar suas aulas de engenharia civil de onde
          você parou.
        </p>
      </header>

      {loggedUser ? (
        <div className="auth__success" role="status">
          <FaCheckCircle aria-hidden="true" className="auth__success-icon" />
          <div>
            <h3>Login realizado com sucesso!</h3>
            <p>
              Você entrou como <strong>{loggedUser}</strong>. Suas aulas já estão
              liberadas.
            </p>
          </div>
        </div>
      ) : (
        <div className="auth__body">
          <div className="auth__head">
            <h3>Entrar</h3>
            <p>Informe seu email e senha para acessar sua conta.</p>
          </div>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <Input
              label="Email"
              type="email"
              placeholder="voce@exemplo.com"
              autoComplete="email"
              icon={<FaEnvelope size={16} />}
              value={form.email}
              onChange={setField("email")}
              onBlur={validateField("email")}
              error={errors.email}
              required
            />

            <Input
              label="Senha"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              icon={<FaLock size={16} />}
              value={form.password}
              onChange={setField("password")}
              onBlur={validateField("password")}
              error={errors.password}
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              }
            />

            <div className="auth__options">
              <label className="auth__check">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={setField("remember")}
                />
                <span>Lembrar de mim</span>
              </label>
              <a className="auth__forgot" href="#recuperar-senha">
                Esqueci minha senha
              </a>
            </div>

            {serverError ? (
              <p className="auth__server-error" role="alert">
                {serverError}
              </p>
            ) : null}

            <Button
              type="submit"
              label="Entrar"
              loadingLabel="Entrando..."
              loading={submitting}
              fullWidth
            />
          </form>

          <p className="auth__footer">
            Ainda não tem uma conta? <Link to="/cadastro">Criar conta gratuita</Link>
          </p>
        </div>
      )}
    </section>
  );
}

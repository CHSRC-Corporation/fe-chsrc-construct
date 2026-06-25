import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaHardHat,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { Input } from "../components/input/input";
import { Button } from "../components/button/button";
import isValidEmail from "../utils/isValidEmail";
import isValidPassword from "../utils/isValidPassword";
import "../styles/auth.scss";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  terms: false,
};

const PASSWORD_HINT =
  "Mínimo de 8 caracteres, com letra maiúscula, minúscula, número e símbolo.";

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Informe seu nome completo.";
  } else if (values.name.trim().length < 3) {
    errors.name = "O nome deve ter pelo menos 3 caracteres.";
  }

  if (!values.email.trim()) {
    errors.email = "Informe seu email.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Digite um email válido.";
  }

  if (!values.password) {
    errors.password = "Crie uma senha.";
  } else if (!isValidPassword(values.password)) {
    errors.password = PASSWORD_HINT;
  }

  if (!values.confirm) {
    errors.confirm = "Confirme sua senha.";
  } else if (values.confirm !== values.password) {
    errors.confirm = "As senhas não coincidem.";
  }

  if (!values.terms) {
    errors.terms = "É preciso aceitar os termos para continuar.";
  }

  return errors;
}

export function CreateUserPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const setField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "terms" ? event.target.checked : event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validateField = (field: keyof FormState) => () => {
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
      // TODO(back-end): substituir pela chamada real de cadastro, ex.:
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: form.name.trim(),
      //     email: form.email.trim(),
      //     password: form.password,
      //   }),
      // });
      // if (!res.ok) throw new Error("request_failed");
      await new Promise((resolve) => setTimeout(resolve, 900));
      setSuccess(true);
    } catch {
      setServerError(
        "Não foi possível criar sua conta agora. Tente novamente em instantes.",
      );
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
        <h2 className="auth__hero-title">
          Comece a construir seu futuro na engenharia civil
        </h2>
        <p className="auth__hero-text">
          Crie sua conta gratuita e tenha acesso a todas as aulas, do canteiro de
          obras ao cálculo estrutural.
        </p>
        <ul className="auth__benefits">
          <li>100% gratuito</li>
          <li>Trilhas guiadas por profissionais</li>
          <li>Estude no seu ritmo</li>
        </ul>
      </header>

      {success ? (
        <div className="auth__success" role="status">
          <FaCheckCircle aria-hidden="true" className="auth__success-icon" />
          <div>
            <h3>Conta criada com sucesso!</h3>
            <p>
              Bem-vindo(a), {form.name.trim().split(" ")[0]}. Já pode{" "}
              <Link to="/">acessar sua conta</Link> e começar a estudar.
            </p>
          </div>
        </div>
      ) : (
        <div className="auth__body">
          <div className="auth__head">
            <h3>Crie sua conta</h3>
            <p>Leva menos de um minuto e não custa nada.</p>
          </div>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <Input
              label="Nome completo"
              placeholder="Digite seu nome"
              autoComplete="name"
              icon={<FaUser size={16} />}
              value={form.name}
              onChange={setField("name")}
              onBlur={validateField("name")}
              error={errors.name}
              required
            />

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
              placeholder="Crie uma senha forte"
              autoComplete="new-password"
              icon={<FaLock size={16} />}
              value={form.password}
              onChange={setField("password")}
              onBlur={validateField("password")}
              error={errors.password}
              hint={PASSWORD_HINT}
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

            <Input
              label="Confirmar senha"
              type={showPassword ? "text" : "password"}
              placeholder="Repita a senha"
              autoComplete="new-password"
              icon={<FaLock size={16} />}
              value={form.confirm}
              onChange={setField("confirm")}
              onBlur={validateField("confirm")}
              error={errors.confirm}
              required
            />

            <label className="auth__check">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={setField("terms")}
              />
              <span>
                Li e aceito os <a href="#termos">Termos de Uso</a> e a{" "}
                <a href="#privacidade">Política de Privacidade</a>.
              </span>
            </label>
            {errors.terms ? (
              <span className="auth__field-error" role="alert">
                {errors.terms}
              </span>
            ) : null}

            {serverError ? (
              <p className="auth__server-error" role="alert">
                {serverError}
              </p>
            ) : null}

            <Button
              type="submit"
              label="Criar conta gratuita"
              loadingLabel="Criando conta..."
              loading={submitting}
              fullWidth
            />
          </form>

          <p className="auth__footer">
            Já tem uma conta? <Link to="/">Entrar</Link>
          </p>
        </div>
      )}
    </section>
  );
}

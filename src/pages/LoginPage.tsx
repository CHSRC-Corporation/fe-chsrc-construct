import { FaEnvelope, FaLock } from "react-icons/fa";
import { Input } from "../components/input/input";
import { Button } from "../components/button/button";

export function LoginPage() {
  return (
    <section>
      <h2 className="page-title">Login</h2>
      <p>Informe seu email e senha para acessar sua conta.</p>

      <div style={{ marginTop: "1.5rem", maxWidth: 320, display: "grid", gap: "0.75rem" }}>
        <Input
          label="Email"
          placeholder="Digite seu email"
          icon={<FaEnvelope size={16} />}
        />
        <Input
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          icon={<FaLock size={16} />}
        />
        <Button label="Entrar" />
      </div>
    </section>
  );
}

import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Input } from "../components/input/input";
import { Button } from "../components/button/button";

export function CreateUserPage() {
  return (
    <section>
      <h2 className="page-title">Crie seu usuário</h2>
      <p>Por favor, preencha os campos abaixo para criar seu usuário.</p>

      <div style={{ marginTop: "1.5rem", maxWidth: 320, display: "grid", gap: "0.75rem" }}>
        <Input
          label="Nome"
          placeholder="Digite seu nome"
          icon={<FaUser size={16} />}
        />
        <Input
          label="Email"
          placeholder="Digite seu email"
          icon={<FaEnvelope size={16} />}
        />
        <Input
          label="Password"
          placeholder="Digite sua senha"
          icon={<FaLock size={16} />}
        />
        <Button label="Criar Usuário" />
      </div>
    </section>
  );
}

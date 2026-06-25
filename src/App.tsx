import { Link, Navigate, Route, Routes } from "react-router-dom";
import { CreateUserPage } from "./pages/CreateUserPage";
import { LoginPage } from "./pages/LoginPage";
import "./styles/app.scss";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <Link to="/" className="page-title app__brand">
          CHSRC Construct
        </Link>
        <nav className="app__nav">
          <Link to="/cadastro">Criar conta</Link>
        </nav>
      </header>

      <main className="app__content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<CreateUserPage />} />
          {/* Mantém compatibilidade com a antiga rota /login */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

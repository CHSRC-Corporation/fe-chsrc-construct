import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { CreateUserPage } from './pages/CreateUserPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { ForumPage } from './pages/ForumPage';
import { PostPage } from './pages/PostPage';
import { useAuth } from './auth/AuthContext';
import { RedirectIfAuthenticated, RequireAuth } from './auth/guards';
import './styles/app.scss';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();

  const inApp = ['/home', '/aula', '/forum'].some((path) =>
    location.pathname.startsWith(path)
  );
  const isCadastro = location.pathname.startsWith('/cadastro');

  const handleSignOut = () => {
    signOut();
    navigate('/', { replace: true });
  };

  return (
    <div className="app">
      <header className="app__header">
        <Link
          to={isAuthenticated ? '/home' : '/'}
          className="page-title app__brand"
        >
          CHSRC Construct
        </Link>
        <nav className="app__nav">
          {inApp ? (
            <>
              <NavLink to="/home">Início</NavLink>
              <NavLink to="/forum">Fórum</NavLink>
              <button
                type="button"
                className="app__nav-exit"
                onClick={handleSignOut}
              >
                Sair
              </button>
            </>
          ) : isCadastro ? (
            <Link to="/">Entrar</Link>
          ) : (
            <Link to="/cadastro">Criar conta</Link>
          )}
        </nav>
      </header>

      <main className="app__content">
        <Routes>
          {/* Rotas públicas (mandam o usuário logado para a home) */}
          <Route
            path="/"
            element={
              <RedirectIfAuthenticated>
                <LoginPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/cadastro"
            element={
              <RedirectIfAuthenticated>
                <CreateUserPage />
              </RedirectIfAuthenticated>
            }
          />

          {/* Rotas protegidas (exigem autenticação) */}
          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/aula/:id"
            element={
              <RequireAuth>
                <LessonPage />
              </RequireAuth>
            }
          />
          <Route
            path="/forum"
            element={
              <RequireAuth>
                <ForumPage />
              </RequireAuth>
            }
          />
          <Route
            path="/forum/:id"
            element={
              <RequireAuth>
                <PostPage />
              </RequireAuth>
            }
          />

          {/* Mantém compatibilidade com a antiga rota /login */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

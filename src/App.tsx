import { Link, Navigate, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { CreateUserPage } from "./pages/CreateUserPage";
import "./styles/app.scss";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="page-title">CHSRC Construct</h1>
        <nav className="app__nav">
          {/* <Link to="/">Home</Link> */}
          {/* <Link to="/sobre">Sobre</Link> */}
        </nav>
      </header>

      <main className="app__content">
        <Routes>
          <Route path="/" element={<CreateUserPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

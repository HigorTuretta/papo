import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

      {/* Rotas privadas */}
      <Route path="/" element={user ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/contacts" element={user ? <Contacts /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;

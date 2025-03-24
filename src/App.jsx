import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import { useState } from "react";

function App() {
  const { user, loading } = useAuth();
  const [selectedContact, setSelectedContact] = useState(null);

  if (loading) return <div>Carregando...</div>;

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <Layout
                selectedContact={selectedContact}
                onSelectContact={setSelectedContact}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </>
      )}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;

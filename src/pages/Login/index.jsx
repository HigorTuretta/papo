import { Container, Form, Input, Button, GoogleButton, Title, LinkText } from "./styles";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login realizado!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao fazer login.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Title>Bem-vindo ao Papo 💬</Title>
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
        <GoogleButton type="button" onClick={loginWithGoogle}>
          <FaGoogle /> Entrar com Google
        </GoogleButton>

        <LinkText>
          Ainda não tem uma conta? <Link to="/register">Crie uma agora</Link>
        </LinkText>
      </Form>
    </Container>
  );
};

export default Login;

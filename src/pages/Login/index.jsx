import {
  Container,
  CenterBox,
  Logo,
  Slogan,
  FormCard,
  Title,
  Input,
  Button,
  GoogleButton,
  LinkText,
} from "./styles";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import LogoImg from "../../assets/Logo.png";

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

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Login com Google realizado!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao entrar com o Google.");
    }
  };

  return (
    <Container>
      <CenterBox>
        <Slogan>SÓ MANDAR O </Slogan>
        <Logo>
          <img src={LogoImg} alt="logo" />
          <span>papo.</span>
        </Logo>

        <FormCard onSubmit={handleLogin}>
          <Title>Bem vindo(a)! 😁</Title>
          <Input
            placeholder="Seu e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Entrar</Button>
          <GoogleButton type="button" onClick={handleGoogleLogin}>
            <FaGoogle />
            Entrar com Google
          </GoogleButton>
          <LinkText>
            Ainda não tem uma conta? <Link to="/register">Criar agora!</Link>
          </LinkText>
          <LinkText>
            Esqueceu a senha? <Link to="/forgot-password">Recupere ela!</Link>
          </LinkText>
        </FormCard>
      </CenterBox>
    </Container>
  );
};

export default Login;

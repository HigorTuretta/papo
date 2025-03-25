import {
  Container,
  CenterBox,
  Logo,
  Slogan,
  FormCard,
  Title,
  Input,
  Button,
  LinkText,
} from "./styles";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LogoImg from "../../assets/Logo.png";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      toast.error("Erro ao enviar email.");
    }
  };

  return (
    <Container>
      <CenterBox>
        <Slogan>SÓ MANDAR O</Slogan>
        <Logo>
          <img src={LogoImg} alt="logo" />
          <span>papo.</span>
        </Logo>

        {emailSent ? (
          <FormCard>
            <Title>Link enviado ✅</Title>
            <p
              style={{ color: "#ccc", textAlign: "center", marginTop: "1rem" }}
            >
              Enviamos um link de redefinição para <strong>{email}</strong>.
              <br />
              <br />
              Dá uma olhadinha na sua caixa de entrada ou no spam 👀
            </p>
            <Button onClick={() => setEmailSent(false)}>
              Enviar novamente
            </Button>
            <LinkText>
              <Link to="/login">Voltar para o login</Link>
            </LinkText>
          </FormCard>
        ) : (
          <FormCard onSubmit={handleReset}>
            <Title>Esqueci minha senha</Title>
            <Input
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Enviar link</Button>
            <LinkText>
              Lembrou? <Link to="/login">Entrar</Link>
            </LinkText>
          </FormCard>
        )}
      </CenterBox>
    </Container>
  );
};

export default ForgotPassword;

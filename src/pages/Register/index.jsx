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
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import LogoImg from "../../assets/Logo.png";

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register(email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email: res.user.email,
        displayName: "",
        photoURL: "",
      });

      toast.success("Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao criar conta.");
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

        <FormCard onSubmit={handleRegister}>
          <Title>Criar Conta</Title>
          <Input
            placeholder="Seu e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="false"
          />
          <Input
            placeholder="Crie uma senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="false"
          />
          <Button type="submit">Cadastrar</Button>
          <LinkText>
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </LinkText>
        </FormCard>
      </CenterBox>
    </Container>
  );
};

export default Register;

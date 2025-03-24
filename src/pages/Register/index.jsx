import { Container, Form, Input, Button, Title, LinkText } from "./styles";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register(email, password);

      // salva no Firestore
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
      <Form onSubmit={handleRegister}>
        <Title>Criar Conta 📝</Title>
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
        <Button type="submit">Cadastrar</Button>

        <LinkText>
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </LinkText>
      </Form>
    </Container>
  );
};

export default Register;

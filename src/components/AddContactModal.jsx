import { useState } from "react";
import styled from "styled-components";
import { db } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { FiX } from "react-icons/fi";

const AddContactModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      if (!user?.uid) return setStatus("Erro: Usuário não autenticado.");
      if (email === user.email) return setStatus("Você não pode adicionar a si mesmo.");

      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return setStatus("Usuário não encontrado.");

      const toUid = snapshot.docs[0].id;

      await addDoc(collection(db, "friendRequests"), {
        from: user.uid,
        fromEmail: user.email,
        to: toUid,
        toEmail: email,
        status: "pending",
        createdAt: Timestamp.now(),
      });

      setStatus("Solicitação enviada com sucesso!");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao enviar solicitação.");
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}><FiX size={20} /></CloseButton>
        <Title>Adicionar Contato</Title>

        <form onSubmit={handleAdd}>
          <Input
            placeholder="Digite o e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Enviar solicitação</Button>
        </form>

        {status && <Status>{status}</Status>}
      </Modal>
    </Overlay>
  );
};

export default AddContactModal;


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  position: relative;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.surface};
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Status = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.info};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  cursor: pointer;
`;

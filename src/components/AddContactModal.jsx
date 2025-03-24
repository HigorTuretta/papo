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

const AddContactModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      // Verificação da autenticação
      if (!user || !user.uid) {
        console.error("Usuário não autenticado ou UID ausente.");
        setStatus("Erro: Usuário não autenticado.");
        return;
      }

      console.log("Usuário autenticado. UID:", user.uid); // Log da autenticação

      if (email === user.email) {
        setStatus("Você não pode adicionar a si mesmo.");
        return;
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setStatus("Usuário não encontrado.");
        return;
      }

      const toUser = querySnapshot.docs[0];
      const toUid = toUser.id;

      console.log("To UID:", toUid);

      const friendRequestData = {
        from: user.uid,
        fromEmail: user.email,
        to: toUid,
        toEmail: email,
        status: "pending",
        createdAt: Timestamp.now(),
      };

      console.log("Dados da solicitação:", friendRequestData); // Log dos dados
      console.log("Usuário autenticado:", user?.uid);
      await addDoc(collection(db, "friendRequests"), friendRequestData);

      setStatus("Solicitação enviada!");
      setEmail("");
    } catch (err) {
      console.error("Erro ao enviar solicitação:", err);
      setStatus("Erro ao enviar solicitação.");
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <h3>Adicionar Contato</h3>
        <form onSubmit={handleAdd}>
          <input
            placeholder="E-mail do contato"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
        {status && <p>{status}</p>}
        <button onClick={onClose}>Fechar</button>
      </Modal>
    </Overlay>
  );
};

export default AddContactModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;

  input {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 8px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  button {
    margin-right: 0.5rem;
    padding: 0.75rem 1rem;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.surface};
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  p {
    margin-top: 0.75rem;
    color: ${({ theme }) => theme.info};
  }
`;
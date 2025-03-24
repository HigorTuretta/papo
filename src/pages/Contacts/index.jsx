import {
  Container,
  Header,
  AddButton,
  Section,
  Title,
  RequestList,
  RequestItem,
  RequestButtons,
} from "./styles";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  onSnapshot,
  updateDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import AddContactModal from "../../components/AddContactModal";

const Contacts = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "friendRequests"),
      where("to", "==", user.uid),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(list);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAccept = async (req) => {
    const fromRef = doc(db, "users", req.from);
    const toRef = doc(db, "users", req.to);
    const fromSnap = await getDoc(fromRef);
    const toSnap = await getDoc(toRef);

    if (!fromSnap.exists() || !toSnap.exists()) return;

    const fromData = fromSnap.data();
    const toData = toSnap.data();

    // Adiciona um ao outro na lista de contatos
    await setDoc(doc(db, "contacts", req.to, "list", req.from), {
      uid: req.from,
      displayName: fromData.displayName,
      photoURL: fromData.photoURL || "",
      email: fromData.email,
    });

    await setDoc(doc(db, "contacts", req.from, "list", req.to), {
      uid: req.to,
      displayName: toData.displayName,
      photoURL: toData.photoURL || "",
      email: toData.email,
    });

    // Atualiza status da requisição
    await updateDoc(doc(db, "friendRequests", req.id), {
      status: "accepted",
      respondedAt: Timestamp.now(),
    });
  };

  const handleReject = async (reqId) => {
    await updateDoc(doc(db, "friendRequests", reqId), {
      status: "rejected",
      respondedAt: Timestamp.now(),
    });
  };

  return (
    <Container>
      <Header>
        <h2>Seus Contatos</h2>
        <AddButton onClick={() => setShowModal(true)}>Adicionar</AddButton>
      </Header>

      <Section>
        <Title>Solicitações Pendentes</Title>
        <RequestList>
          {requests.length === 0 ? (
            <p>Nenhuma solicitação no momento.</p>
          ) : (
            requests.map((req) => (
              <RequestItem key={req.id}>
                <p>Solicitação de: {req.fromEmail}</p>
                <RequestButtons>
                  <button onClick={() => handleAccept(req)}>Aceitar</button>
                  <button onClick={() => handleReject(req.id)}>Recusar</button>
                </RequestButtons>
              </RequestItem>
            ))
          )}
        </RequestList>
      </Section>

      <AddContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </Container>
  );
};

export default Contacts;

import {
  Container,
  ContactItem,
  Badge,
  Footer,
  NavButton,
  NavRow,
  FooterBottom,
  Logo,
  Attribution,
  SectionTitle,
  RequestItem,
  RequestButtons,
  ScrollArea,
} from "./styles";

import LogoImg from "../../assets/Logo.png";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import AddContactModal from "../AddContactModal";
import {
  FiUserPlus,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { version } from "../../../package.json";

const ContactSidebar = ({ onSelectContact }) => {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [unreads, setUnreads] = useState({});
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const navigate = useNavigate();

  const toggleFooter = () => setIsFooterOpen((prev) => !prev);

  // 🔔 Solicitações de amizade
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "friendRequests"),
      where("to", "==", user.uid),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(list);
    });

    return () => unsubscribe();
  }, [user]);

  // 🧠 Buscar contatos com ordenação pela última mensagem
  useEffect(() => {
    if (!user) return;

    const ref = collection(db, "contacts", user.uid, "list");
    const unsubContacts = onSnapshot(ref, async (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());

      const enriched = await Promise.all(
        list.map(async (c) => {
          const conversationId =
            user.uid < c.uid ? `${user.uid}_${c.uid}` : `${c.uid}_${user.uid}`;

          const convoRef = doc(db, "conversations", conversationId);
          const convoSnap = await getDoc(convoRef);
          const lastMessageAt = convoSnap.exists()
            ? convoSnap.data().lastMessageAt?.toMillis?.() || 0
            : 0;

          return { ...c, lastMessageAt };
        })
      );

      const sorted = enriched.sort((a, b) => b.lastMessageAt - a.lastMessageAt);
      setContacts(sorted);
    });

    return () => unsubContacts();
  }, [user]);

  // 🔄 Atualizar contador de não lidas por conversa
  useEffect(() => {
    if (!user || contacts.length === 0) return;

    const unsubList = [];

    contacts.forEach((contact) => {
      const conversationId =
        user.uid < contact.uid
          ? `${user.uid}_${contact.uid}`
          : `${contact.uid}_${user.uid}`;

      const q = query(
        collection(db, "conversations", conversationId, "messages"),
        where("to", "==", user.uid),
        where("read", "==", false)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUnreads((prev) => ({
          ...prev,
          [conversationId]: snapshot.size,
        }));
      });

      unsubList.push(unsubscribe);
    });

    return () => unsubList.forEach((unsub) => unsub());
  }, [user, contacts]);

  // 🧠 Atualiza o título da aba com total de não lidas
  useEffect(() => {
    const totalUnreads = Object.values(unreads).reduce(
      (sum, count) => sum + count,
      0
    );

    document.title = totalUnreads > 0 ? `(${totalUnreads}) papo.` : "papo.";
  }, [unreads]);

  const handleAccept = async (req) => {
    const fromRef = doc(db, "users", req.from);
    const toRef = doc(db, "users", req.to);
    const fromSnap = await getDoc(fromRef);
    const toSnap = await getDoc(toRef);
    if (!fromSnap.exists() || !toSnap.exists()) return;

    await setDoc(doc(db, "contacts", req.to, "list", req.from), {
      uid: req.from,
      displayName: fromSnap.data().displayName,
      photoURL: fromSnap.data().photoURL || "",
      email: fromSnap.data().email,
    });

    await setDoc(doc(db, "contacts", req.from, "list", req.to), {
      uid: req.to,
      displayName: toSnap.data().displayName,
      photoURL: toSnap.data().photoURL || "",
      email: toSnap.data().email,
    });

    await updateDoc(doc(db, "friendRequests", req.id), {
      status: "accepted",
    });
  };

  const handleReject = async (reqId) => {
    await updateDoc(doc(db, "friendRequests", reqId), {
      status: "rejected",
    });
  };

  return (
    <Container>
      <ScrollArea>
        {requests.length > 0 && (
          <>
            <SectionTitle>Solicitações</SectionTitle>
            {requests.map((req) => (
              <RequestItem key={req.id}>
                <span>{req.fromEmail}</span>
                <RequestButtons>
                  <button onClick={() => handleAccept(req)}>✔</button>
                  <button onClick={() => handleReject(req.id)}>✖</button>
                </RequestButtons>
              </RequestItem>
            ))}
          </>
        )}

        <SectionTitle>Contatos</SectionTitle>
        {contacts.map((c) => {
          const conversationId =
            user.uid < c.uid ? `${user.uid}_${c.uid}` : `${c.uid}_${user.uid}`;
          const count = unreads[conversationId] || 0;

          return (
            <ContactItem key={c.uid} onClick={() => onSelectContact(c)}>
              <img src={c.photoURL || "/profile.jpeg"} alt="avatar" />
              <span>{c.displayName || c.email}</span>
              {count > 0 && <Badge>{count}</Badge>}
            </ContactItem>
          );
        })}
      </ScrollArea>

      <Footer $isOpen={isFooterOpen}>
        <div className="toggle" onClick={toggleFooter}>
          {isFooterOpen ? <FiChevronDown /> : <FiChevronUp />}
          <span>
            {isFooterOpen ? "Esconder opções" : "Mostrar opções"}
          </span>
        </div>

        <div className="content">
          <NavRow>
            <NavButton onClick={() => setShowModal(true)}>
              <FiUserPlus />
              Contato
            </NavButton>
            <NavButton onClick={() => navigate("/profile")}>
              <FiUser />
              Perfil
            </NavButton>
          </NavRow>

          <NavRow>
            <NavButton onClick={logout}>
              <FiLogOut />
              Sair
            </NavButton>
            <ThemeToggle />
          </NavRow>
        </div>

        <FooterBottom>
          <Logo>
            <img src={LogoImg} />
            papo.
          </Logo>
          <Attribution>
            Powered by Turetta <br /> v{version}
          </Attribution>
        </FooterBottom>
      </Footer>

      <AddContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </Container>
  );
};

export default ContactSidebar;

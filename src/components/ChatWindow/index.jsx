import { useEffect, useRef, useState } from "react";
import {
  Container,
  Header,
  Messages,
  InputArea,
  Input,
  SendButton,
  ContactName,
  ContactInfo,
  ContactAvatar,
} from "./styles";
import { db } from "../../services/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { FaPaperPlane } from "react-icons/fa";
import ChatMessage from "../ChatMessage";

const ChatWindow = ({ contact }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

  const conversationId =
    user.uid < contact.uid
      ? `${user.uid}_${contact.uid}`
      : `${contact.uid}_${user.uid}`;

  useEffect(() => {
    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);

      msgs.forEach((msg) => {
        if (msg.to === user.uid && !msg.read) {
          updateDoc(doc(db, "conversations", conversationId, "messages", msg.id), {
            read: true,
          });
        }
      });
    });

    return () => unsubscribe();
  }, [conversationId, user.uid]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    await addDoc(collection(db, "conversations", conversationId, "messages"), {
      from: user.uid,
      to: contact.uid,
      text: message,
      createdAt: serverTimestamp(),
      read: false,
      reaction: "", // inicializa o campo
    });

    setMessage("");
  };

  return (
    <Container>
      <Header>
        <ContactAvatar src={contact.photoURL || "/default-avatar.png"} />
        <ContactInfo>
          <ContactName>{contact.displayName || contact.email}</ContactName>
          <span>Online</span>
        </ContactInfo>
      </Header>

      <Messages ref={messagesRef}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            msg={msg}
            isSender={msg.from === user.uid}
            conversationId={conversationId}
          />
        ))}
      </Messages>

      <InputArea onSubmit={handleSend}>
        <Input
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton type="submit">
          <FaPaperPlane />
        </SendButton>
      </InputArea>
    </Container>
  );
};

export default ChatWindow;

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
  DateSeparator,
  SeparatorWrapper,
  ImageButton,
  ImageInput
} from "./styles";
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
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { FaPaperPlane, FaCamera } from "react-icons/fa";
import ChatMessage from "../ChatMessage";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import CryptoJS from "crypto-js";
import imageCompression from "browser-image-compression";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const SECRET_KEY = import.meta.env.VITE_CHAT_SECRET_KEY;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const encryptMessage = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

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
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
      text: encryptMessage(message),
      createdAt: serverTimestamp(),
      read: false,
      reaction: "",
      type: "text"
    });

    setMessage("");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.secure_url) throw new Error("Upload falhou");

      await addDoc(collection(db, "conversations", conversationId, "messages"), {
        from: user.uid,
        to: contact.uid,
        createdAt: serverTimestamp(),
        read: false,
        type: "image",
        mediaUrl: data.secure_url,
        reaction: ""
      });
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
    }
  };

  const formatDate = (timestamp) => {
    const date = dayjs(timestamp?.toDate());
    if (date.isToday()) return "Hoje";
    if (date.isYesterday()) return "Ontem";
    return date.format("DD [de] MMMM [de] YYYY");
  };

  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach((msg) => {
      const key = dayjs(msg.createdAt?.toDate()).format("YYYY-MM-DD");
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <Container>
      <Header>
        <ContactAvatar src={contact.photoURL || "/profile.jpeg"} />
        <ContactInfo>
          <ContactName>{contact.displayName || contact.email}</ContactName>
          <span>Online</span>
        </ContactInfo>
      </Header>

      <Messages ref={messagesRef}>
        <SeparatorWrapper>
          <DateSeparator>
            🔒 Esta conversa é protegida com criptografia de ponta a ponta.
          </DateSeparator>
        </SeparatorWrapper>

        {Object.keys(groupedMessages).map((dateKey) => (
          <div key={dateKey} style={{ position: "relative", marginTop: "1rem" }}>
            <DateSeparator>{formatDate(dayjs(dateKey))}</DateSeparator>
            {groupedMessages[dateKey].map((msg) => (
              <ChatMessage
                key={msg.id}
                msg={msg}
                isSender={msg.from === user.uid}
                conversationId={conversationId}
              />
            ))}
          </div>
        ))}
      </Messages>

      <InputArea onSubmit={handleSend}>
        <ImageButton htmlFor="image-upload">
          <FaCamera />
        </ImageButton>
        <ImageInput
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
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

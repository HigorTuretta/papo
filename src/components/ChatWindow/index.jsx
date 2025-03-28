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
  ImageInput,
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
import { useTheme } from "../../contexts/ThemeContext";
import messageSendSound from "../../assets/messageSend.mp3";
import messageRecieveSound from "../../assets/messageRecieve.mp3";
import { onValue, ref as rtdbRef } from "firebase/database";
import { rtdb } from "../../services/firebase";
import NotificationBanner from "../NotificationBanner";

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
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [contactStatus, setContactStatus] = useState();
  const [lastSeen, setLastSeen] = useState(null);
  const [contactData, setContactData] = useState(contact);
  const messagesRef = useRef(null);
  const { themeName } = useTheme();

  const isGroupChat = contact?.isGroup;
  const conversationId = isGroupChat
    ? contact.id
    : user.uid < contact.uid
    ? `${user.uid}_${contact.uid}`
    : `${contact.uid}_${user.uid}`;

  const messageCollectionRef = isGroupChat
    ? collection(db, "groups", conversationId, "messages")
    : collection(db, "conversations", conversationId, "messages");

  useEffect(() => {
    const q = query(messageCollectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const newMessages = msgs.filter(
        (msg) => !isGroupChat && msg.to === user.uid && !msg.read
      );

      if (newMessages.length > 0) {
        const audio = new Audio(messageRecieveSound);
        audio.volume = 0.7;
        audio.play().catch((err) =>
          console.warn("Erro ao tocar som de recebimento:", err)
        );
      }

      setMessages(msgs);

      if (!isGroupChat) {
        newMessages.forEach((msg) => {
          updateDoc(
            doc(db, "conversations", conversationId, "messages", msg.id),
            {
              read: true,
            }
          );
        });
      }
    });

    return () => unsubscribe();
  }, [conversationId, user.uid, isGroupChat]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const msgToSend = message;
    setMessage("");

    await addDoc(messageCollectionRef, {
      from: user.uid,
      ...(isGroupChat ? {} : { to: contact.uid }),
      text: encryptMessage(msgToSend),
      createdAt: serverTimestamp(),
      read: false,
      reaction: "",
      type: "text",
    });

    if (!isGroupChat) {
      await updateDoc(doc(db, "conversations", conversationId), {
        lastMessageAt: serverTimestamp(),
      });
    }

    const audio = new Audio(messageSendSound);
    audio.volume = 0.7;
    audio.play().catch((err) => {
      console.warn("Erro ao tocar som:", err);
    });
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

      await addDoc(messageCollectionRef, {
        from: user.uid,
        ...(isGroupChat ? {} : { to: contact.uid }),
        createdAt: serverTimestamp(),
        read: false,
        type: "image",
        mediaUrl: data.secure_url,
        reaction: "",
      });

      if (!isGroupChat) {
        await updateDoc(doc(db, "conversations", conversationId), {
          lastMessageAt: serverTimestamp(),
        });
      }
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

  const handleTypingStatus = async () => {
    if (isGroupChat) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        typingTo: contact.uid,
      });

      if (typingTimeout) clearTimeout(typingTimeout);

      const timeout = setTimeout(async () => {
        await updateDoc(doc(db, "users", user.uid), {
          typingTo: "",
        });
      }, 2000);

      setTypingTimeout(timeout);
    } catch (err) {
      console.error("Erro ao atualizar typing status:", err);
    }
  };

  useEffect(() => {
    if (isGroupChat) return;

    const userRef = doc(db, "users", contact.uid);
    const rtdbStatusRef = rtdbRef(rtdb, `status/${contact.uid}`);

    const unsubscribeFirestore = onSnapshot(userRef, (snap) => {
      const data = snap.data();
      if (data) {
        setIsTyping(data.typingTo === user.uid);
        setContactData(data);
      }
    });

    const unsubscribeRTDB = onValue(rtdbStatusRef, (snap) => {
      const data = snap.val();
      if (data) {
        setContactStatus(data.state);
        setLastSeen(new Date(data.lastChanged));
      }
    });

    return () => {
      unsubscribeFirestore();
      unsubscribeRTDB();
    };
  }, [contact.uid, isGroupChat]);

  return (
    <Container>
      <Header>
        <ContactAvatar
          src={
            isGroupChat
              ? contact.imageURL
              : contactData.photoURL || "/profile.jpeg"
          }
        />
        <ContactInfo>
          <ContactName>
            {isGroupChat
              ? contact.name
              : contactData.displayName || contactData.email}
          </ContactName>
          {!isGroupChat && (
            <span style={{ fontSize: "0.85rem", color: "#ccc" }}>
              {isTyping
                ? "Digitando..."
                : contactStatus === "online"
                ? "Online"
                : lastSeen
                ? `Visto por último às ${dayjs(lastSeen).format("HH:mm")}`
                : ""}
            </span>
          )}
        </ContactInfo>
      </Header>

      <NotificationBanner />

      <Messages ref={messagesRef} $themeName={themeName}>
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
                isGroup={isGroupChat}
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
          onChange={(e) => {
            setMessage(e.target.value);
            handleTypingStatus();
          }}
        />
        <SendButton type="submit">
          <FaPaperPlane />
        </SendButton>
      </InputArea>
    </Container>
  );
};

export default ChatWindow;

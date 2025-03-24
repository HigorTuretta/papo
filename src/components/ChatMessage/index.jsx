// 📁 ChatMessage/index.jsx
import { useRef, useEffect, useState } from "react";
import {
  Container,
  ReactionWrapper,
  Bubble,
  Text,
  Media,
  ReactionMenu,
  ReactionBubble,
} from "./styles";
import { db } from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_CHAT_SECRET_KEY;

const decryptMessage = (encryptedText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    return "[Mensagem não pode ser lida]";
  }
};

const ChatMessage = ({ msg, isSender, conversationId }) => {
  if (!msg) return null;
  const { id, text = "", type = "text", mediaUrl = "", read, reaction } = msg;
  const decryptedText = type === "text" ? decryptMessage(text) : "";

  const [showReactions, setShowReactions] = useState(false);
  const menuRef = useRef(null);
  const bubbleRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState({});

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowReactions(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleMenu = (e) => {
    e.preventDefault();
    const rect = bubbleRef.current.getBoundingClientRect();
    const rightSpace = window.innerWidth - rect.right;
    setMenuStyle(rightSpace < 150 ? { right: 0 } : { left: 0 });
    setShowReactions(true);
  };

  const selectReaction = async (emoji) => {
    setShowReactions(false);
    try {
      await updateDoc(doc(db, "conversations", conversationId, "messages", id), {
        reaction: emoji,
      });
    } catch (err) {
      console.error("Erro ao salvar reação", err);
    }
  };

  const renderText = (txt) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return txt.split(urlRegex).map((part, i) =>
      urlRegex.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <Container $isSender={isSender}>
      <ReactionWrapper>
        <Bubble
          ref={bubbleRef}
          $isSender={isSender}
          onContextMenu={handleMenu}
          onTouchStart={handleMenu}
        >
          {type === "text" && <Text>{renderText(decryptedText)}</Text>}
          {type === "image" && mediaUrl && <Media><img src={mediaUrl} alt="imagem" /></Media>}
          {type === "audio" && mediaUrl && <Media><audio controls src={mediaUrl} /></Media>}
          {type === "video" && mediaUrl && <Media><video controls src={mediaUrl} width="250" /></Media>}
          {isSender && read && (
            <small style={{ fontSize: "0.7rem", opacity: 0.7 }}>✔✔ Lido</small>
          )}
        </Bubble>

        {reaction && (
          <ReactionBubble $isSender={isSender}>{reaction}</ReactionBubble>
        )}

        {showReactions && (
          <ReactionMenu ref={menuRef} style={menuStyle}>
            {["👍", "❤️", "😂", "😮", "😢"].map((emoji) => (
              <span key={emoji} onClick={() => selectReaction(emoji)}>{emoji}</span>
            ))}
          </ReactionMenu>
        )}
      </ReactionWrapper>
    </Container>
  );
};

export default ChatMessage;
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
import { doc, updateDoc, getDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import { MdDoneAll } from "react-icons/md";

const SECRET_KEY = import.meta.env.VITE_CHAT_SECRET_KEY;

const decryptMessage = (encryptedText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    return "[Mensagem não pode ser lida]";
  }
};

const ChatMessage = ({ msg, isSender, conversationId, isGroup }) => {
  if (!msg) return null;
  const { id, text = "", type = "text", mediaUrl = "", read, reaction, createdAt } = msg;
  const decryptedText = type === "text" ? decryptMessage(text) : "";

  const [showReactions, setShowReactions] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [author, setAuthor] = useState(null);
  const menuRef = useRef(null);
  const bubbleRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState({});

  // Busca o autor da mensagem se for grupo
  useEffect(() => {
    if (!isGroup || isSender) return;

    const fetchSender = async () => {
      try {
        const ref = doc(db, "users", msg.from);
        const snap = await getDoc(ref);
        if (snap.exists()) setAuthor(snap.data());
      } catch (err) {
        console.error("Erro ao buscar remetente do grupo:", err);
      }
    };

    fetchSender();
  }, [isGroup, isSender, msg.from]);

  // Fecha menu de reação ao clicar fora
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
    <>
      <Container $isSender={isSender}>
        <ReactionWrapper $isSender={isSender}>

          {/* Exibe nome/avatar se for mensagem de grupo de outro usuário */}
          {isGroup && !isSender && author && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.25rem",
              paddingLeft: "6px"
            }}>
              <img
                src={author.photoURL || "/profile.jpeg"}
                alt={author.displayName || "Usuário"}
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
              <span style={{
                fontSize: "0.8rem",
                fontWeight: "500",
                color: "#999"
              }}>
                {author.displayName || author.email}
              </span>
            </div>
          )}

          {/* Balão da mensagem */}
          <Bubble
            ref={bubbleRef}
            $isSender={isSender}
            onContextMenu={handleMenu}
            onTouchStart={handleMenu}
          >
            {type === "text" && <Text>{renderText(decryptedText)}</Text>}

            {type === "image" && mediaUrl && (
              <Media>
                <img src={mediaUrl} alt="imagem" onClick={() => setPreviewImage(mediaUrl)} />
              </Media>
            )}

            {type === "audio" && mediaUrl && (
              <Media><audio controls src={mediaUrl} /></Media>
            )}

            {type === "video" && mediaUrl && (
              <Media><video controls src={mediaUrl} width="250" /></Media>
            )}

            {/* Hora + Lido */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "4px",
              gap: "4px"
            }}>
              <small style={{
                fontSize: "0.7rem",
                opacity: 0.6,
              }}>
                {createdAt
                  ? dayjs(createdAt.toDate()).format("HH:mm")
                  : "Enviando..."}
              </small>

              {isSender && (
                <MdDoneAll
                  size={14}
                  color={read ? "#4fc3f7" : "#999"}
                  style={{ marginBottom: "1px" }}
                />
              )}
            </div>
          </Bubble>

          {/* Reação exibida no balão */}
          {reaction && (
            <ReactionBubble $isSender={isSender}>{reaction}</ReactionBubble>
          )}

          {/* Menu para escolher reação */}
          {showReactions && (
            <ReactionMenu ref={menuRef} style={menuStyle}>
              {["👍", "❤️", "😂", "😮", "😢"].map((emoji) => (
                <span key={emoji} onClick={() => selectReaction(emoji)}>{emoji}</span>
              ))}
            </ReactionMenu>
          )}
        </ReactionWrapper>
      </Container>

      {/* Preview da imagem em fullscreen */}
      {previewImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out"
          }}
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
          />
        </div>
      )}
    </>
  );
};

export default ChatMessage;

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

const ChatMessage = ({ msg, isSender, conversationId }) => {
  if (!msg) return null;

  const { id, text = "", type = "text", mediaUrl = "", read, reaction } = msg;
  const [showReactions, setShowReactions] = useState(false);
  const menuRef = useRef(null);
  const bubbleRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowReactions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenMenu = (e) => {
    e.preventDefault();
    if (bubbleRef.current) {
      const rect = bubbleRef.current.getBoundingClientRect();
      const rightSpace = window.innerWidth - rect.right;

      setMenuStyle(rightSpace < 150 ? { right: 0 } : { left: 0 });
      setShowReactions(true);
    }
  };

  const handleSelectReaction = async (emoji) => {
    setShowReactions(false);
    try {
      const messageRef = doc(db, "conversations", conversationId, "messages", id);
      await updateDoc(messageRef, { reaction: emoji });
    } catch (err) {
      console.error("Erro ao salvar reação:", err);
    }
  };

  const renderText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) =>
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
          onContextMenu={handleOpenMenu}
          onTouchStart={handleOpenMenu}
        >
          {type === "text" && !!text && <Text>{renderText(text)}</Text>}

          {type === "image" && mediaUrl && (
            <Media><img src={mediaUrl} alt="imagem" /></Media>
          )}
          {type === "audio" && mediaUrl && (
            <Media><audio controls src={mediaUrl} /></Media>
          )}
          {type === "video" && mediaUrl && (
            <Media><video controls src={mediaUrl} width="250" /></Media>
          )}

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
              <span key={emoji} onClick={() => handleSelectReaction(emoji)}>{emoji}</span>
            ))}
          </ReactionMenu>
        )}
      </ReactionWrapper>
    </Container>
  );
};

export default ChatMessage;

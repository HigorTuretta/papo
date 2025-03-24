import { useRef, useEffect, useState } from "react";
import {
  Container,
  ReactionTriggerArea,
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

  const { text = "", type = "text", mediaUrl = "", read, reaction } = msg;
  const [showReactions, setShowReactions] = useState(false);
  const menuRef = useRef(null);

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
    setShowReactions(true);
  };

  const handleSelectReaction = async (emoji) => {
    setShowReactions(false);
    try {
      const messageRef = doc(db, "conversations", conversationId, "messages", msg.id);
      await updateDoc(messageRef, { reaction: emoji });
    } catch (err) {
      console.error("Erro ao salvar reação:", err);
    }
  };

  const renderText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) =>
      urlRegex.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <Container $isSender={isSender}>
      <ReactionTriggerArea onContextMenu={handleOpenMenu} onTouchStart={handleOpenMenu}>
      <Bubble $isSender={isSender} $hasReaction={!!reaction}>
          {type === "text" && <Text>{renderText(text)}</Text>}
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

        {reaction && <ReactionBubble $isSender={isSender}>{reaction}</ReactionBubble>}

        {showReactions && (
          <ReactionMenu ref={menuRef}>
            {["👍", "❤️", "😂", "😮", "😢"].map((emoji) => (
              <span key={emoji} onClick={() => handleSelectReaction(emoji)}>{emoji}</span>
            ))}
          </ReactionMenu>
        )}
      </ReactionTriggerArea>
    </Container>
  );
};

export default ChatMessage;

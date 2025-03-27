import styled from "styled-components";

// Balão enviado (você)
const bubbleSender = ({ theme }) =>
  theme.name === "dark"
    ? `linear-gradient(135deg, #1B263B, #2B2D42)`
    : `#E0E6ED`; // cinza azulado claro, elegante

// Balão recebido (contato)
const bubbleReceiver = ({ theme }) =>
  theme.name === "dark"
    ? `linear-gradient(135deg, #1B263B, #35519E)`
    : `#FFFFFF`; // branco puro, sem degradê, bem clean


export const Container = styled.div`
  display: flex;
  justify-content: ${({ $isSender }) => ($isSender ? "flex-end" : "flex-start")};
  padding: 0.25rem 1rem;
`;

export const ReactionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isSender }) => ($isSender ? "flex-end" : "flex-start")};
  max-width: 100%;
`;
export const Bubble = styled.div`
  background: ${({ theme, $isSender }) =>
    $isSender ? bubbleSender({ theme }) : bubbleReceiver({ theme })};
  color: ${({ theme }) => theme.text};
  padding: 0.75rem 1rem;
  border-radius: 16px;
  border-bottom-right-radius: ${({ $isSender }) => ($isSender ? "4px" : "16px")};
  border-bottom-left-radius: ${({ $isSender }) => ($isSender ? "16px" : "4px")};
  max-width: 600px;
  min-width: 80px;
  width: fit-content;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  font-size: 1rem;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: background 0.3s;

  a {
    color: ${({ theme }) => (theme.name === "dark" ? "#8AB4F8" : "#2470B6")};
    text-decoration: underline;

    &:hover {
      opacity: 0.85;
    }
  }
`;


export const Text = styled.span`
  display: block;
`;

export const Media = styled.div`
  margin-top: 0.5rem;

  img,
  video,
  audio {
    max-width: 100%;
    border-radius: 12px;
    object-fit: contain;
  }

  audio {
    width: 100%;
  }
`;

export const ReactionBubble = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${({ $isSender }) => ($isSender ? "-1.6rem" : "unset")};
  left: ${({ $isSender }) => ($isSender ? "unset" : "-1.6rem")};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 1.1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

export const ReactionMenu = styled.div`
  position: absolute;
  bottom: 110%;
  display: flex;
  gap: 0.5rem;
  background: ${({ theme }) => theme.surface};
  padding: 0.45rem 0.7rem;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  z-index: 10;

  span {
    font-size: 1.4rem;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

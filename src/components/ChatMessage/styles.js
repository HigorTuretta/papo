import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: ${({ $isSender }) => ($isSender ? "flex-end" : "flex-start")};
  margin: 0.4rem 0;
  animation: ${fadeIn} 0.25s ease;
`;

export const ReactionTriggerArea = styled.div`
  position: relative;
`;

export const Bubble = styled.div`
  background: ${({ theme, $isSender }) =>
    $isSender ? theme.primary : theme.surface};
  color: ${({ theme, $isSender }) => ($isSender ? "#fff" : theme.text)};
  padding: 0.8rem 1rem;
  border-radius: 16px;
  border-bottom-right-radius: ${({ $isSender }) => ($isSender ? "4px" : "16px")};
  border-bottom-left-radius: ${({ $isSender }) => ($isSender ? "16px" : "4px")};
  max-width: 80%;
  min-width: 100px;
  width: fit-content;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
  margin-bottom: ${({ $hasReaction }) => ($hasReaction ? "0" : "-15px")};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: underline;
    word-break: break-all;
  }
`;



export const Text = styled.span`
  display: block;
`;

export const Media = styled.div`
  img,
  video,
  audio {
    max-width: 100%;
    border-radius: 12px;
    margin-top: 0.5rem;
  }

  audio {
    width: 100%;
  }
`;

export const ReactionMenu = styled.div`
  position: absolute;
  bottom: 110%;
  left: 0;
  display: flex;
  gap: 0.4rem;
  background: ${({ theme }) => theme.surface};
  padding: 0.4rem 0.6rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 99;

  span {
    font-size: 1.4rem;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const ReactionBubble = styled.div`
  position: absolute;
  bottom: -1.2rem;
  right: ${({ $isSender }) => ($isSender ? "8px" : "unset")};
  left: ${({ $isSender }) => ($isSender ? "unset" : "8px")};
  background: ${({ theme }) => theme.surface};
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 1.1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 1;
`;
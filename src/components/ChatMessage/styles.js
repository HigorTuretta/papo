import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: ${({ $isSender }) => ($isSender ? "flex-end" : "flex-start")};
  padding: 0.25rem 1rem;
`;

export const BubbleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isSender }) => ($isSender ? "flex-end" : "flex-start")};
  max-width: 100%;
`;

export const Bubble = styled.div`
  background: ${({ theme, $isSender }) =>
    $isSender ? theme.primary : theme.surface};
  color: ${({ theme, $isSender }) => ($isSender ? "#fff" : theme.text)};
  padding: 0.8rem 1rem;
  border-radius: 16px;
  border-bottom-right-radius: ${({ $isSender }) => ($isSender ? "4px" : "16px")};
  border-bottom-left-radius: ${({ $isSender }) => ($isSender ? "16px" : "4px")};
  max-width: 600px;
  min-width: 80px;
  width: fit-content;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  line-height: 1.5;
  font-size: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: relative;

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: underline;
    word-break: break-all;
  }
`;

export const ReactionBubble = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${({ $isSender }) => ($isSender ? "-1.6rem" : "unset")};
  left: ${({ $isSender }) => ($isSender ? "unset" : "-1.6rem")};
  background: ${({ theme }) => theme.surface};
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 1.1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 2;
`;

export const ReactionMenu = styled.div`
  position: absolute;
  bottom: 110%;
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  background: ${({ theme }) => theme.surface};
  padding: 0.4rem 0.6rem;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;

  span {
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.2);
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
  }

  audio {
    width: 100%;
  }
`;

export const ReactionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isSender }) => ($isSender ? "flex-end" : "flex-start")};
  max-width: 100%;
`;

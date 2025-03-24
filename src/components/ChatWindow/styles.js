import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.background};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
  position: sticky;
  top: 0;
  z-index: 10;
`;


export const ContactAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
export const ContactInfo = styled.div`
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.secondary};
  }
`;

export const ContactName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  scroll-behavior: smooth;

  &::before {
    content: "";
    position: sticky;
    top: 0;
    height: 30px;
    background: linear-gradient(to bottom, ${({ theme }) => theme.background} 0%, transparent 100%);
    pointer-events: none;
    z-index: 2;
  }
`;

export const DateSeparator = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  text-align: center;
  font-size: 0.85rem;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.surfaceTransparent};
  backdrop-filter: blur(6px);
  padding: 0.4rem 1rem;
  border-radius: 999px;
  margin: 0 auto 0.5rem;
  width: fit-content;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  pointer-events: none;
`;




export const InputArea = styled.form`
  display: flex;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.surface };
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 999px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  outline: none;
`;

export const SendButton = styled.button`
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.surface};
  width: 45px;
  height: 45px;
  margin-left: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

export const SeparatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
`;

import styled from "styled-components";
import bgLight from '../../assets/backgroundLight.svg'
import bgDark from '../../assets/backgroundDark.svg'

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: ${({ theme }) => theme.background};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  background: ${({ theme }) => theme.surface};
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 768px) {
   padding-left: 5rem;
  }
`;

export const ContactAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

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
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  background-color: ${({ theme }) => theme.background};
  background-image: ${({ $themeName }) =>
    $themeName === "light" ? `url(${bgLight})` : `url(${bgDark})`};
  background-position: center;
  background-repeat: repeat;
  background-attachment: fixed;

  &::before {
    content: "";
    position: sticky;
    top: 0;
    height: 30px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.background} 0%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 2;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.accent};
  }

  scrollbar-color: ${({ theme }) => theme.secondary} transparent;
  scrollbar-width: thin;
`;



export const DateSeparator = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.surfaceTransparent || theme.surface};
  backdrop-filter: blur(6px);
  padding: 0.3rem 1rem;
  border-radius: 999px;
  margin: 0 auto 0.8rem;
  width: fit-content;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  pointer-events: none;
`;

export const SeparatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
`;

export const InputArea = styled.form`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: ${({ theme }) => theme.surface};
  gap: 0.5rem;
`;

export const ImageButton = styled.label`
  color: ${({ theme }) => theme.primary};
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const ImageInput = styled.input`
  display: none;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 999px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  outline: none;
`;

export const SendButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.secondary} 110%);
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.surface};
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
   filter: brightness(0.7)
  }
`;

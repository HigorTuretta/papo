// 📁 ContactSidebar/styles.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: ${({ theme }) => theme.surface};
`;

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.secondary};
`;

export const ContactItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.background};
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.75rem;
  }

  span {
    flex: 1;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Badge = styled.span`
  position: absolute;
  right: 10px;
  top: auto;
  background: ${({ theme }) => theme.info};
  color: #fff!important;
  font-size: 0.65rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 0 0 2px ${({ theme }) => theme.surface};
  z-index: 1;
`;


export const RequestItem = styled.div`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.text};
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const RequestButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    background: ${({ theme }) => theme.primary};
    color: #fff;
    border: none;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      background: ${({ theme }) => theme.accent};
    }
  }
`;

export const Footer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.secondary};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const NavRow = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavButton = styled.button`
  flex: 1;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;


export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.secondary};
`;

export const LogoText = styled.div`
  font-family: "Segoe UI", sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 1px;
  text-transform: lowercase;
`;

export const Attribution = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.secondary};
  text-align:right;
`;

export const Logo = styled.div`
  font-family: 'Segoe UI', sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primary};
  text-transform: lowercase;
  letter-spacing: 1px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-itens: center;
  gap: 10px;
  >img{
    width: 30px;
    height: 30px;
  }

`;

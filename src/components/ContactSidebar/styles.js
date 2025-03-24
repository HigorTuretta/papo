import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;

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
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
`;

export const Footer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.secondary};
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;

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

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
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

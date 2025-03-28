// /src/components/CreateGroupModal/styles.js
import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  svg {
    cursor: pointer;
    font-size: 1.2rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  margin: 1rem 0;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.secondary + '66'};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const ImageInput = styled.div`
  margin-bottom: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    font-size: 0.85rem;
  }

  input {
    display: none;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-top: 0.5rem;
    object-fit: cover;
  }
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.primary + "22" : "transparent"};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primary + "11"};
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  span {
    color: ${({ theme }) => theme.text};
    font-size: 0.9rem;
  }
`;

export const CreateButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.accent};
  }
`;

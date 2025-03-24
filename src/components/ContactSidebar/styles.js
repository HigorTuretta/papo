import styled from "styled-components";

export const Container = styled.div`
  width: 250px;
  background: ${({ theme }) => theme.surface};
  border-right: 1px solid #ddd;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;


export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  gap: 0.75rem;

  &:hover {
    background: #e6e6e6;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    font-size: 0.95rem;
    color: #333;
  }
`;

export const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
`;

export const Badge = styled.div`
  background: red;
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 12px;
  margin-left: auto;
  font-weight: bold;
`;

export const Footer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 2rem;
`;

export const NavButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.surface};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

export const RequestItem = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

export const RequestButtons = styled.div`
  margin-top: 0.25rem;
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.25rem 0.75rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;

    &:first-child {
      background: ${({ theme }) => theme.success};
      color: white;
    }

    &:last-child {
      background: ${({ theme }) => theme.error};
      color: white;
    }
  }
`;
export const UserProfile = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  background: none;
  margin-bottom: 1rem;
  cursor: pointer;
  text-align: left;
  padding: 0.5rem 0;
  border-radius: 8px;

  &:hover {
    background: ${({ theme }) => theme.accent}20;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text};

    strong {
      font-size: 0.95rem;
    }

    small {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.secondary};
    }
  }
`;

import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.surface};
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

export const Section = styled.div`
  margin-top: 2rem;
`;

export const Title = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RequestItem = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 1rem;
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
`;

export const RequestButtons = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;

    &:first-child {
      background: ${({ theme }) => theme.success};
      color: white;
    }

    &:last-child {
      background: ${({ theme }) => theme.error};
      color: white;
    }

    &:hover:first-child {
      background: #218838;
    }

    &:hover:last-child {
      background: #c82333;
    }
  }
`;

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background: ${({ theme }) => theme.surface};
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  outline: none;
`;

export const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.surface};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

export const GoogleButton = styled(Button)`
  background: #db4437;

  &:hover {
    background: #c23321;
  }
`;

export const LinkText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  text-align: center;

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    font-weight: bold;
  }
`;

import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  background: ${({ theme }) => theme.surface};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  align-self: center;
  border-radius: 50%;
  object-fit: cover;
  margin: 1rem 0;
  border: 2px solid ${({ theme }) => theme.primary};
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.success};
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #218838;
  }
`;

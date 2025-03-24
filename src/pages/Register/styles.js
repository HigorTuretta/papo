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
  background: ${({ theme }) => theme.surface};
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  align-items: center;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.text};
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  align-self: flex-start;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;
  width: 100%;
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
  width: 100%;
  transition: background 0.3s;

  &:hover {
    background: #218838;
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

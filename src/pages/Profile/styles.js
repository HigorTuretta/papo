import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const Form = styled.form`
  background: ${({ theme }) => theme.surface};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Avatar = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.primary};
  transition: 0.3s;
`;

export const UploadInput = styled.input`
  display: none;
`;

export const UploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.4rem;
  border-radius: 50%;
  font-size: 0.8rem;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.surface};
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

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;

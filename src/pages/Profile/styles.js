import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  height: 100dvh;
  width: 100%;
  overflow: hidden; // evita scroll por conta do background
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const Form = styled.form`
  background: ${({ theme }) => theme.surface}cc;
  backdrop-filter: blur(14px);
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 440px;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
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
    opacity: 0.8;
  }
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.primary};
  transition: 0.3s;
  box-shadow: 0 0 12px ${({ theme }) => theme.primary}55;
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
  padding: 0.5rem;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.surface};
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  margin-top: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.9rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.background}dd;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.accent}55;
  transition: border 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 8px ${({ theme }) => theme.accent}55;
  }
`;

export const Button = styled.button`
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;

  &:hover {
    box-shadow: 0 0 12px ${({ theme }) => theme.primary}aa;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>
      {themeName === "light" ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
    </ToggleButton>
  );
};

export default ThemeToggle;

const ToggleButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.surface};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

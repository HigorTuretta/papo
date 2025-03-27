import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background: ${(props) =>
    props.theme.name === 'dark'
      ? 'linear-gradient(135deg, #000000, #1a1a1a)'
      : 'linear-gradient(135deg, #F5F5F5, #FFFFFF)'};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.6s ease forwards;

  @keyframes fadeIn {
    from {
      transform: scale(0.98);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 3rem;
  flex-direction: column;

  img {
    width: 128px;
  }

  span {
    font-size: 2rem;
    font-weight: 900;
    color: ${(props) => props.theme.text};
    letter-spacing: 1px;
    font-family: 'LogoFont', sans-serif;
  }
`;

export const Slogan = styled.h3`
  color: ${(props) => props.theme.text}cc;
  font-size: 1rem;
  letter-spacing: 3px;
  text-align: center;
  text-transform: uppercase;
`;

export const FormCard = styled.form`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.text};
  font-size: 1.6rem;
  text-align: center;
`;

export const Input = styled.input`
  padding: 0.9rem 1rem;
  background: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.accent}55;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: ${(props) => props.theme.accent};
  }
`;

export const Button = styled.button`
  padding: 0.9rem;
  background: ${(props) => props.theme.primary};
  color:#F5F5F5;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 12px ${(props) => props.theme.primary}aa;
  }
`;

export const GoogleButton = styled(Button)`
  background: #db4437;

  &:hover {
    box-shadow: 0 0 12px #db4437aa;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

export const LinkText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: ${(props) => props.theme.text}99;

  a {
    color: ${(props) => props.theme.text};
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

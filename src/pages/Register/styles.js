import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #0d1b2a, #1b263b);
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

  img {
    width: 38px;
    height: 38px;
  }

  span {
    font-size: 2rem;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: 1px;
    text-transform: lowercase;
  }
`;

export const Slogan = styled.h3`
  color: #ffffffcc;
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
  color: #ffffff;
  font-size: 1.6rem;
  text-align: center;
`;

export const Input = styled.input`
  padding: 0.9rem 1rem;
  background: #111a22;
  color: #ffffff;
  border: 1px solid #778da955;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #ffffff;
  }
`;

export const Button = styled.button`
  padding: 0.9rem;
  background: #778da9;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 12px #778da9aa;
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
  color: #ccc;

  a {
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

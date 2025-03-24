import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

export const SidebarWrapper = styled.div`
  width: 300px;
  max-width: 100%;
  background: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => theme.secondary};
  display: ${({ $visible }) => ($visible ? "block" : "none")};

  @media (max-width: 768px) {
    position: absolute;
    height: 100%;
    z-index: 20;
    top: 0;
    left: 0;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  position: relative;
  z-index: 10;
`;

export const ToggleSidebarButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.8rem;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 25;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 15;
`;

export const CloseSidebarButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    z-index: 30;
  }
`;

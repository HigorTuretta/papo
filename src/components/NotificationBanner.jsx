import styled from "styled-components";
import { useEffect, useState } from "react";

const NotificationBanner = () => {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    const handlePermissionChange = () => {
      setPermission(Notification.permission);
    };

    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'notifications' }).then((permissionStatus) => {
        permissionStatus.onchange = handlePermissionChange;
      });
    }
  }, []);

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  if (permission === "granted") return null;

  return (
    <Banner>
      <span>🔔 As notificações estão desativadas.</span>
      {permission === "default" && (
        <button onClick={requestPermission}>Ativar</button>
      )}
      {permission === "denied" && (
        <a
          href="https://support.google.com/chrome/answer/3220216" // ou uma página sua
          target="_blank"
          rel="noopener noreferrer"
        >
          Saiba como ativar
        </a>
      )}
    </Banner>
  );
};

export default NotificationBanner;

const Banner = styled.div`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 0.6rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.secondary + '33'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.85rem;
  position: sticky;
  top: 0;
  z-index: 12;

  button, a {
    background: ${({ theme }) => theme.primary};
    color: #fff;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    font-size: 0.8rem;
    text-decoration: none;
    border: none;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.accent};
    }
  }
`;

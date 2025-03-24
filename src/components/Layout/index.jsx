import { useState, useEffect } from "react";
import {
  Wrapper,
  SidebarWrapper,
  ContentWrapper,
  ToggleSidebarButton,
  Backdrop,
  CloseSidebarButton 
} from "./styles";
import ContactSidebar from "../ContactSidebar";
import ChatWindow from "../ChatWindow";

const Layout = ({ selectedContact, onSelectContact }) => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setShowSidebar(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCloseSidebar = () => {
    if (window.innerWidth <= 768) setShowSidebar(false);
  };

  return (
    <Wrapper>
      <SidebarWrapper $visible={showSidebar}>
      <CloseSidebarButton onClick={() => setShowSidebar(false)}>✖</CloseSidebarButton>
        <ContactSidebar
          onSelectContact={(c) => {
            onSelectContact(c);
            handleCloseSidebar();
          }}
        />
      </SidebarWrapper>

      <ContentWrapper>
        {!showSidebar && (
          <ToggleSidebarButton onClick={() => setShowSidebar(true)}>
            ☰
          </ToggleSidebarButton>
        )}

        {selectedContact ? (
          <ChatWindow contact={selectedContact} />
        ) : (
          <p style={{ padding: "1.5rem 5rem" }}>Selecione um contato para iniciar uma conversa</p>
        )}
      </ContentWrapper>

      {showSidebar && window.innerWidth <= 768 && (
        <Backdrop onClick={() => setShowSidebar(false)} />
      )}
    </Wrapper>
  );
};

export default Layout;

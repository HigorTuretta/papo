import { useState, useEffect } from "react";
import {
  Wrapper,
  SidebarWrapper,
  ContentWrapper,
  ToggleSidebarButton,
  Backdrop,
  CloseSidebarButton,
  HelloArea
} from "./styles";
import ContactSidebar from "../ContactSidebar";
import ChatWindow from "../ChatWindow";
import HomeAnim from '../../assets/Home.json'
import Lottie from "lottie-react";
import Logo from '../../assets/Logo 5.png'

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
          <HelloArea>
            
            <div>
              <img src={Logo} alt="Logo do app"/>
            </div>
            <p>Selecione um contato para começar a pruu-pear 👈</p>
          </HelloArea>
        )}
      </ContentWrapper>

      {showSidebar && window.innerWidth <= 768 && (
        <Backdrop onClick={() => setShowSidebar(false)} />
      )}
    </Wrapper>
  );
};

export default Layout;

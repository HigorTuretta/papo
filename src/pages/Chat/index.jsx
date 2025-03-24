import { Container, Content } from "./styles";
import ContactSidebar from "../../components/ContactSidebar";
import ChatWindow from "../../components/ChatWindow";
import { useState } from "react";

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <Container>
      <ContactSidebar onSelectContact={setSelectedContact} />
      <Content>
        {selectedContact ? (
          <ChatWindow contact={selectedContact} />
        ) : (
          <p style={{ padding: "2rem" }}>Selecione um contato para começar a conversar</p>
        )}
      </Content>
    </Container>
  );
};

export default Chat;

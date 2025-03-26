import { Container, Content, HelloArea } from "./styles";
import ContactSidebar from "../../components/ContactSidebar";
import ChatWindow from "../../components/ChatWindow";
import { useState } from "react";
import HomeAnim from '../../assets/Home.json'
const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <Container>
      <ContactSidebar onSelectContact={setSelectedContact} />
      <Content>
        {selectedContact ? (
          <ChatWindow contact={selectedContact} />
        ) : (
          <HelloArea>
             <Lottie animationData={HomeAnim} loop={true} />
            <p>Selecione um contato para começar a conversar</p>
            </HelloArea>
        )}
      </Content>
    </Container>
  );
};

export default Chat;

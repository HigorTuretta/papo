import { useEffect, useState } from "react";
import { Container, Form, Title, Avatar, Input, Button, Label, Header, BackButton } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc, getDocs, updateDoc, collectionGroup, writeBatch  } from "firebase/firestore";
import { db } from "../../services/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setDisplayName(data.displayName || "");
        setPhotoURL(data.photoURL || "");
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", user.uid);

      // Atualiza o perfil principal
      await updateDoc(userRef, {
        displayName,
        photoURL,
      });

      // Procura quem tem esse usuário como contato
      const contactsSnapshot = await getDocs(collectionGroup(db, "list"));

      const batch = writeBatch(db);

      contactsSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const path = docSnap.ref.path;

        if (data.uid === user.uid) {
          // Atualiza esse contato em quem tem ele salvo
          batch.update(doc(db, path), {
            displayName,
            photoURL,
          });
        }
      });

      await batch.commit();

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil.");
    }
  };


  return (
    <Container>
      <Form onSubmit={handleSave}>
        <Header>
          <BackButton type="button" onClick={() => navigate("/")}>
            <FaArrowLeft /> Voltar
          </BackButton>
          <Title>Meu Perfil</Title>
        </Header>

        <Avatar src={photoURL || "/default-avatar.png"} alt="avatar" />

        <Label>Nome</Label>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Nome de exibição"
        />

        <Label>URL da Foto de Perfil</Label>
        <Input
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="URL da imagem"
        />

        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default Profile;

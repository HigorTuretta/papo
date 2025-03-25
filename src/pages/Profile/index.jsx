import { useEffect, useState } from "react";
import {
  Container, Form, Title, Avatar, Input, Button, Label,
  Header, BackButton, UploadInput, UploadLabel
} from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import {
  doc, getDoc, getDocs, updateDoc, collectionGroup, writeBatch, setDoc 
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import imageCompression from "browser-image-compression";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const Profile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressed = await imageCompression(file, options);
      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setPhotoURL(data.secure_url);
    } catch (err) {
      toast.error("Erro ao fazer upload da imagem.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", user.uid);
  
      // Atualiza o perfil principal
      await updateDoc(userRef, {
        displayName,
        photoURL,
      });
  
      // Atualiza o próprio contato (em sua lista de contatos, se existir)
      await setDoc(doc(db, "contacts", user.uid, "list", user.uid), {
        uid: user.uid,
        displayName,
        photoURL,
        email: user.email,
      });
  
      // Busca todos os documentos da subcoleção "list" que possuem este usuário
      const contactsSnapshot = await getDocs(collectionGroup(db, "list"));
  
      const batch = writeBatch(db);
  
      contactsSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const refPath = docSnap.ref.path;
  
        // Se alguém tiver esse usuário como contato
        if (data.uid === user.uid) {
          batch.update(doc(db, refPath), {
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

        <div style={{ position: "relative", alignSelf: "center" }}>
          <Avatar src={photoURL || "/default-avatar.png"} alt="avatar" />
          <UploadLabel htmlFor="upload-photo">
            <FaCamera />
          </UploadLabel>
          <UploadInput
            id="upload-photo"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <Label>Nome</Label>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Nome de exibição"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;

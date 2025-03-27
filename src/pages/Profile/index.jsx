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
  const [uploading, setUploading] = useState(false);
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

  const updatePhotoEverywhere = async (url) => {
    try {
      const userRef = doc(db, "users", user.uid);

      // Atualiza Firestore principal
      await updateDoc(userRef, { photoURL: url });

      // Atualiza seu próprio contato
      await setDoc(doc(db, "contacts", user.uid, "list", user.uid), {
        uid: user.uid,
        displayName,
        photoURL: url,
        email: user.email,
      });

      // Atualiza nas listas dos outros
      const contactsSnapshot = await getDocs(collectionGroup(db, "list"));
      const batch = writeBatch(db);

      contactsSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const refPath = docSnap.ref.path;

        if (data.uid === user.uid) {
          batch.update(doc(db, refPath), {
            photoURL: url,
          });
        }
      });

      await batch.commit();
    } catch (err) {
      console.error("Erro ao atualizar imagem nas listas:", err);
      toast.error("Erro ao atualizar imagem nos contatos.");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading("Enviando imagem...");
    setUploading(true);

    try {
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
      if (!data.secure_url) throw new Error("Upload falhou");

      setPhotoURL(data.secure_url);
      await updatePhotoEverywhere(data.secure_url);

      toast.update(toastId, {
        render: "Imagem atualizada com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: "Erro ao enviar imagem.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Salvando perfil...");
    setLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, { displayName });

      // Atualiza seu próprio contato
      await setDoc(doc(db, "contacts", user.uid, "list", user.uid), {
        uid: user.uid,
        displayName,
        photoURL,
        email: user.email,
      });

      // Atualiza nas listas dos outros
      const contactsSnapshot = await getDocs(collectionGroup(db, "list"));
      const batch = writeBatch(db);

      contactsSnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const refPath = docSnap.ref.path;

        if (data.uid === user.uid) {
          batch.update(doc(db, refPath), {
            displayName,
          });
        }
      });

      await batch.commit();

      toast.update(toastId, {
        render: "Perfil atualizado com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.update(toastId, {
        render: "Erro ao atualizar perfil.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
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

        <div style={{ position: "relative", alignSelf: "center", display: "flex", justifyContent: "center" }}>
          <Avatar src={photoURL || "/profile.jpeg"} alt="avatar" />
          <UploadLabel htmlFor="upload-photo">
            <FaCamera />
          </UploadLabel>
          <UploadInput
            id="upload-photo"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading || uploading}
          />
        </div>

        <Label>Nome</Label>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Nome de exibição"
          disabled={loading || uploading}
        />

        <Button type="submit" disabled={loading || uploading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;

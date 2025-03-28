
// /src/components/CreateGroupModal/index.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Backdrop,
  Modal,
  Header,
  Input,
  ImageInput,
  ContactList,
  ContactItem,
  CreateButton
} from "./styles";
import { FiX, FiUsers, FiImage } from "react-icons/fi";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CreateGroupModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!user) return;
      const ref = collection(db, "contacts", user.uid, "list");
      const snap = await getDocs(ref);
      const list = snap.docs.map((doc) => doc.data());
      setContacts(list);
    };

    if (isOpen) {
      fetchContacts();
      setSelected([]);
      setGroupName("");
      setGroupImage(null);
    }
  }, [isOpen, user]);

  const handleSelect = (uid) => {
    setSelected((prev) =>
      prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
    );
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("public_id", `group_${uuidv4()}`);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setGroupImage(data.secure_url);
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selected.length === 0 || !groupImage) return;

    await addDoc(collection(db, "groups"), {
      name: groupName.trim(),
      imageURL: groupImage,
      owner: user.uid,
      members: [...selected, user.uid],
      createdAt: serverTimestamp(),
    });

    onClose();
  };


  if (!isOpen) return null;

  return (
    <Backdrop>
      <Modal>
        <Header>
          <h2><FiUsers /> Criar Grupo</h2>
          <FiX onClick={onClose} />
        </Header>

        <Input
          placeholder="Nome do grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <ImageInput>
          <label>
            <FiImage /> Imagem do grupo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </label>
          {groupImage && <img src={groupImage} alt="Preview" />}
        </ImageInput>

        <ContactList>
          {contacts.map((c) => (
            <ContactItem
              key={c.uid}
              $selected={selected.includes(c.uid)}
              onClick={() => handleSelect(c.uid)}
            >
              <img src={c.photoURL || "/profile.jpeg"} alt={c.displayName} />
              <span>{c.displayName || c.email}</span>
            </ContactItem>
          ))}
        </ContactList>

        <CreateButton
          disabled={!groupName || selected.length === 0 || uploading || !groupImage}
          onClick={handleCreateGroup}
        >
          Criar Grupo
        </CreateButton>

      </Modal>
    </Backdrop>
  );
};

export default CreateGroupModal;

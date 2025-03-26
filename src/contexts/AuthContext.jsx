import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { db } from "../services/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser.uid), {
          status: "online",
          lastSeen: serverTimestamp(),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Listener para quando o usuário sair da aba
  useEffect(() => {
    if (!user) return;

    const handleUnload = async () => {
      await updateDoc(doc(db, "users", user.uid), {
        status: "offline",
        lastSeen: serverTimestamp(),
      });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [user]);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, password);
  const loginWithGoogle = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

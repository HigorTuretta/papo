import { getToken } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { messaging, db } from "./firebase"; // ajuste os caminhos se necessário

export const requestNotificationPermission = async (uid) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Permissão de notificação negada.");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      await setDoc(
        doc(db, "users", uid),
        { fcmToken: token },
        { merge: true }
      );

      console.log("✅ Token FCM salvo:", token);
    }
  } catch (err) {
    console.error("Erro ao obter token FCM:", err);
  }
};

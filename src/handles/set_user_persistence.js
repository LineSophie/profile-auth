import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from '../firebase_setup/firebase';

export const setUserPersistence = async (email, password) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
  } catch (error) {
    console.error("Error setting session persistence:", error);
    throw error;
  }
};
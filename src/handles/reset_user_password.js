import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../firebase_setup/firebase'; 

export const resetUserPassword = async (email, setResetPasswordOpen) => {
  try {
    await sendPasswordResetEmail(auth, email)
    setResetPasswordOpen(false);

  } catch(error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};



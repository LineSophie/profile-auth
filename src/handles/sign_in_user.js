import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase_setup/firebase'; // Import the Firebase app instance


export const signInUser = async (email, password, setLoginSuccessTrue, setLoginNoSuccess) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
    setLoginSuccessTrue(true);
  } catch (error) {
    setLoginNoSuccess(true);
    console.error('Sign In Error:', error);
  }
};

import { signOut } from 'firebase/auth';
import {auth} from '../firebase_setup/firebase'; 

const signOutUser = async (setLoginSuccessTrue) => {
  try {
    await signOut(auth);
    setLoginSuccessTrue(false);
  } catch (error) {
    console.error('Logout Error:', error);
  }
};

export { signOutUser };
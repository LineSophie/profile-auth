import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase_setup/firebase';
import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

export const addNewUser = async (newEmail, newPassword, setLoginSuccessTrue, setLoginNoSuccess) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, newEmail, newPassword);
    const user = userCredential.user;
    const firstName = document.getElementById('userName').value;
    const lastName = document.getElementById('lastName').value;
    const fullName = `${firstName} ${lastName}`;

    await updateProfile(user, {
      displayName: fullName,
    });

    const userDataCollection = collection(firestore, 'user-data');
    await addDoc(userDataCollection, {
      uid: user.uid,
      firstName,
      lastName,
    });

    setLoginSuccessTrue(true);
  } catch (error) {
    console.error('Registration Error:', error.code, error.message);
    setLoginNoSuccess(true);
    throw error;
  }
};

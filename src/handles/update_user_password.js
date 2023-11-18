// handle_change_password.js
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";

const auth = getAuth();

export const updateUserPassword = async (newPassword, oldPassword) => {
  
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, oldPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    console.log("Password updated successfully!");
  } catch (error) {
    console.error("Error updating password:", error);
  }
};

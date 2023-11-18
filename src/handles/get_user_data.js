import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { firestore } from '../firebase_setup/firebase';

export const getUserData = async (uid) => {
  const userDataCollection = collection(firestore, 'user-data');
  const q = query(userDataCollection, where('uid', '==', uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userData = querySnapshot.docs[0].data();
    return userData;
  } else {
    return null; 
  }
};

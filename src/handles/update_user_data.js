import { updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase';

export const updateUserData = async (uid, updatedData) => {
  const userDataCollection = collection(firestore, 'user-data');
  const q = query(userDataCollection, where('uid', '==', uid));
  const querySnapshot = await getDocs(q);

  try {
    if (querySnapshot.docs.length === 1) {
      const userDoc = querySnapshot.docs[0].ref;
      await updateDoc(userDoc, updatedData);

      console.log('User data updated successfully');
    } else {
      console.error('User document not found');
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};



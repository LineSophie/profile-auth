import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase_setup/firebase';

export const uploadUserImage = async (selectedImage, userId) => {
  if (selectedImage && userId) {

    const imageName = `ProfileImage`;
    const storageRef = ref(storage, `users/${userId}/${imageName}`);

    try {
      await uploadBytes(storageRef, selectedImage);
      console.log('Image uploaded successfully');
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  } else {
    console.error('Selected image or user ID not available');
  }
};
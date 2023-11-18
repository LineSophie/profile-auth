import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase_setup/firebase';

export const getImagesForUser = async (userId) => {
  if (userId) {
    const userFolderRef = ref(storage, `users/${userId}/`);

    try {
      const userImages = await listAll(userFolderRef);

      const imageUrls = await Promise.all(
        userImages.items.map(async (imageRef) => {
          const imageUrl = await getDownloadURL(imageRef);
          return imageUrl;
        })
      );

      console.log('Images retrieved successfully:', imageUrls);
      return imageUrls;
    } catch (error) {
      console.error('Error retrieving images:', error);
      return [];
    }
  } else {
    console.error('User ID not available');
    return [];
  }
};

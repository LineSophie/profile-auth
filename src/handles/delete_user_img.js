import { getStorage, ref, deleteObject } from "firebase/storage";

export const deleteUserImg = async (userId) => {
  const storage = getStorage();
  const userImgDelete = ref(storage, `users/${userId}/ProfileImage`);
  try {
    await deleteObject(userImgDelete);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image', error);
  }
};
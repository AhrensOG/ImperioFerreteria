import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

const uploadFile = async (file) => {
  try {
    const storageRef = ref(storage, `Productos/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    return {
      name: file.name,
      url,
    };
  } catch (error) {
    return error;
  }
};

export { uploadFile };

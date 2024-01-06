import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

const uploadBusinessFile = async (file) => {
  try {
    const storageRef = ref(storage, `Empresa/${file.name}`);
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

export { uploadBusinessFile };

import axios from "axios";
import { auth } from "./config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL_LOGIN;

export const logInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provider);
    const res = await axios.post(SERVER_URL, credentials);
    return res.data;
  } catch (error) {
    return error;
  }
};

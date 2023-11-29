import axios from "axios";
import { auth } from "./config";
import { GoogleAuthProvider, browserSessionPersistence, setPersistence, signInWithPopup } from "firebase/auth";

const SERVER_URL_LOGIN = process.env.NEXT_PUBLIC_SERVER_BASE_URL_LOGIN;
const SERVER_URL_CART = process.env.NEXT_PUBLIC_SERVER_BASE_URL_CART;


export const logInWithGoogle = () => {
  setPersistence(auth, browserSessionPersistence)
  .then( async () => {
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
  
      const resUser = await axios.post(SERVER_URL_LOGIN, credentials);
      const resCart = await axios.post(SERVER_URL_CART, { userId: credentials?.user?.uid });
      
      return {User: resUser.data, Cart: resCart.data};
    } catch (error) {
      return error;
    }
  })
  .catch((error) => {
    return {errorCode: error.code, errorMessage: error.message, error: error}
  })
};

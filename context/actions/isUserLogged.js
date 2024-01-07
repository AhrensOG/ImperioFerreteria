import { auth } from "@/firebase/config"
import axios from "axios"
import { onAuthStateChanged } from "firebase/auth"

const SERVER_URL_IS_USER_LOGGED = process.env.NEXT_PUBLIC_SERVER_ENDPOINT_USER_AUTH;

export const isUserLogged = async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        const data = await axios.get(`${SERVER_URL_IS_USER_LOGGED}${user.uid}`)
        return dispatch({ type: "LOGGED_IN_USER", payload: data.data });
      } else {
        return dispatch({ type: "LOGGED_OUT_USER"})
      }
    } catch (error) {
      return error
    }
  })
}
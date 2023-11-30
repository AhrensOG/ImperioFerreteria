import { auth } from "@/firebase/config"
import axios from "axios"
import { onAuthStateChanged } from "firebase/auth"

export const isUserLogged = async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user)
      const data = await axios.get(`/api/auth/${user.uid}`)
      return dispatch({ type: "LOGGED_IN_USER", payload: data.data });
    } else {
      return dispatch({ type: "LOGGED_OUT_USER"})
    }
  })
}
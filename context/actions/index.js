import axios from "axios";

export const getAllProducts = async (dispatch) => {
  const res = await axios.get("/api/products/controller");
  return dispatch({ type: "GET_ALL_PRODUCTS", payload: res.data });
};

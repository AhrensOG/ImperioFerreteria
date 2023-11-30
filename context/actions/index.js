import axios from "axios";

export const getAllProducts = async (dispatch) => {
    const res = await axios.get("/api/products/controller");
    return dispatch({ type: "GET_ALL_PRODUCTS", payload: res.data });
};

export const getOneProduct = async (id, dispatch) => {
    const res = await axios.get(`/api/products/controller?productId=${id}`);
    return dispatch({ type: "GET_ONE_PRODUCT", payload: res.data });
};

export const searchProductsByName = async (title, dispatch) => {
    const res = await axios.get(
        `/api/products/filters/searchByName?productName=${title}`
    );
    return dispatch({
        type: "GET_PRODUCTS_BY_NAME",
        payload: { data: res.data, title },
    });
};

export const deleteSearchByNameFilter = async (dispatch) => {
    return dispatch({ type: "DELETE_PRODUCTS_BY_NAME" });
};

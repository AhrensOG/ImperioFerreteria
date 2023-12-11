import { uploadFile } from "@/firebase/uploadFile";
import axios from "axios";

export const getAllCategories = async (dispatch) => {
  const res = await axios.get("/api/categories/controller");
  return dispatch({ type: "GET_ALL_CATEGORIES", payload: res.data });
};

export const getAllUsers = async (dispatch) => {
  const res = await axios.get("/api/user/controller");
  return dispatch({ type: "GET_ALL_USERS", payload: res.data });
};

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

export const updateUser = async (data, dispatch) => {
  const res = await axios.put(`/api/auth/${data.id}`, data);
  return dispatch({ type: "UPDATE_USER", payload: res.data });
};

export const addProductToCart = async (data, dispatch) => {
  return dispatch({ type: "ADD_PRODUCT_TO_CART", payload: data });
};

export const deleteProductToCart = async (data, dispatch) => {
  return dispatch({ type: "DELETE_PRODUCT_TO_CART", payload: data });
};

export const createAndPayOrder = async (user, productsCart, dispatch) => {
  try {
    const res = await axios.post(`/api/order/controller`, {
      userId: user.id,
    });

    const productsOrderData = {
      OrderId: res.data.Order.id,
      productsList: productsCart,
    };

    await axios.post(`/api/productsOrder/controller`, productsOrderData);

    const productsPayment = productsCart.map((p) => {
      return {
        id: p.id,
        description: p.description,
        title: p.title,
        quantity: p.items,
        unit_price: parseFloat(p.price),
        currency_id: "ARS",
      };
    });

    const paymentData = {
      payer: user,
      items: productsPayment,
    };

    const pay = await axios.post(`/api/payment/controller`, paymentData);

    return dispatch({
      type: "INIT_POINT",
      payload: pay.data["init_point"],
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteInit_Point = (dispatch) => {
  return dispatch({ type: "DELETE_INIT_POINT" });
};

export const editProduct = (data, dispatch) => {
  return dispatch({ type: "EDIT_PRODUCT", payload: data });
};

export const backToCreateProduct = (dispatch) => {
  return dispatch({ type: "EDIT_PRODUCT", payload: null });
};

export const createProduct = async (data) => {
  try {
    const res = await axios.post("/api/products/controller", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCategoriesToProduct = async (categoriesList, productId) => {
  try {
    const body = {
      categoriesList,
      productId,
    };
    await axios.post("/api/productsCategories/controller", body);
  } catch (error) {
    console.log(error);
  }
};

export const addImagesToProduct = async (filesList, productId) => {
  try {
    const imagesList = [];
    for (let i = 0; i < filesList.length; i++) {
      const image = await uploadFile(filesList[i]);
      imagesList.push(image);
    }
    const body = {
      imagesList,
      productId,
    };
    await axios.post("/api/productsImages/controller", body);
  } catch (error) {
    console.log(error);
  }
};

export const addFirstImage = async (file) => {
  const image = await uploadFile(file)
  return image.url
}

export const updateProduct = async (data) => {
  try {
    const body = {
      ...data,
      productId: data.id,
    };
    const res = await axios.put("/api/products/controller", body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCategoriesToProduct = async (categoriesList, productId) => {
  try {
    const body = {
      productId,
      categoriesList
    }
    await axios.post(`/api/productsCategories/delete`, body);
  } catch (error) {
    console.log(error);
  }
};

export const removeImagesToProduct = async (idList) => {
  try {
    await axios.post(`/api/productsImages/delete`, { idList })
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`/api/products/controller?productId=${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const editCategory = (data, dispatch) => {
  return dispatch({ type: "EDIT_CATEGORY", payload: data });
}

export const backToCreateCategory = (dispatch) => {
  return dispatch({ type: "EDIT_CATEGORY", payload: null });
}

export const createCategory = async (data) => {
  try {
    await axios.post("/api/categories/controller", data);
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (data) => {
  try {
    await axios.put("/api/categories/controller", data);
  } catch (error) {
    console.log(error);
  }
};


export const deleteCategory = async (id) => {
  try {
    await axios.delete(`/api/categories/controller?id=${id}`);
  } catch (error) {
    console.log(error);
  }
}
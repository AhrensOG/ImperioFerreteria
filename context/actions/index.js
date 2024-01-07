import { uploadFile } from "@/firebase/uploadFile";
import axios from "axios";
import { isUserLogged } from "./isUserLogged";
import { uploadBusinessFile } from "@/firebase/uploadBusinessFile";

const SERVER_URL_BUSINESS_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_BUSINESS_CONTROLLER;

const SERVER_URL_CATEGORIES_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_CATEGORIES_CONTROLLER;

const SERVER_URL_USER_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_USER_CONTROLLER;

const SERVER_URL_PRODUCTS_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_PRODUCTS_CONTROLLER;

const SERVER_URL_ORDER_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_ORDER_CONTROLLER;

const SERVER_URL_GET_PRODUCTS_BY_NAME =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_GET_PRODUCTS_BY_NAME;

const SERVER_URL_GET_PRODUCTS_BY_CATEGORY =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_GET_PRODUCTS_BY_CATEGORY;

const SERVER_URL_USER_AUTH = process.env.NEXT_PUBLIC_SERVER_ENDPOINT_USER_AUTH;

const SERVER_URL_ORDER_CONTROLLER_ONLY_CREATE =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_ORDER_CONTROLLER_ONLY_CREATE;

const SERVER_URL_ORDER_CONTROLLER_WITH_DELIVERY =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_ORDER_CONTROLLER_WITH_DELIVERY;

const SERVER_URL_PRODUCTS_ORDER_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_PRODUCTS_ORDER_CONTROLLER;

const SERVER_URL_PAYMENT_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_PAYMENT_CONTROLLER;

const SERVER_URL_PRODUCTS_CATEGORIES_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_PRODUCTS_CATEGORIES_CONTROLLER;

const SERVER_URL_PRODUCTS_IMAGES_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_PRODUCTS_IMAGES_CONTROLLER;

const SERVER_URL_PRODUCTS_CATEGORIES_DELETE_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_DELETE_ENDPOINT_PRODUCTS_CATEGORIES_CONTROLLER;

const SERVER_URL_PRODUCTS_IMAGES_DELETE_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_DELETE_ENDPOINT_PRODUCTS_IMAGES_CONTROLLER;

const SERVER_URL_BUSINESS_IMAGES_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_ENDPOINT_BUSINESS_IMAGES_CONTROLLER;

const SERVER_URL_BUSINESS_IMAGES_DELETE_CONTROLLER =
  process.env.NEXT_PUBLIC_SERVER_DELETE_ENDPOINT_BUSINESS_IMAGES_CONTROLLER;

export const getOrganization = async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_BUSINESS_CONTROLLER}`);
    return dispatch({ type: "GET_ORGANIZATION", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_CATEGORIES_CONTROLLER}`);
    return dispatch({ type: "GET_ALL_CATEGORIES", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_USER_CONTROLLER}`);
    return dispatch({ type: "GET_ALL_USERS", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_PRODUCTS_CONTROLLER}`);
    return dispatch({ type: "GET_ALL_PRODUCTS", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async (dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_ORDER_CONTROLLER}`);
    return dispatch({ type: "GET_ALL_ORDERS", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getOneProduct = async (id, dispatch) => {
  try {
    const res = await axios.get(
      `${SERVER_URL_PRODUCTS_CONTROLLER}?productId=${id}`
    );
    return dispatch({ type: "GET_ONE_PRODUCT", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductDetail = (dispatch) => {
  return dispatch({ type: "GET_ONE_PRODUCT", payload: null });
};

export const searchProductsByName = async (title, dispatch) => {
  try {
    const res = await axios.get(`${SERVER_URL_GET_PRODUCTS_BY_NAME}${title}`);
    return dispatch({
      type: "GET_PRODUCTS_BY_NAME",
      payload: { data: res.data, title },
    });
  } catch (error) {
    return error;
  }
};

export const searchProductsByCategory = async (category, dispatch) => {
  try {
    const res = await axios.get(
      `${SERVER_URL_GET_PRODUCTS_BY_CATEGORY}${category}`
    );
    const data = {
      category,
      data: res.data.length ? res.data : null,
    };
    return dispatch({
      type: "GET_PRODUCTS_BY_CATEGORY",
      payload: data,
    });
  } catch (error) {
    return error;
  }
};

export const deleteSearchByCategoryFilter = (dispatch) => {
  return dispatch({ type: "DELETE_PRODUCTS_BY_CATEGORY" });
};

export const deleteSearchByNameFilter = async (dispatch) => {
  return dispatch({ type: "DELETE_PRODUCTS_BY_NAME" });
};

export const updateUser = async (data, dispatch) => {
  try {
    const res = await axios.put(`${SERVER_URL_USER_AUTH}${data.id}`, data);
    return dispatch({ type: "UPDATE_USER", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (data, dispatch) => {
  return dispatch({ type: "ADD_PRODUCT_TO_CART", payload: data });
};

export const deleteProductToCart = async (data, dispatch) => {
  return dispatch({ type: "DELETE_PRODUCT_TO_CART", payload: data });
};

export const deleteCart = async (dispatch) => {
  return dispatch({ type: "DELETE_CART" });
};

export const createOrder = async (user, productsCart, totalPrice) => {
  try {
    const res = await axios.post(`${SERVER_URL_ORDER_CONTROLLER_ONLY_CREATE}`, {
      userId: user.id,
      totalPrice,
    });

    const productsOrderData = {
      OrderId: res.data.Order.id,
      productsList: productsCart,
      onlyCreate: true,
    };

    //Delete previous unpaid products
    await axios.delete(
      `${SERVER_URL_PRODUCTS_ORDER_CONTROLLER}?OrderId=${res.data.Order.id}`
    );

    await axios.post(
      `${SERVER_URL_PRODUCTS_ORDER_CONTROLLER}`,
      productsOrderData
    );
  } catch (error) {
    console.log(error);
  }
};

export const createAndPayOrder = async (user, productsCart, dispatch) => {
  try {
    const res = await axios.post(`${SERVER_URL_ORDER_CONTROLLER}`, {
      userId: user.id,
    });

    const productsOrderData = {
      OrderId: res.data.Order.id,
      productsList: productsCart,
    };

    //Delete previous unpaid products
    await axios.delete(
      `${SERVER_URL_PRODUCTS_ORDER_CONTROLLER}?OrderId=${res.data.Order.id}`
    );

    await axios.post(
      `${SERVER_URL_PRODUCTS_ORDER_CONTROLLER}`,
      productsOrderData
    );

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
    user.order = res.data.Order.id;
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

export const createOrderWithDelivery = async (
  user,
  productsCart,
  deliveryData
) => {
  try {
    const res = await axios.post(
      `${SERVER_URL_ORDER_CONTROLLER_WITH_DELIVERY}`,
      {
        userId: user.id,
        delivery: deliveryData.delivery,
        orderReceiver: deliveryData.orderReceiver,
        receiverPhone: deliveryData.receiverPhone,
        totalPrice: deliveryData.totalPrice,
      }
    );

    const productsOrderData = {
      OrderId: res.data.Order.id,
      productsList: productsCart,
      delivery: deliveryData.delivery,
    };

    //Delete previous unpaid products
    await axios.delete(
      `${SERVER_URL_PRODUCTS_ORDER_CONTROLLER}?OrderId=${res.data.Order.id}`
    );

    await axios.post(
      `${SERVER_URL_PRODUCTS_ORDER_CONTROLLER}`,
      productsOrderData
    );
  } catch (error) {
    console.log(error);
  }
};

export const payOrderWithDelivery = async (user, orderProducts, order) => {
  try {
    const productsPayment = orderProducts.map((p) => {
      return {
        id: p.id,
        description: p.description,
        title: p.title,
        quantity: p.ProductsOrder.quantity,
        unit_price: parseFloat(p.price),
        currency_id: "ARS",
      };
    });

    user.order = order;

    const paymentData = {
      payer: user,
      items: productsPayment,
    };

    const pay = await axios.post(
      `${SERVER_URL_PAYMENT_CONTROLLER}`,
      paymentData
    );

    return pay.data["init_point"];
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = async (orderId, dispatch = false) => {
  try {
    await axios.put(`${SERVER_URL_ORDER_CONTROLLER_WITH_DELIVERY}`, {
      orderId,
    });
    if (dispatch) {
      isUserLogged(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};

export const payOrder = async (orderId, dispatch = false) => {
  try {
    await axios.put(`${SERVER_URL_ORDER_CONTROLLER}`, {
      orderId,
      delivered: false,
      status: "Paid",
    });
    if (dispatch) {
      isUserLogged(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deliveredOrder = async (orderId, delivered) => {
  try {
    await axios.put(`${SERVER_URL_ORDER_CONTROLLER}`, { orderId, delivered });
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
    const res = await axios.post(`${SERVER_URL_PRODUCTS_CONTROLLER}`, data);
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
    await axios.post(`${SERVER_URL_PRODUCTS_CATEGORIES_CONTROLLER}`, body);
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
    await axios.post(`${SERVER_URL_PRODUCTS_IMAGES_CONTROLLER}`, body);
  } catch (error) {
    console.log(error);
  }
};

export const addFirstImage = async (file) => {
  try {
    const image = await uploadFile(file);
    return image.url;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (data) => {
  try {
    const body = {
      ...data,
      productId: data.id,
    };
    const res = await axios.put(`${SERVER_URL_PRODUCTS_CONTROLLER}`, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCategoriesToProduct = async (categoriesList, productId) => {
  try {
    const body = {
      productId,
      categoriesList,
    };
    await axios.post(
      `${SERVER_URL_PRODUCTS_CATEGORIES_DELETE_CONTROLLER}`,
      body
    );
  } catch (error) {
    console.log(error);
  }
};

export const removeImagesToProduct = async (idList) => {
  try {
    await axios.post(`${SERVER_URL_PRODUCTS_IMAGES_DELETE_CONTROLLER}`, {
      idList,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(
      `${SERVER_URL_PRODUCTS_CONTROLLER}?productId=${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = (data, dispatch) => {
  return dispatch({ type: "EDIT_CATEGORY", payload: data });
};

export const backToCreateCategory = (dispatch) => {
  return dispatch({ type: "EDIT_CATEGORY", payload: null });
};

export const createCategory = async (data) => {
  try {
    await axios.post(`${SERVER_URL_CATEGORIES_CONTROLLER}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (data) => {
  try {
    await axios.put(`${SERVER_URL_CATEGORIES_CONTROLLER}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${SERVER_URL_CATEGORIES_CONTROLLER}?id=${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const openCart = (data, dispatch) => {
  return dispatch({ type: "OPEN_CART", payload: data });
};

export const getOrderProducts = async (OrderId) => {
  try {
    const res = await axios.get(
      `${SERVER_URL_PRODUCTS_ORDER_CONTROLLER}?OrderId=${OrderId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrganization = async (data) => {
  try {
    const res = await axios.post(`${SERVER_URL_BUSINESS_CONTROLLER}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addImagesToOrganization = async (filesList, businessId) => {
  try {
    const uploadPromises = filesList.map((file) => uploadBusinessFile(file));
    const imagesList = await Promise.all(uploadPromises);

    const body = {
      imagesList,
      businessId,
    };

    await axios.post(`${SERVER_URL_BUSINESS_IMAGES_CONTROLLER}`, body);
  } catch (error) {
    console.log(error);
  }
};

export const addOrganizationFirstImage = async (file) => {
  try {
    const image = await uploadBusinessFile(file);
    return image.url;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrganization = async (data, businessId) => {
  try {
    const body = {
      ...data,
      businessId: businessId,
    };
    console.log(body);
    const res = await axios.put(`${SERVER_URL_BUSINESS_CONTROLLER}`, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeImagesToOrganization = async (idList) => {
  try {
    await axios.post(`${SERVER_URL_BUSINESS_IMAGES_DELETE_CONTROLLER}`, {
      idList,
    });
  } catch (error) {
    console.log(error.message);
  }
};
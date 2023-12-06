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
    const res = await axios.post(`/api/order/controller`, { userId: user.id });

		const productsOrderData = {
			OrderId: res.data.Order.id,
			productsList: productsCart
		}

		await axios.post(`/api/productsOrder/controller`, productsOrderData);
		
		const productsPayment = productsCart.map((p) => {
			return {
				id: p.id,
				description: p.description,
				title: p.title,
				quantity: p.items,
				unit_price: parseFloat(p.price),
				currency_id: "ARS"

			}
		})

		const paymentData = {
			payer: user,
			items: productsPayment
		}

		const pay = await axios.post(`/api/payment/controller`, paymentData)

		return dispatch({ type: "INIT_POINT", payload: pay.data['init_point'] });
  } catch (error) {
    console.log(error);
  }
};

export const deleteInit_Point = (dispatch) => {
	return dispatch({ type: "DELETE_INIT_POINT" });
}

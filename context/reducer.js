export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_PRODUCTS':
      return {
        ...state,
        products: action.payload
      }
    case 'GET_PRODUCTS_BY_NAME':
      return {
        ...state,
        searchedProducts: action.payload.data,
        searchedTitle: action.payload.title
      }
    case 'DELETE_PRODUCTS_BY_NAME':
      return {
        ...state,
        searchedProducts: null,
        searchedTitle: null
      }
    case "GET_ONE_PRODUCT":
      return {
          ...state,
          product: action.payload,
      };
    case "LOGGED_IN_USER":
      return {
        ...state,
        user: action.payload,
        userIsLogged: true
      }
    case "LOGGED_OUT_USER":
      return {
        ...state,
        user: null,
        userIsLogged: false
      }
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload
      }
    case "ADD_PRODUCT_TO_CART":
      if (!state.productsCart) {
        const total = action.payload.price * action.payload.items 
        return {
          ...state,
          productsCart : [action.payload],
          cartTotalPrice: total
        }
      } else {
        const products = state.productsCart
        const index = products.findIndex( product => product.id === action.payload.id )
        if (index !== -1) {
          products[index] = action.payload
        } else {
          products.push(action.payload)
        }

        let totalPrice = 0
        products.forEach(p => {
          const total = parseFloat(p.price) * p.items

          totalPrice += total
        });

        return {
          ...state,
          productsCart : products,
          cartTotalPrice : totalPrice
        }
      }
    case "DELETE_PRODUCT_TO_CART":
      const products = state.productsCart
      const index = products.findIndex( product => product.id === action.payload.id )
      if (index !== -1) {
        products.splice(index, 1)
      }

      let totalPrice = 0
      products.forEach(p => {
        const total = parseFloat(p.price) * p.items

        totalPrice += total
      });

      return {
        ...state,
        productsCart : products,
        cartTotalPrice : totalPrice
      }
    case "OPEN_CART":
      return {
        ...state,
        openCart: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

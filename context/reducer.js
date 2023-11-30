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
    default:
      return {
        ...state
      }
  }
}

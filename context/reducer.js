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
  
    default:
      return {
        ...state
      }
  }
}
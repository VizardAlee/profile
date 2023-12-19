import { createContext, useContext , useReducer } from "react";

export const ProductsContext = createContext()

export const productsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      }
    case 'CREATE_PRODUCT':
      return {
        ...state,
        products: [action.payload, ...state.products]
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.payload._id)
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload._id ? { ...p, ...action.payload } : p
        )
      }
    default:
      return state
  }
}

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: null
  })


  return (
    <ProductsContext.Provider value={{...state, dispatch}}>
      { children }
    </ProductsContext.Provider>
  )
}

const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider')
  }
  return context
}

export default useProductsContext
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [createdNewProduct, setCreatedNewProduct] = useState(false)

  return (
    <ProductContext.Provider
      value={{ createdNewProduct, setCreatedNewProduct }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext

/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
  const [createdNewCategory, setCreatedNewCategory] = useState(false)

  return (
    <CategoryContext.Provider
      value={{ createdNewCategory, setCreatedNewCategory }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContext

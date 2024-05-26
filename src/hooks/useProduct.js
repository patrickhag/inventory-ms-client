import { useContext } from 'react'
import ProductContext from '../utils/productContext'

export const useProduct = () => useContext(ProductContext)

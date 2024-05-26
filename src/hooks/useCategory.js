import { useContext } from 'react'
import CategoryContext from '../utils/categoryContext'

export const useCategory = () => useContext(CategoryContext)

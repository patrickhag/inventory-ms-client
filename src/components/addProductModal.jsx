/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useCategory } from '../hooks/useCategory'
import { useEffect } from 'react'
import axios from 'axios'
import { useProduct } from '../hooks/useProduct'

const getCategories = async () => {
  try {
    const response = await fetch('http://localhost:8081/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during fetch all categories:', error)
    alert('Error during fetch all categories')
  }
}

const AddProductModal = ({ show, handleClose }) => {
  const [categories, setCategories] = useState([])
  const [productName, setProductName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [availableQuantity, setAvailableQuantity] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [productDescription, setProductDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const { setCreatedNewProduct } = useProduct()

  const supplierId =
    /* localStorage.getItem('supplierId') */ '550e8400-e29b-41d4-a716-446655440000'

  useEffect(() => {
    getCategories().then(({ categories }) => setCategories(categories))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !productName ||
      !selectedCategory ||
      !unitPrice ||
      !availableQuantity ||
      !productImage ||
      !productDescription
    ) {
      setErrorMessage('All fields must be filled.')
      return
    }

    const formData = new FormData()
    formData.append('name', productName)
    formData.append('categoryId', selectedCategory)
    formData.append('supplierId', supplierId)
    formData.append('productImage', productImage)
    formData.append('unitPrice', Number(unitPrice))
    formData.append('availableQuantinty', Number(availableQuantity))
    formData.append('description', productDescription)

    try {
      const response = await axios.post(
        'http://localhost:8081/products/add',
        formData,
        {
          withCredentials: true,
        }
      )
      setCreatedNewProduct((prevStateProduct) => !prevStateProduct)
      handleClose()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div
      className={`modal ${show ? 'show' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Add Product</h5>
          </div>
          <div className='modal-body'>
            {errorMessage && (
              <div className='alert alert-danger' role='alert'>
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='productName'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='productName'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='cars'>Choose a category:</label>
                <select
                  name='category'
                  id='category'
                  className='form-select'
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value='' disabled>
                    Choose
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='unitPrice'>Unit price</label>
                <input
                  type='text'
                  className='form-control'
                  id='unitPrice'
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='availableQuantity'>Available quantity</label>
                <input
                  type='text'
                  className='form-control'
                  id='availableQuantity'
                  value={availableQuantity}
                  onChange={(e) => setAvailableQuantity(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='productImage'>Product image</label>
                <input
                  type='file'
                  className='form-control'
                  id='productImage'
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='productDescription'>Description</label>
                <input
                  type='text'
                  className='form-control'
                  id='productDescription'
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-success'>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProductModal

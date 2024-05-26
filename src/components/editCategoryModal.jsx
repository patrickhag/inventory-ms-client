/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useCategory } from '../hooks/useCategory'
import { useEffect } from 'react'

// grab category name and description by it's add

const getCategory = async (id) => {
  try {
    const response = await fetch(`http://localhost:8081/categories/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during fetch category:', error)
    alert('Error during fetch category')
  }
}

const EditCategoryModal = ({ show, handleClose, categoryId }) => {
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const { setCreatedNewCategory } = useCategory()
  const [categoryInfo, setCategoryInfo] = useState(null)

  useEffect(() => {
    if (show && categoryId) {
      getCategory(categoryId).then(({ data }) => {
        setCategoryInfo(data)
        if (data) {
          setCategoryName(data.name)
          setCategoryDescription(data.description)
        }
      })
    }
  }, [categoryId, show])

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `http://localhost:8081/categories/${categoryId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: categoryName,
            description: categoryDescription,
          }),
          credentials: 'include',
        }
      )
      if (response.ok) {
        setCreatedNewCategory((prevStateCategory) => !prevStateCategory)
        handleClose()
      }
    } catch (error) {
      console.error('Error during add category:', error)
      alert('Error during add category')
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
            <h5 className='modal-title'>Edit Category</h5>
          </div>
          <div className='modal-body'>
            <form onSubmit={handleEditSubmit}>
              <div className='form-group'>
                <label htmlFor='categoryName'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='categoryName'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='categoryDescription'>Description</label>
                <input
                  type='text'
                  className='form-control'
                  id='categoryDescription'
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
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
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCategoryModal

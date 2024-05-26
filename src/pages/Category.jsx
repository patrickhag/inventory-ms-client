import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import AddCategoryModal from '../components/addCategoryModal'
import EditCategoryModal from '../components/editCategoryModal'
import { useEffect } from 'react'
import { useCategory } from '../hooks/useCategory'

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

export default function Category() {
  const [categories, setCategories] = useState([])
  const { createdNewCategory, setCreatedNewCategory } = useCategory()
  const [categoryId, setCategoryId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)

  const handleOpenAddModal = () => {
    setModalType('add')
    setShowModal(true)
  }

  const handleOpenEditModal = (id) => {
    setCategoryId(id)
    setModalType('edit')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalType(null)
  }

  useEffect(() => {
    getCategories().then(({ categories }) => setCategories(categories))
  }, [createdNewCategory])

  const deleteCategory = async (id) => {
    try {
      const confirmToDelete = confirm(
        'Are you sure you want to delete this category?'
      )
      if (confirmToDelete) {
        await fetch(`http://localhost:8081/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        setCreatedNewCategory((prevStateCategory) => !prevStateCategory)
      }
    } catch (error) {
      console.error('Error during delete category:', error)
      alert('Error during delete category')
    }
  }

  return (
    <>
      {showModal && modalType === 'add' && (
        <AddCategoryModal show={showModal} handleClose={handleCloseModal} />
      )}

      {showModal && modalType === 'edit' && (
        <EditCategoryModal
          show={showModal}
          categoryId={categoryId}
          handleClose={handleCloseModal}
        />
      )}

      <div className='container-fluid'>
        <div className='row'>
          <Sidebar />
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h1 className='h2'>Category</h1>
            </div>
            <div>
              <div className='d-flex justify-content-between mb-3'>
                <button
                  className='btn btn-success'
                  onClick={handleOpenAddModal}
                >
                  <i className='bi bi-plus-lg'></i> Add a New Category
                </button>
              </div>

              <div className='table-responsive'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{category.name}</td>
                        <td>
                          <button
                            className='btn btn-primary btn-sm me-2'
                            onClick={() => {
                              handleOpenEditModal(category.id)
                            }}
                          >
                            <i className='bi bi-pencil'></i> Edit
                          </button>
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteCategory(category.id)}
                          >
                            <i className='bi bi-trash'></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <nav aria-label='Page navigation'>
                <ul className='pagination justify-content-end'>
                  <li className='page-item disabled'>
                    <a
                      className='page-link'
                      href='#'
                      tabIndex='-1'
                      aria-disabled='true'
                    >
                      Previous
                    </a>
                  </li>
                  <li className='page-item active'>
                    <a className='page-link' href='#'>
                      1
                    </a>
                  </li>
                  <li className='page-item'>
                    <a className='page-link' href='#'>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

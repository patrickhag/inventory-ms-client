import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

async function getUserData(userId) {
  try {
    const response = await fetch(
      `http://localhost:8081/users/profile/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )
    const { data } = await response.json()
    return data
  } catch (error) {
    console.error('Error during get user data:', error)
    alert('Error during get user data')
  }
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  setErrorMessage('All fields must be filled.')

  async function loginUser(e) {
    e.preventDefault()
    if (!email || !password) {
      setErrorMessage('All fields must be filled.')
      return
    }
    try {
      const response = await fetch('http://localhost:8081/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include',
      })
      if (response.ok) {
        const { userId } = await response.json()
        localStorage.setItem('supplierId', userId)
        const { role } = await getUserData(userId)
        if (role.name === 'ADMINISTRATOR') {
          navigateTo('/admin-dashboard')
        } else if (role.name === 'STAFF') {
          navigateTo('/staff-dashboard')
        } else if (role.name === 'SUPPLIER') {
          navigateTo(`/supplier-dashboard`)
        }
      } else {
        const { Error: error } = await response.json()
        alert(error || 'Failed to login')
      }
    } catch (error) {
      console.error('Error during login:', error)
      alert('Error during login')
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div
        className='card p-4 shadow-lg'
        style={{ borderRadius: '10px', border: '1px solid #7c3aed' }}
      >
        <div className='card-body'>
          {errorMessage && (
            <div className='alert alert-danger' role='alert'>
              {errorMessage}
            </div>
          )}
          <h5 className='card-title text-center mb-4'>
            Inventory management system
          </h5>
          <form onSubmit={loginUser}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                <span role='img' aria-label='person'>
                  👤
                </span>{' '}
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Email'
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                <span role='img' aria-label='lock'>
                  🔒
                </span>{' '}
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Password'
                value={password || ''}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='d-grid'>
              <button
                type='submit'
                className='btn btn-primary'
                style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
              >
                Sign in
              </button>
            </div>
          </form>
          <div className='text-center mt-3'>
            <span className='text-muted'>Or </span>
            <a
              href='/register'
              className='text-decoration-none'
              style={{ fontWeight: 'bold' }}
            >
              sign up now!
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

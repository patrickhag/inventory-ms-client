import { useState } from 'react'
import '../App.css'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function registerUser(e) {
    e.preventDefault()
    if (!fullName || !email || !password) {
      setErrorMessage('All fields must be filled.')
      return
    }
    try {
      const response = await fetch('http://localhost:8081/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      })
      if (response.ok) {
        alert('User registration successfully')
        window.location.href = '/'
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to register')
      }
    } catch (error) {
      console.error('Error during register:', error)
      alert('Error during register')
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
            Register and get to login
          </h5>
          <form onSubmit={registerUser}>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='fullName'
                placeholder='Fullname'
                value={fullName || ''}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
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
              href='/'
              className='text-decoration-none'
              style={{ fontWeight: 'bold' }}
            >
              sign in now!
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../Api/api'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Login () {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin (event) {
    event.preventDefault()

    setError('')

    
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password')
      return
    }

    try {
      setLoading(true)

      const response = await api.post('/auth/login', {
        username,
        password
      })

      
      const userData = response.data

      
      localStorage.setItem('token', userData.accessToken)

      
      localStorage.setItem('user', JSON.stringify(userData))

      
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className='container d-flex justify-content-center align-items-center'
      style={{ minHeight: '85vh' }}
    >
      <div
        className='card shadow border-0 rounded-4 p-4'
        style={{ maxWidth: '450px', width: '100%' }}
      >
       
        <div className='text-center mb-4'>
          <i
            className='bi bi-person-circle text-primary'
            style={{ fontSize: '60px' }}
          ></i>

          <h2 className='fw-bold mt-3'>Welcome Back!</h2>

          <p className='text-muted'>Login to your account</p>
        </div>

        

        <form onSubmit={handleLogin}>
          

          <div className='mb-3'>
            <label className='form-label fw-semibold'>Username</label>

            <input
              type='text'
              className='form-control p-3'
              placeholder='Enter your username'
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </div>

        

          <div className='mb-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <label className='form-label fw-semibold'>Password</label>

              <Link
                to='/forgot-password'
                className='text-primary text-decoration-none small mb-2'
              >
                Forgot Password?
              </Link>
            </div>

            <div className='input-group'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='form-control p-3'
                placeholder='Enter your password'
                value={password}
                onChange={event => setPassword(event.target.value)}
              />

              <button
                type='button'
                className='btn btn-outline-secondary'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

         

          {error && <div className='alert alert-danger'>{error}</div>}

          <button
            type='submit'
            className='btn btn-primary w-100 p-3 fw-semibold'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className='text-center mt-4'>
          <p className='text-muted mb-0'>
            Don't have an account?
            <Link
              to='/register'
              className='fw-bold text-primary text-decoration-none'
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  function handleRegister(event) {
    event.preventDefault()

    const users = JSON.parse(
      localStorage.getItem('registeredUsers') || '[]'
    )

    users.push(formData)

    localStorage.setItem(
      'registeredUsers',
      JSON.stringify(users)
    )

    toast.success('Registration successful!')

    navigate('/login')
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center py-5"
      style={{ minHeight: '85vh' }}
    >

      <div
        className="card shadow border-0 rounded-4 p-4"
        style={{ maxWidth: '450px', width: '100%' }}
      >

        <div className="text-center mb-4">
          <h2 className="fw-bold">Create Account</h2>
          <p className="text-muted">Register your account</p>
        </div>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control p-3"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control p-3"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control p-3"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control p-3"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control p-3"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 p-3"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4 mb-0">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

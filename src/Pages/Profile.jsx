
import React, { useEffect, useState } from 'react'
import { api } from '../Api/api'
import toast from 'react-hot-toast'

export default function Profile() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  
  useEffect(function() {

    async function fetchUser() {

      const token = localStorage.getItem('token')

      if (!token) {
        toast.error('Please login first')
        setLoading(false)
        return
      }

     
      if (token === 'local-user-token') {

        const savedUser = JSON.parse(
          localStorage.getItem('user') || 'null'
        )

        setUser(savedUser)
        setLoading(false)
        return
      }

     
      try {

        const response = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setUser(response.data)

        localStorage.setItem(
          'user',
          JSON.stringify(response.data)
        )

      } catch (error) {

        toast.error('Failed to fetch user data')
        console.log(error)

      } finally {
        setLoading(false)
      }
    }

    fetchUser()

  }, [])


  function handleDeleteAccount() {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account?'
    )

    if (!confirmDelete) return

    // Get registered users
    const users = JSON.parse(
      localStorage.getItem('registeredUsers') || '[]'
    )

   
    const updatedUsers = users.filter(
      item => item.username !== user?.username
    )

    localStorage.setItem(
      'registeredUsers',
      JSON.stringify(updatedUsers)
    )

    // Remove login data
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    toast.success('Account deleted successfully')

    window.location.href = '/register'
  }

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h4>Loading Profile...</h4>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container text-center mt-5">
        <h3>No User Found</h3>
      </div>
    )
  }

  return (

    <div className="container mt-5">

      <div
        className="card shadow border-0 rounded-4 p-4 mx-auto"
        style={{ maxWidth: '600px' }}
      >

        <div className="text-center mb-4">

          {user.image && (
            <img
              src={user.image}
              alt={user.firstName}
              className="rounded-circle mb-3"
              width="120"
              height="120"
            />
          )}

          <h2 className="fw-bold">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-muted">
            @{user.username}
          </p>

        </div>

        <hr />

        <div className="mb-3">
          <strong>Email:</strong>
          <p>{user.email}</p>
        </div>

        <div className="mb-3">
          <strong>Gender:</strong>
          <p>{user.gender || 'Not available'}</p>
        </div>

        <div className="mb-3">
          <strong>Age:</strong>
          <p>{user.age || 'Not available'}</p>
        </div>

        <div className="mb-3">
          <strong>Phone:</strong>
          <p>{user.phone || 'Not available'}</p>
        </div>

        <div className="mb-3">
          <strong>Address:</strong>
          <p>{user.address?.address || 'Not available'}</p>
        </div>

        
        <button
          className="btn btn-danger w-100 mt-3"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>

      </div>

    </div>
  )
}

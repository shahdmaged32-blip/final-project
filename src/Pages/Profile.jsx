import React from 'react'


import { useEffect, useState } from 'react'
import { api } from '../Api/api'
import toast from 'react-hot-toast'

export default function Profile() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchUser() {

      try {
        const token = localStorage.getItem('token')

        if (!token) {
          toast.error('Please login first')
          return
        }

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

      <div className="card shadow border-0 rounded-4 p-4 mx-auto"
        style={{ maxWidth: '600px' }}>

        <div className="text-center mb-4">

          <img
            src={user.image}
            alt={user.firstName}
            className="rounded-circle mb-3"
            width="120"
            height="120"
          />

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
          <p>{user.gender}</p>
        </div>

        <div className="mb-3">
          <strong>Age:</strong>
          <p>{user.age}</p>
        </div>

        <div className="mb-3">
          <strong>Phone:</strong>
          <p>{user.phone}</p>
        </div>

        <div className="mb-3">
          <strong>Address:</strong>
          <p>
            {user.address?.address}
          </p>
        </div>

      </div>

    </div>
  )
}


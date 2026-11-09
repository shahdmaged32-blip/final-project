
import React, { useEffect, useState } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { api } from '../Api/api'

export default function UserDetails() {

  const { id } = useParams()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

    async function AllUsers() {

      try {
        setLoading(true)
        setError(false)

        const response = await api.get(`/users/${id}`)

        setUser(response.data)

      } catch (error) {
        console.log(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    AllUsers()

  }, [id])

  if (loading) {
    return (
      <h3 className='text-center mt-5'>
        Loading...
      </h3>
    )
  }

  if (error || !user) {
    return (
      <Container className='text-center mt-5'>
        <h3>User Not Found</h3>

        <Link to='/users' className='btn btn-primary mt-3'>
          Back to Users
        </Link>
      </Container>
    )
  }

  return (

    <Container className='mt-5'>

      <Card className='mx-auto shadow border-0'
        style={{ width: '400px' }}>

        <img
          src={user.image}
          alt={user.firstName}
          className='rounded-circle mx-auto d-block mt-3'
          width='150'
          height='150'
        />

        <Card.Body>

          <h3 className='text-center'>
            {user.firstName} {user.lastName}
          </h3>

          <hr />

          <p><strong>Email:</strong> {user.email}</p>

          <p><strong>Phone:</strong> {user.phone}</p>

          <p><strong>Age:</strong> {user.age}</p>

          <p><strong>Gender:</strong> {user.gender}</p>

          <p><strong>Username:</strong> {user.username}</p>

          <p><strong>University:</strong> {user.university}</p>

          <p>
            <strong>Country:</strong>
            {user.address?.country || 'Not available'}
          </p>

          <p><strong>Date of Birth:</strong> {user.birthDate}</p>

          <Link to='/users' className='btn btn-primary w-100 mt-3'>
            Back to Users
          </Link>

        </Card.Body>

      </Card>

    </Container>
  )
}

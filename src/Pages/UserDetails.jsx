import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { api } from '../Api/api'

export default function UserDetails () {
  const { id } = useParams()

  const [user, setUser] = useState(null)

  useEffect(
    function () {
      async function AllUsers () {
        try {
          const response = await api.get(`/users/${id}`)
          setUser(response.data)
        } catch (error) {
          console.log(error)
        }
      }

      AllUsers()
    },
    [id]
  )
  if (!user) {
  return <h3>Loading...</h3>;
}
  return (
    <Container className='mt-5'>
      <Card className='mx-auto' style={{ width: '400px' }}>
        <img
          src={user.image}
          alt={user.firstName}
          className='rounded-circle mx-auto d-block mt-3'
          width='150'
          height='150'
        />
        <Card.Body>
          <h3>
            {user.firstName} {user.lastName}
          </h3>

          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Age: {user.age}</p>
          <p>Gender: {user.gender}</p>
          <p>Username: {user.username}</p>
          <p>university: {user.university}</p>
          <p>country: {user.address.country}</p>
          <p>date of birth: {user.birthDate}</p>
        </Card.Body>
      </Card>
    </Container>
  )
}

import React, { useEffect, useState } from 'react'
import { api } from '../Api/api'
import { Button, Card, CardBody, Container, Form, Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Users () {
  const [user, setUser] = useState([])
  const [search, setSearch] = useState('')
  const [skip, setSkip] = useState(0)
  useEffect(
    function () {
      async function AllUsers () {
        try {
          const response = await api.get(
            `/users/search?q=${search}&limit=8&skip=${skip}`
          )
          setUser(response.data.users)
          console.log(response.data.users)
        } catch (error) {
          alert("User not found")
          console.log(error)
        }
      }

      AllUsers()
    },
    [search, skip]
  )

  return (
    <Container className='mt-4'>
      <h2 className='mb-3'>All Users</h2>

      <Form.Control
        type='text'
        placeholder='Search Users...'
        className='mb-4'
        value={search}
        onChange={event => setSearch(event.target.value)}
      />

 <Row>
  {user
    .filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((user) => (
      <Col md={3} key={user.id} className="mb-3">
        <Card>
          <img
            src={user.image}
            alt={user.firstName}
            className="card-img-top"
          />

          <CardBody>
            <Card.Title>
              {user.firstName} {user.lastName}
            </Card.Title>

            <Card.Text>{user.email}</Card.Text>

            <Button
              as={Link}
              to={`/users/${user.id}`}
              variant="primary"
            >
              View Details
            </Button>
          </CardBody>
        </Card>
      </Col>
    ))}
</Row>

      <div className='d-flex justify-content-center gap-3'>
        <Button onClick={() => setSkip(skip - 8)} disabled={skip === 0}>
          Previous
        </Button>

        <Button onClick={() => setSkip(skip + 8)}>Next</Button>
      </div>
    </Container>
  )
}

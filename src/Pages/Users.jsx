
import React, { useEffect, useState } from 'react'
import { api } from '../Api/api'
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Row,
  Col
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Users() {

  const [user, setUser] = useState([])
  const [search, setSearch] = useState('')
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(function()  {

    async function AllUsers() {

      try {
        setLoading(true)
        setError('')

        let response

        if (search.trim() !== '') {
          response = await api.get(
            `/users/search?q=${search}&limit=8&skip=${skip}`
          )
        } else {
          response = await api.get(
            `/users?limit=8&skip=${skip}`
          )
        }

        setUser(response.data.users)
        setTotal(response.data.total)

      } catch (error) {
        console.log(error)
        setError('Something went wrong. Please try again.')
        setUser([])
      } finally {
        setLoading(false)
      }
    }

    AllUsers()

  }, [search, skip])

  function handleSearch(event) {
    setSearch(event.target.value)
    setSkip(0)
  }

  return (

    <Container className='mt-4'>

      <h2 className='mb-3'>All Users</h2>

      <Form.Control
        type='text'
        placeholder='Search Users...'
        className='mb-4'
        value={search}
        onChange={handleSearch}
      />

      {loading && (
        <h4 className='text-center'>Loading Users...</h4>
      )}

      {error && (
        <p className='text-danger text-center'>{error}</p>
      )}

      {!loading && !error && user.length === 0 && (
        <h4 className='text-center'>No Users Found</h4>
      )}

      <Row>

        {!loading && user.map((user) => (

          <Col md={3} key={user.id} className='mb-3'>

            <Card className='h-100'>

              <Card.Img
                variant='top'
                src={user.image}
              />

              <CardBody>

                <Card.Title>
                  {user.firstName} {user.lastName}
                </Card.Title>

                <Card.Text>
                  {user.email}
                </Card.Text>

                <Button
                  as={Link}
                  to={`/users/${user.id}`}
                  variant='primary'
                >
                  View Details
                </Button>

              </CardBody>

            </Card>

          </Col>

        ))}

      </Row>

      {!loading && !error && user.length > 0 && (

        <div className='d-flex justify-content-center gap-3 mt-4'>

          <Button
            onClick={() => setSkip(skip - 8)}
            disabled={skip === 0}
          >
            Previous
          </Button>

          <Button
            onClick={() => setSkip(skip + 8)}
            disabled={skip + 8 >= total}
          >
            Next
          </Button>

        </div>

      )}

    </Container>
  )
}

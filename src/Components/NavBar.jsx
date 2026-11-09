import { Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function NavBar ({ search, setSearch }) {
  const navigate = useNavigate()

  const [token, setToken] = useState(localStorage.getItem('token'))

  const [loginType, setLoginType] = useState(localStorage.getItem('loginType'))

  useEffect(function () {
    function updateAuth () {
      setToken(localStorage.getItem('token'))
      setLoginType(localStorage.getItem('loginType'))
    }

    window.addEventListener('authChanged', updateAuth)

    return () => {
      window.removeEventListener('authChanged', updateAuth)
    }
  }, [])

  function handleLogout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('loginType')

    navigate('/login', { replace: true })
  }
  return (
    <Navbar
      bg='white'
      expand='lg'
      sticky='top'
      className='shadow-sm py-3'
      style={{ zIndex: 1030 }}
    >
      <Container>
        <Navbar.Brand as={Link} to='/' className='fw-bold text-primary'>
          ShopStream
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className='mx-auto align-items-lg-center'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to='/products'>
              Products
            </Nav.Link>

            {token && (
              <>
                <Nav.Link as={Link} to='/cart'>
                  Cart
                </Nav.Link>

                <Nav.Link as={Link} to='/profile'>
                  My Profile
                </Nav.Link>
              </>
            )}

            {token && loginType === 'dummyjson' && (
              <Nav.Link as={Link} to='/dashboard'>
                <i className='bi bi-speedometer2 me-1'></i>
                Dashboard
              </Nav.Link>
            )}
          </Nav>

          <Form.Control
            type='text'
            placeholder='Search products...'
            value={search}
            onChange={event => setSearch(event.target.value)}
            style={{ width: '250px' }}
            className='me-3'
          />

          {token ? (
            <button className='btn btn-outline-danger' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to='/login' className='btn btn-primary'>
              Login
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

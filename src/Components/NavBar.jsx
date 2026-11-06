
import { Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({ search, setSearch }) {

  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const isAdmin = user?.role === 'admin'

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    navigate('/login', { replace: true })
  }

  if (!token) return null

  return (
    <Navbar
      bg='white'
      expand='lg'
      sticky='top'
      className='shadow-sm py-3'
      style={{ zIndex: 1030 }}
    >
      <Container>

        <Navbar.Brand as={Link} to='/'
          className='fw-bold text-primary'>
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

            {!isAdmin && (
              <>
                <Nav.Link as={Link} to='/cart'>
                  Cart
                </Nav.Link>

                <Nav.Link as={Link} to='/profile'>
                  My Profile
                </Nav.Link>
              </>
            )}

            {isAdmin && (
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

          <button
            className='btn btn-outline-danger'
            onClick={handleLogout}
          >
            <i className='bi bi-box-arrow-right me-2'></i>
            Logout
          </button>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}

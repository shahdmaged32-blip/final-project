
import { Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavBar ({ search, setSearch }) {
  return (
    <Navbar bg='white' expand='lg' className='shadow-sm py-3'>
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

    <Nav.Link as={Link} to='/cart'>
      Cart
    </Nav.Link>

    <Nav.Link as={Link} to='/profile'>
      My Profile
    </Nav.Link>

  </Nav>

  <Form.Control
    type='text'
    placeholder='Search products...'
    value={search}
    onChange={event => setSearch(event.target.value)}
    style={{ width: '250px' }}
  />

</Navbar.Collapse>


      </Container>
    </Navbar>
  )
}

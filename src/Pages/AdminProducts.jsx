import { useEffect, useState } from 'react'
import { api } from '../Api/api'
import { Table, Button, Form, Modal, Card, Row, Col } from 'react-bootstrap'
import toast from 'react-hot-toast'
import Loading from '../Components/Loading'

export default function AdminProducts () {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')

  async function fetchProducts () {
    try {
      setLoading(true)
      const response = await api.get('/products?limit=100')
      setProducts(response.data.products || [])
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  function openAddModal () {
    setEditId(null)
    setTitle('')
    setPrice('')
    setCategory('')
    setShowModal(true)
  }

  function openEditModal (product) {
    setEditId(product.id)
    setTitle(product.title)
    setPrice(product.price)
    setCategory(product.category)
    setShowModal(true)
  }

  async function saveProduct (event) {
    event.preventDefault()

    try {
      if (editId) {
        await api.put(`/products/${editId}`, {
          title,
          price: Number(price),
          category
        })

        toast.success('Product updated successfully')
      } else {
        await api.post('/products/add', {
          title,
          price: Number(price),
          category
        })

        toast.success('Product added successfully')
      }

      setShowModal(false)
      fetchProducts()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  async function deleteProduct () {
    try {
      await api.delete(`/products/${deleteId}`)

      setProducts(prev => prev.filter(product => product.id !== deleteId))

      toast.success('Product deleted successfully')
      setShowDelete(false)
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='container-fluid py-5 px-4'>
      <div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3'>
        <div>
          <h2 className='fw-bold'>Products Management</h2>
          <p className='text-muted'>Manage your store products</p>
        </div>

        <Button onClick={openAddModal}>
          <i className='bi bi-plus-lg me-2'></i>
          Add New Product
        </Button>
      </div>

      <Row className='g-3 mb-4'>
        <Col md={4}>
          <Card className='border-0 shadow-sm p-3'>
            <p className='text-muted mb-1'>Total Products</p>
            <h3 className='fw-bold'>{products.length}</h3>
          </Card>
        </Col>

        <Col md={4}>
          <Card className='border-0 shadow-sm p-3'>
            <p className='text-muted mb-1'>Filtered Products</p>
            <h3 className='fw-bold'>{filteredProducts.length}</h3>
          </Card>
        </Col>

        <Col md={4}>
          <Card className='border-0 shadow-sm p-3'>
            <p className='text-muted mb-1'>Categories</p>
            <h3 className='fw-bold'>
              {new Set(products.map(p => p.category)).size}
            </h3>
          </Card>
        </Col>
      </Row>

      <Card className='border-0 shadow-sm p-3'>
        <Form.Control
          className='mb-4'
          placeholder='Search products...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {loading ? (
          <Loading />
        ) : (
          <Table responsive hover className='align-middle'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className='d-flex align-items-center gap-3'>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        width='55'
                        height='55'
                        style={{
                          objectFit: 'contain',
                          borderRadius: '8px'
                        }}
                      />
                      <span className='fw-semibold'>{product.title}</span>
                    </div>
                  </td>

                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.stock ?? '-'}</td>

                  <td>
                    <div className='d-flex gap-2'>
                      <Button
                        variant='primary'
                        size='sm'
                        className='px-3'
                        onClick={() => openEditModal(product)}
                      >
                        <i className='bi bi-pencil-square me-1'></i>
                        Update
                      </Button>

                      <Button
                        variant='danger'
                        size='sm'
                        className='px-3'
                        onClick={() => {
                          setDeleteId(product.id)
                          setShowDelete(true)
                        }}
                      >
                        <i className='bi bi-trash me-1'></i>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className='text-center text-muted py-4'>No products found</p>
        )}
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editId ? 'Update Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={saveProduct}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type='number'
                min='0'
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Cancel
            </Button>

            <Button type='submit'>
              {editId ? 'Update Product' : 'Add Product'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowDelete(false)}>
            Cancel
          </Button>

          <Button variant='danger' onClick={deleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

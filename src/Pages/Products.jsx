import { useEffect, useState } from 'react'
import { api } from '../Api/api'
import ProductCard from '../Components/ProductCard'
import { Card, Form, Pagination } from 'react-bootstrap'
import '../styles/Products.css'
import Loading from '../Components/Loading'
export default function Products ({ search }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('')

  const Limit_Size = 30

  const [skip, setSkip] = useState(0)
  const [totalpages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  function calcSkip (page) {
    setCurrentPage(page)
    setSkip((page - 1) * Limit_Size)
  }

  useEffect(
    function () {
      async function fetchProducts () {
        try {
          setLoading(true)

          let response

          if (category) {
            response = await api.get(`/products/category/${category}`)
          } else {
            response = await api.get(
              `/products/search?q=${search}&limit=${Limit_Size}&skip=${skip}&sortBy=${sort}&order=asc`
            )
          }

          setProducts(response.data.products)

          if (response.data.total) {
            setTotalPages(Math.ceil(response.data.total / Limit_Size))
          }
        } catch (error) {
          setError('Failed to fetch products')
        } finally {
          setLoading(false)
        }
      }

      fetchProducts()
    },
    [search, skip, sort, category]
  )

  useEffect(function () {
    async function fetchCategories () {
      try {
        const response = await api.get('/products/categories')

        setCategories(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategories()
  }, [])

  

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className='container-fluid products-page py-4'>
      <div className='row g-4'>
        <div className='col-lg-2'>
          <Card className='category-card p-3 shadow-sm border-0'>
            <h5 className='fw-bold mb-3'>
              <i className='bi bi-grid me-2 text-primary'></i>
              Category
            </h5>

            <Form.Select
              className='category-select'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value=''>All Products</option>

              {categories.map(cat => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Card>
        </div>

        <div className='col-lg-10'>
          <div className='products-header d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3'>
            <div>
              <h2 className='fw-bold mb-2'>All Products</h2>

              <p className='text-muted mb-0'>
                Showing {products.length} results
              </p>
            </div>

            <div className='sort-box'>
              <i className='bi bi-sort-down text-primary'></i>

              <Form.Select
                className='sort-select'
                value={sort}
                onChange={event => setSort(event.target.value)}
              >
                <option value=''>Sort By</option>
                <option value='price'>Price</option>
                <option value='rating'>Rating</option>
                <option value='title'>Title</option>
              </Form.Select>
            </div>
          </div>

          
<div className="row g-4">

  {loading ? (
    <Loading />
  ) : products.length > 0 ? (
    products.map((product) => (
      <div className="col-md-6 col-lg-4" key={product.id}>
        <ProductCard product={product} />
      </div>
    ))
  ) : (
    <div className="col-12 text-center py-5">
      <i className="bi bi-search text-primary"
        style={{ fontSize: "60px" }}>
      </i>

      <h3 className="fw-bold mt-3">
        Product Not Found!
      </h3>

      <p className="text-muted">
        Sorry, we couldn't find any products matching your search.
      </p>
    </div>
  )}

</div>


          {!loading && products.length !== 0 && !category && (
            <Pagination className='products-pagination justify-content-center mt-5'>
              <Pagination.Prev
                onClick={() => calcSkip(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {Array.from({
                length: totalpages
              }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => calcSkip(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => calcSkip(currentPage + 1)}
                disabled={currentPage === totalpages}
              />
            </Pagination>
          )}
        </div>
      </div>
    </div>
  )
}

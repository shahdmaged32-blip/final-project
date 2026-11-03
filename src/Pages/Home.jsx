
import { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { api } from '../Api/api'
import ProductCard from '../Components/ProductCard'
import Loading from '../Components/Loading'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    async function fetchProducts() {
      try {
        setLoading(true)

        const response = await api.get('/products?limit=4')

        setProducts(response.data.products)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>

      
      <section
        className="py-5"
        style={{
          background: '#eef4ff',
          minHeight: '300px'
        }}
      >
        <Container className="py-4">
          <div className="row align-items-center">

            <div className="col-md-7">
              <h1 className="fw-bold display-5">
                Welcome to <span className="text-primary">ShopStream</span>
              </h1>

              <p className="text-muted fs-5 mt-3">
                Discover amazing products and enjoy
                the best shopping experience.
              </p>

              <Button
                as={Link}
                to="/products"
                variant="primary"
                className="px-4 py-2 mt-2"
              >
                Shop Now
              </Button>
            </div>

            <div className="col-md-5 text-center mt-4 mt-md-0">
              <i
                className="bi bi-bag-heart-fill text-primary"
                style={{ fontSize: '140px' }}
              ></i>
            </div>

          </div>
        </Container>
      </section>

      
      <Container className="py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              Featured Products
            </h2>

            <p className="text-muted mb-0">
              Discover our selected products
            </p>
          </div>

          <Link
            to="/products"
            className="text-primary text-decoration-none fw-bold"
          >
            View All →
          </Link>
        </div>

        <div className="row g-4">

          {loading ? (
            <Loading />
          ) : (
            products.map(product => (
              <div className="col-md-6 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          )}

        </div>

      </Container>

    </div>
  )
}

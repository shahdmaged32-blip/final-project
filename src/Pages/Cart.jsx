import { useEffect, useState } from 'react'
import { api } from '../Api/api'
import { Link } from 'react-router-dom'
import '../styles/Cart.css'
export default function Cart () {
  const [carts, setCarts] = useState([])

  useEffect(function () {
    async function AllCarts () {
      try {
        const response = await api.get('/carts')
        setCarts(response.data.carts)
      } catch (error) {
        console.log(error)
      }
    }

    AllCarts()
  }, [])

  return (
    <div className='container py-5'>
      <div className='text-center mb-5'>
        <h1 className='fw-bold text-dark'>Shopping Carts</h1>
        <p className='text-muted'>Manage and explore all shopping carts</p>
      </div>

      <div className='row g-4'>
        {carts.map(cart => (
          <div className='col-md-6 col-lg-4' key={cart.id}>
            <div className='card border-0 shadow-sm h-100 cart-card'>
              <div className='card-body p-4'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <div className='cart-icon'>
                    <i className='bi bi-cart3'></i>
                  </div>

                  <span className='badge rounded-pill bg-primary-subtle text-primary px-3 py-2'>
                    Cart #{cart.id}
                  </span>
                </div>

                <h5 className='fw-bold mb-4'>Cart #{cart.id}</h5>

                <div className='cart-info'>
                  <div className='d-flex justify-content-between mb-3'>
                    <span className='text-muted'>
                      <i className='bi bi-person me-2'></i>
                      User ID
                    </span>
                    <strong>{cart.userId}</strong>
                  </div>

                  <div className='d-flex justify-content-between mb-3'>
                    <span className='text-muted'>
                      <i className='bi bi-box-seam me-2'></i>
                      Total Products
                    </span>
                    <strong>{cart.totalProducts}</strong>
                  </div>

                  <div className='d-flex justify-content-between mb-3'>
                    <span className='text-muted'>
                      <i className='bi bi-bag me-2'></i>
                      Total Quantity
                    </span>
                    <strong>{cart.totalQuantity}</strong>
                  </div>
                </div>

                <hr />

                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <span className='text-muted fw-semibold'>Total Price</span>
                  <h4 className='text-primary fw-bold mb-0'>${cart.total}</h4>
                </div>

                <Link
                  to={`/cart/${cart.id}`}
                  className='btn btn-primary w-100 rounded-3 py-2 fw-semibold'
                >
                  View Details
                  <i className='bi bi-arrow-right ms-2'></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

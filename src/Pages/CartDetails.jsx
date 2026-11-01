
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../Api/api'
import '../styles/CartDetails.css'

export default function CartDetails () {
  const { id } = useParams()

  const [cart, setCart] = useState(null)

  useEffect(
    function () {
      async function FetchCart () {
        try {
          const response = await api.get(`/carts/${id}`)
          setCart(response.data)
        } catch (error) {
          console.log(error)
        }
      }

      FetchCart()
    },
    [id]
  )

  return (
    <div className='container py-5'>

      {cart && (
        <>
         
          <div className='text-center mb-5'>
            <h1 className='fw-bold text-dark'>
              Cart Details
            </h1>
            <p className='text-muted'>
              Explore your shopping cart and products
            </p>
          </div>

         
          <div className='card border-0 shadow-sm summary-card mb-5'>
            <div className='card-body p-4'>

              <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                <div className='d-flex align-items-center gap-3'>
                  <div className='details-icon'>
                    <i className='bi bi-cart3'></i>
                  </div>

                  <div>
                    <h3 className='fw-bold mb-1'>
                      Cart #{cart.id}
                    </h3>
                    <span className='text-muted'>
                      Shopping Summary
                    </span>
                  </div>
                </div>

                <span className='badge bg-primary-subtle text-primary rounded-pill px-3 py-2'>
                  Cart Information
                </span>
              </div>

              <div className='row g-3'>

                <div className='col-md-4'>
                  <div className='summary-box'>
                    <i className='bi bi-person text-primary'></i>
                    <p>User ID</p>
                    <h5>{cart.userId}</h5>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='summary-box'>
                    <i className='bi bi-box-seam text-primary'></i>
                    <p>Total Products</p>
                    <h5>{cart.totalProducts}</h5>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='summary-box'>
                    <i className='bi bi-bag text-primary'></i>
                    <p>Total Quantity</p>
                    <h5>{cart.totalQuantity}</h5>
                  </div>
                </div>

              </div>

              <hr className='my-4' />

              <div className='d-flex justify-content-between align-items-center'>
                <h5 className='fw-semibold mb-0'>
                  Total Price
                </h5>

                <h3 className='text-primary fw-bold mb-0'>
                  ${cart.total}
                </h3>
              </div>

            </div>
          </div>

        
          <div className='mb-4'>
            <h3 className='fw-bold mb-1'>
              <i className='bi bi-grid me-2 text-primary'></i>
              Cart Items
            </h3>

            <p className='text-muted'>
              All products included in this cart
            </p>
          </div>

          <div className='row g-4'>
            {cart.products.map(product => (
              <div className='col-md-6 col-lg-4' key={product.id}>

                <div className='card product-card border-0 shadow-sm h-100'>

                 
                  <div className='product-image'>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>

                  
                  <div className='card-body p-4'>

                    <h5 className='fw-bold mb-3'>
                      {product.title}
                    </h5>

                    <div className='product-info'>

                      <div className='d-flex justify-content-between mb-3'>
                        <span className='text-muted'>
                          <i className='bi bi-tag me-2'></i>
                          Price
                        </span>
                        <strong>${product.price}</strong>
                      </div>

                      <div className='d-flex justify-content-between mb-3'>
                        <span className='text-muted'>
                          <i className='bi bi-bag me-2'></i>
                          Quantity
                        </span>
                        <strong>{product.quantity}</strong>
                      </div>

                      <div className='d-flex justify-content-between mb-3'>
                        <span className='text-muted'>
                          <i className='bi bi-calculator me-2'></i>
                          Total
                        </span>
                        <strong>${product.total}</strong>
                      </div>

                    </div>

                    <div className='discount-box mt-3'>
                      <span className='text-muted'>
                        Discounted Total
                      </span>

                      <h4 className='text-success fw-bold mb-0'>
                        ${product.discountedTotal}
                      </h4>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>

        </>
      )}

    </div>
  )
}

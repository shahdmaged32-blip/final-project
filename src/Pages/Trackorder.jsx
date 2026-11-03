
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function TrackOrder() {

  const navigate = useNavigate()

  const orders = useSelector(
    state => state.orderSlice.orders
  )

  const order = orders[orders.length - 1]

  if (!order) {
    return (
      <div className="container text-center py-5">
        <h3>No Orders Found</h3>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  const steps = [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered'
  ]

  const currentStep = steps.indexOf(order.status)

  return (
    <div className="container py-5">

      <h2 className="text-center fw-bold mb-2">
        Track Your Order
      </h2>

      <p className="text-center text-muted mb-5">
        Follow your order status
      </p>

      <div className="card shadow-sm border-0 p-4 mx-auto"
        style={{ maxWidth: '750px' }}>

        <h5 className="fw-bold mb-4">
          Order #{order.id}
        </h5>

        <div className="mb-4">
          <p>
            <strong>Customer:</strong> {order.customer.name}
          </p>

          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>

          <p>
            <strong>Address:</strong> {order.customer.address}
          </p>

          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>

          <p>
            <strong>Total Price:</strong>
            <span className="text-primary fw-bold ms-2">
              ${order.totalPrice.toFixed(2)}
            </span>
          </p>
        </div>

        <hr />

        <h5 className="fw-bold mb-4">
          Order Status
        </h5>

        {steps.map((step, index) => (

          <div
            key={step}
            className="d-flex align-items-center mb-4"
          >

            <div
              className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${
                index <= currentStep
                  ? 'bg-success text-white'
                  : 'bg-light text-secondary'
              }`}
              style={{
                width: '40px',
                height: '40px'
              }}
            >
              {index + 1}
            </div>

            <span className={
              index <= currentStep
                ? 'fw-bold text-success'
                : 'text-muted'
            }>
              {step}
            </span>

          </div>

        ))}

        <hr />

        <h5 className="fw-bold mb-3">
          Ordered Products
        </h5>

        {order.products.map((product, index) => (

          <div
            key={product.id || index}
            className="d-flex justify-content-between border-bottom py-3"
          >
            <span>
              {product.title || product.name}
              {' '} x {product.quantity}
            </span>

            <strong>
              ${(product.price * product.quantity).toFixed(2)}
            </strong>
          </div>

        ))}

      </div>

    </div>
  )
}


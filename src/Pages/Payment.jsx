
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addOrder } from '../Store/Slices/orderSlice'
import { clearCart } from '../Store/Slices/cartSlice'

export default function Payment() {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const checkoutData = location.state

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

  if (!checkoutData) {
    return (
      <div className="container py-5 text-center">
        <h3>No Checkout Data Found</h3>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/cart')}
        >
          Back To Cart
        </button>
      </div>
    )
  }

function handleSubmit(event) {
  event.preventDefault()

  dispatch(addOrder({
    ...checkoutData,
    paymentMethod
  }))

  dispatch(clearCart())

  navigate('/track-order')
}

  return (
    <div className="container py-5">

      <h2 className="text-center fw-bold mb-4">
        Payment
      </h2>

      <div className="card shadow-sm border-0 p-4 mx-auto"
        style={{ maxWidth: '600px' }}>

        <h5 className="mb-4">Payment Method</h5>

        <form onSubmit={handleSubmit}>

          <div className="border rounded p-3 mb-3">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <label className="ms-2">
              Cash on Delivery
            </label>
          </div>

          <div className="border rounded p-3 mb-4">
            <input
              type="radio"
              name="payment"
              value="Card"
              checked={paymentMethod === 'Card'}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />

            <label className="ms-2">
              Credit / Debit Card
            </label>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <strong>Total Price</strong>

            <strong className="text-primary">
              ${checkoutData.totalPrice.toFixed(2)}
            </strong>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 p-3"
          >
            Confirm Order
          </button>

        </form>

      </div>
    </div>
  )
}


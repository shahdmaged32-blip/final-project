
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {

  const navigate = useNavigate()

  const carts = useSelector(
    state => state.cartSlice.items
  )

  const totalPrice = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (carts.length === 0) {
      return
    }

    const orderData = {
      customer: formData,
      products: carts,
      totalPrice: totalPrice
    }

    navigate('/payment', {
      state: orderData
    })
  }

  if (carts.length === 0) {
    return (
      <div className="container text-center py-5">
        <h3>Your Cart Is Empty</h3>
      </div>
    )
  }

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold">Checkout</h2>
        <p className="text-muted">
          Complete your shipping information
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-4">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control p-3"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control p-3"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  className="form-control p-3"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Address
                </label>

                <textarea
                  name="address"
                  className="form-control p-3"
                  rows="3"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="border rounded-3 p-3 mb-4">
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">
                    Total Price
                  </span>

                  <h5 className="text-primary fw-bold">
                    ${totalPrice.toFixed(2)}
                  </h5>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 p-3 fw-semibold"
              >
                Place Order
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

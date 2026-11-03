import { Link } from 'react-router-dom'
import '../styles/Cart.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from '../Store/Slices/cartSlice'

export default function Cart () {
  const dispatch = useDispatch()

  const carts = useSelector(state => state.cartSlice.items)
  console.log('CART ITEMS:', carts)

  const totalPrice = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className='container py-5'>
      <div className='text-center mb-5'>
        <h1 className='fw-bold text-dark'>Shopping Cart</h1>
        <p className='text-muted'>Manage your selected products</p>
      </div>

      {carts.length === 0 ? (
        <div className='text-center py-5'>
          <i
            className='bi bi-cart-x text-primary'
            style={{ fontSize: '70px' }}
          ></i>

          <h3 className='fw-bold mt-3'>Your Cart Is Empty</h3>

          <p className='text-muted'>
            Start shopping and add products to your cart.
          </p>

          <Link to='/products' className='btn btn-primary mt-3'>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className='row g-4'>
            <div className='col-lg-8'>
              {carts.map(item => (
                <div className='card border-0 shadow-sm mb-4' key={item.id}>
                  <div className='card-body p-4'>
                    <div className='row align-items-center g-3'>
                      <div className='col-md-3'>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className='img-fluid'
                          style={{
                            height: '130px',
                            width: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>

                      <div className='col-md-5'>
                        <h5 className='fw-bold'>{item.title}</h5>

                        <p className='text-muted mb-2'>${item.price}</p>

                        <button
                          className='btn btn-sm btn-outline-danger'
                          onClick={() => dispatch(removeItemFromCart(item))}
                        >
                          <i className='bi bi-trash me-1'></i>
                          Remove
                        </button>
                      </div>

                      <div className='col-md-4'>
                        <div className='d-flex align-items-center justify-content-center gap-3'>
                          <button
                            className='btn btn-outline-primary'
                            onClick={() => dispatch(decreaseQuantity(item))}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>

                          <strong>{item.quantity}</strong>

                          <button
                            className='btn btn-outline-primary'
                            onClick={() => dispatch(increaseQuantity(item))}
                          >
                            +
                          </button>
                        </div>

                        <h5 className='text-primary fw-bold text-center mt-3'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='col-lg-4'>
              <div className='card border-0 shadow-sm p-4'>
                <h4 className='fw-bold mb-4'>Order Summary</h4>

                <div className='d-flex justify-content-between mb-3'>
                  <span>Total Products</span>
                  <strong>{carts.length}</strong>
                </div>

                <div className='d-flex justify-content-between mb-3'>
                  <span>Total Quantity</span>
                  <strong>{totalQuantity}</strong>
                </div>

                <hr />

                <div className='d-flex justify-content-between mb-4'>
                  <h5>Total Price</h5>

                  <h5 className='text-primary fw-bold'>
                    ${totalPrice.toFixed(2)}
                  </h5>
                </div>

                <Link to='/checkout' className='btn btn-primary w-100 mb-3'>
                  Proceed To Checkout
                </Link>

                <button
                  className='btn btn-outline-danger w-100'
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>

                <Link
                  to='/products'
                  className='text-center mt-3 text-decoration-none'
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

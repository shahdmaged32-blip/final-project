
import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className='container py-5'>

      <div className='mb-5'>
        <h2 className='fw-bold'>Admin Dashboard</h2>
        <p className='text-muted'>
          Welcome to ShopStream management system
        </p>
      </div>

      <div className='row g-4 mb-5'>

        
        <div className='col-md-4'>
          <div className='card border-0 shadow-sm p-3'>
            <div className='card-body'>
              <i className='bi bi-box-seam text-primary fs-2'></i>
              <h6 className='text-muted mt-3'>Products</h6>
              <h3 className='fw-bold'>Products Management</h3>

              <Link
                to='/admin-products'
                className='text-primary text-decoration-none'
              >
                View Products →
              </Link>
            </div>
          </div>
        </div>

      
        <div className='col-md-4'>
          <div className='card border-0 shadow-sm p-3'>
            <div className='card-body'>
              <i className='bi bi-people text-success fs-2'></i>
              <h6 className='text-muted mt-3'>Users</h6>
              <h3 className='fw-bold'>Users Management</h3>

              <Link
                to='/users'
                className='text-success text-decoration-none'
              >
                View Users →
              </Link>
            </div>
          </div>
        </div>

        
        <div className='col-md-4'>
          <div className='card border-0 shadow-sm p-3'>
            <div className='card-body'>
              <i className='bi bi-cart text-warning fs-2'></i>
              <h6 className='text-muted mt-3'>Carts</h6>
              <h3 className='fw-bold'>Carts Management</h3>

              <Link to='/cart' className='text-warning text-decoration-none'>
                View Carts →
              </Link>
            </div>
          </div>
        </div>

      </div>

      <h4 className='fw-bold mb-4'>Management</h4>

      <div className='row g-4 mb-5'>

        
        <div className='col-md-6'>
          <div className='card border-0 shadow-sm h-100'>
            <div className='card-body p-4'>
              <h5 className='fw-bold'>Products Management</h5>
              <p className='text-muted'>
                View and manage your store products.
              </p>

              <Link to='/admin-products' className='btn btn-primary me-2'>
                View Products
              </Link>

              <Link to='/add-products' className='btn btn-outline-primary'>
                Add Product
              </Link>
            </div>
          </div>
        </div>

       
        <div className='col-md-6'>
          <div className='card border-0 shadow-sm h-100'>
            <div className='card-body p-4'>
              <h5 className='fw-bold'>Users Management</h5>
              <p className='text-muted'>
                View users and their details.
              </p>

              <Link to='/users' className='btn btn-success'>
                View Users
              </Link>
            </div>
          </div>
        </div>

        
        <div className='col-md-6'>
          <div className='card border-0 shadow-sm h-100'>
            <div className='card-body p-4'>
              <h5 className='fw-bold'>Carts Management</h5>
              <p className='text-muted'>
                View shopping carts.
              </p>

              <Link to='/cart' className='btn btn-warning'>
                View Carts
              </Link>
            </div>
          </div>
        </div>

       
        <div className='col-md-6'>
          <div className='card border-0 shadow-sm h-100'>
            <div className='card-body p-4'>
              <h5 className='fw-bold'>Authentication</h5>
              <p className='text-muted'>
                Access your account and profile.
              </p>

              <Link to='/login' className='btn btn-secondary me-2'>
                Login
              </Link>

              <Link to='/profile' className='btn btn-outline-secondary'>
                My Profile
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

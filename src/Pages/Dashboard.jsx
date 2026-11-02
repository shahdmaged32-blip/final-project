import React from 'react'

import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Dashboard</h1>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h4>Products</h4>
              <Link
                to="/products"
                className="btn btn-primary mt-3"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h4>Users</h4>
              <Link
                to="/users"
                className="btn btn-success mt-3"
              >
                View Users
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h4>Carts</h4>
              <Link
                to="/cart"
                className="btn btn-warning mt-3"
              >
                View Carts
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h4>Profile</h4>
              <Link
                to="/profile"
                className="btn btn-info mt-3"
              >
                My Profile
              </Link>
            </div>
          </div>
        </div>

      </div>

      <div className="row mt-5 g-4">

        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5>Add Product</h5>

              <Link
                to="/add-products"
                className="btn btn-dark mt-2"
              >
                Add Product
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5>Authentication</h5>

              <Link
                to="/login"
                className="btn btn-secondary mt-2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

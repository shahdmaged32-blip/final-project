import React from 'react'

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-3">Final Project</h1>

      <p className="lead">
        Products, Users, Carts & Authentication System
      </p>

      <div className="mt-4">
        <Link to="/products" className="btn btn-primary mx-2">
          Products
        </Link>

        <Link to="/users" className="btn btn-success mx-2">
          Users
        </Link>

        <Link to="/cart" className="btn btn-warning mx-2">
          Carts
        </Link>
      </div>
    </div>
  );
}

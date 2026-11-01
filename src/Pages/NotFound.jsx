import React from 'react'

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container d-flex justify-content-center align-items-center text-center"
      style={{ minHeight: '85vh' }}>

      <div className="bg-white shadow rounded-4 p-5">

        <i className="bi bi-exclamation-circle text-primary"
          style={{ fontSize: '65px' }}>
        </i>

        <h1 className="display-1 fw-bold text-primary mt-3">
          404
        </h1>

        <h2 className="fw-bold mb-3">
          Page Not Found!
        </h2>

        <p className="text-muted mb-4">
          Oops! The page you are looking for doesn't exist
          or has been moved.
        </p>

        <Link to="/" className="btn btn-primary px-4 py-2 rounded-3">
          <i className="bi bi-house-door me-2"></i>
          Back To Home
        </Link>

      </div>

    </div>
  )
}


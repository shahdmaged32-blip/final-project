import React from 'react'
import '../styles/Loading.css'
export default function Loading() {
  return (
    <div className="row g-4">

      {Array.from({ length: 9 }).map((_, index) => (
        <div className="col-md-6 col-lg-4" key={index}>
          <div className="card skeleton-card border-0 shadow-sm">

            <div className="skeleton skeleton-image"></div>

            <div className="card-body p-4">
              <div className="skeleton skeleton-title mb-3"></div>

              <div className="skeleton skeleton-text mb-2"></div>

              <div className="skeleton skeleton-text mb-3"></div>

              <div className="skeleton skeleton-button"></div>
            </div>

          </div>
        </div>
      ))}

    </div>
  )
}


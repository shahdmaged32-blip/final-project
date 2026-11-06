import React from 'react'
import { Button, Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ProductCard ({ product }) {
  return (
    <Card className='h-100 shadow-sm border-0 product-card'>
      <div className='position-relative bg-light'>
        <Card.Img
          variant='top'
          src={product.thumbnail}
          style={{
            height: '220px',
            objectFit: 'contain',
            padding: '15px'
          }}
        />

        <Badge bg='success' className='position-absolute top-0 end-0 m-3'>
          {product.availabilityStatus}
        </Badge>
      </div>

      <Card.Body className='d-flex flex-column'>
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <small className='text-muted'>{product.brand}</small>

          <span className='text-warning fw-semibold'>⭐ {product.rating}</span>
        </div>

        <Card.Title className='fw-bold'>{product.title}</Card.Title>

        <Card.Text className='text-muted small'>
          {product.description}
        </Card.Text>

        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h4 className='text-success fw-bold mb-0'>${product.price}</h4>

          <Badge bg='danger'>{product.discountPercentage}% OFF</Badge>
        </div>

        <hr />

        <div className='small text-muted mb-3'>
          <p>
            <i className='bi bi-arrow-return-left me-2'></i>
            {product.returnPolicy}
          </p>

          <p>
            <i className='bi bi-box-seam me-2'></i>
            Minimum Order: {product.minimumOrderQuantity}
          </p>
          <p>
            <i className='bi bi-box-seam me-2'></i>
            stock: {product.stock}
          </p>
        </div>
        <div className='d-flex gap-2'>
          <Button
            as={Link}
            to={`/products/${product.id}`}
            className='flex-fill'
          >
            View Details
          </Button>

          <Button
            variant='warning'
            as={Link}
            to={`/update-products/${product.id}`}
          >
            Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

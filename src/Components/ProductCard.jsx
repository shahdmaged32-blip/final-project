import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card className="h-100 shadow-sm border-0">

  <Card.Img
    variant="top"
    src={product.thumbnail}
    style={{
      height: "220px",
      objectFit: "contain",
      padding: "15px"
    }}
  />

  <Card.Body>

    <Card.Title
      style={{ minHeight: "70px" }}
    >
      {product.title}
    </Card.Title>

    <p>⭐ {product.rating}</p>

    <h5 className="text-success">
      ${product.price}
    </h5>

    <Button
      as={Link}
      to={`/products/${product.id}`}
      className="w-100"
    >
      View Details
    </Button>

  </Card.Body>
</Card>
  );
}
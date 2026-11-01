import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Badge } from "react-bootstrap";
import { api } from "../Api/api";
import "../styles/productstyle.css";


export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(function() {
    async function fetchProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.thumbnail)
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct();
  }, [id]);

  return (
    <div className="container mt-5">
      <Row  className="product-details-card shadow mt-5">

        <Col md={6}>
  <div className="d-flex gap-3">

    <div className="d-flex flex-column gap-3">
      {product.images?.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          onClick={() => setSelectedImage(image)}
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />
      ))}
    </div>

    <Card className="flex-grow-1 border-0 shadow-sm">
      <Card.Img
        src={selectedImage || product.thumbnail}
        style={{
          height: "500px",
          objectFit: "contain",
          padding: "20px"
        }}
      />
    </Card>

  </div>
</Col>

        <Col md={6}>
          <Badge bg="success" className="mb-3">
            New Arrival
          </Badge>

          <h2 className="fw-bold">{product.title}</h2>

          <p>
            ⭐ {product.rating}
          </p>

          <h1 className="fw-bold text-dark">
            ${product.price}
          </h1>

          <p className="text-muted">
            Category: {product.category}
          </p>

          <hr />

          <p>
            {product.description}
          </p>

          <div className="d-flex gap-2 mt-4">
            <Button variant="primary" className="flex-grow-1">
              Add To Cart
            </Button>

            <Button
              variant="warning"
              as={Link}
              to={`/update-products/${product.id}`}
            >
              Update
            </Button>

            <Button
              variant="danger"
              onClick={async () => {
                try {
                  await api.delete(`/products/${id}`);
                  alert("Product Deleted");
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Delete
            </Button>
          </div>
<Row className="mt-5">
  <Col md={6} className="feature-item">
    ✅ 2 Year Warranty
  </Col>

  <Col md={6} className="feature-item">
    🚚 Fast Delivery
  </Col>

  <Col md={6} className="feature-item mt-3">
    ↩️ 30 Day Returns
  </Col>

  <Col md={6} className="feature-item mt-3">
    🎧 Lifetime Support
  </Col>
</Row>

        </Col>
      </Row>
    </div>
  );
}
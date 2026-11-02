import React, { useState } from "react";
import { api } from "../Api/api";
import { Button, Card, Container, Form, Toast } from "react-bootstrap";
import toast from "react-hot-toast";

export default function AddProducts() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  async function addProduct(event) {
    event.preventDefault();

    try {
      const response = await api.post("/products/add", {
        title,
        price,
        category,
      });

      console.log(response.data);
      Toast.success("Product Added Successfully");

      setTitle("");
      setPrice("");
      setCategory("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card
        className="shadow-lg border-0 rounded-4 p-4"
        style={{ width: "500px" }}
      >
        <h2 className="text-center mb-4">Add Product</h2>

        <Form onSubmit={addProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Add Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
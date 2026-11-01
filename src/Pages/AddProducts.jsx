import React, { useState } from "react";
import { api } from "../Api/api";

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
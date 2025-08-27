import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "./productSlice";

function AddProductForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ name, price: parseFloat(price), inStock }));
    setName("");
    setPrice("");
    setInStock(true);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
        />
        In Stock
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;

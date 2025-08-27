import React, { useState } from "react";
import ProductList from "../features/products/productList";
import AddProductForm from "../features/products/AddProductForm";
import { updateProduct } from "../features/products/productSlice";
import { useDispatch } from "react-redux";

function ProductsPage() {
  const [editingProduct, setEditingProduct] = useState(null);
  const dispatch = useDispatch();

  const handleEditSubmit = (updatedProduct) => {
    dispatch(
      updateProduct({ id: editingProduct.id, updatedData: updatedProduct })
    );
    setEditingProduct(null);
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>
      <AddProductForm />
      <ProductList onEdit={setEditingProduct} />
    </div>
  );
}

export default ProductsPage;

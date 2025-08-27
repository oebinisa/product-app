// src/features/products/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, deleteProduct } from "./productSlice";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selected, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          alert("✅ Product deleted successfully!");
          navigate("/"); // Redirect to product list
        })
        .catch((err) => {
          alert("❌ Failed to delete product: " + err.message);
        });
    }
  };

  // Helper function to check admin role consistently
  const isAdmin = () => {
    if (!user || !user.role) return false;
    return user.role.toLowerCase().trim() === "admin";
  };

  if (loading || !selected) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      {!imgLoaded && <p>Loading image...</p>}
      <img
        src={selected.imageUrl}
        alt={selected.name}
        width="300"
        style={{ display: imgLoaded ? "block" : "none", margin: "auto" }}
        onLoad={() => setImgLoaded(true)}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300?text=No+Image";
          setImgLoaded(true);
        }}
      />
      <h2>{selected.name}</h2>
      <p>${selected.price}</p>
      <p>{selected.inStock ? "In Stock" : "Out of Stock"}</p>

      <div style={{ marginTop: "1rem" }}>
        {/* Only logged-in users can edit */}
        {user && (
          <Link to={`/edit/${selected.id}`} style={{ marginRight: "1rem" }}>
            ✏️ Edit
          </Link>
        )}

        {/* Only admins can delete - FIXED */}
        {isAdmin() && (
          <button
            onClick={handleDelete}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
}

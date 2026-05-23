import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function ProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!title.trim()) {
      setError("Title is required");
      setLoading(false);
      return;
    }

    if (!price || parseFloat(price) < 0) {
      setError("Price must be a positive number");
      setLoading(false);
      return;
    }

    const newProduct = { title, price: parseFloat(price), inStock };
    fetch("http://localhost:5175/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("failed to add product");
        }
        return r.json();
      })
      .then((data) => {
        console.log("Product added:", data);
        setTitle("");
        setPrice("");
        setInStock(true);
        navigate("/products/" + data.id);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to add product. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="product-form-container">
      <NavBar />
      <h2>Add New Product</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Product Title</label>
          <input id="title" type="text" placeholder="Enter product title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input id="price" type="number" step="0.01" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="inStock">
            <input id="inStock" type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
            In Stock
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;

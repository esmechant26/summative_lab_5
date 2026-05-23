import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5175/products/${id}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch product");
        }
        return r.json();
      })
      .then(setProduct)
      .catch((err) => {
        console.error(err);
        setError("Product not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (error || !product) {
    return <h2>{error || "Product not found."}</h2>;
  }

  return (
    <div className="product-card">
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default ProductCard;

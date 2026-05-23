import { Link } from "react-router-dom";

const ProductList = ({ products = [] }) => {
  return (
    <ul className="product-list">
      {products.map((p) => (
        <li key={p.id} className="product-item">
          <Link to={`/products/${p.id}`}>
            <h3>{p.title}</h3>
          </Link>
          <p>Price: ${p.price}</p>
          <p>{p.inStock ? "In Stock" : "Out of Stock"}</p>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;

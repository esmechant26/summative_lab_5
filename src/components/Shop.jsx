import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";
import "./Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5175/products")
      .then((r) => {
        if (!r.ok) {
          throw new Error("failed to fetch products");
        }
        return r.json();
      })
      .then(setProducts)
      .catch(console.error);
  }, []);

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <NavBar />

      <main>
        <div className="shop-header">
          <h1>Shop</h1>
          <p>Browse air conditioning products, search by name, and add a new item to the catalog.</p>
        </div>

        <SearchBar setSearch={setSearch} />

        <div className="shop-actions">
          <Link to="/form" className="action-button">
            Add Product
          </Link>
        </div>

        {products.length > 0 ? filteredProducts.length > 0 ? <ProductList products={filteredProducts} /> : <p>No products match your search.</p> : <p>Loading products...</p>}
      </main>
    </>
  );
}

export default Shop;

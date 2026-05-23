import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5175/products")
      .then((r) => {
        if (!r.ok) {
          throw new Error("failed to fetch products");
        }
        return r.json();
      })
      .then(setProducts)
      .catch(console.log);
  }, []);

  return (
    <>
      <NavBar />

      <main>
        <h1>Welcome to the Product Directory!</h1>

        <Outlet context={{ products, setProducts }} />
      </main>
    </>
  );
};

export default ProductContainer;

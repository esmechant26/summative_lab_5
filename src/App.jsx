import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import Home from "./components/Home";
import Shop from "./components/Shop";
import About from "./components/About";
import AdminPortal from "./components/AdminPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:id" element={<ProductCard />} />
        <Route path="/form" element={<ProductForm />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./Home.css";

function Home() {
  return (
    <>
      <NavBar />

      <main>
        <div className="home-hero">
          <h1>Welcome to the Air Con Sales</h1>

          <p>
            Air Con Sales is a product catalog for air conditioning parts and accessories. Browse the shop to find available inventory, search for specific items, and add new products to the catalog.
          </p>

          <p>The app demonstrates a clean React Router layout with dedicated pages for browsing products, viewing details, and adding inventory.</p>
        </div>

        <nav className="page-links">
          <Link to="/about">Learn More About This App</Link>
        </nav>
      </main>
    </>
  );
}

export default Home;

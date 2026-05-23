import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/shop" className="nav-link">
        Shop
      </NavLink>
      <NavLink to="/admin" className="nav-link">
        Admin Portal Login
      </NavLink>
    </nav>
  );
}

export default NavBar;

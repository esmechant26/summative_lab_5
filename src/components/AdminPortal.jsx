import { useEffect, useState } from "react";
import NavBar from "./NavBar";

function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "password123";

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:5175/products")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch products");
        return r.json();
      })
      .then(setProducts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEditingId(null);
    setEditData({});
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditData({ ...product });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveProduct = (id) => {
    fetch(`http://localhost:5175/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to update product");
        return r.json();
      })
      .then(() => {
        setProducts(products.map((p) => (p.id === id ? editData : p)));
        setEditingId(null);
        setEditData({});
      })
      .catch((err) => console.error(err));
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5175/products/${id}`, { method: "DELETE" })
        .then((r) => {
          if (!r.ok) throw new Error("Failed to delete product");
          setProducts(products.filter((p) => p.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <NavBar />
        <div className="login-container">
          <h2>Admin Portal - Login</h2>
          {loginError && <p className="error-message">{loginError}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="hint">Demo: username: admin | password: password123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal">
      <div className="admin-header">
        <h1>Admin Portal</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-table">
          <h2>Manage Products</h2>
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>In Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    {editingId === product.id ? (
                      <>
                        <td>{product.id}</td>
                        <td>
                          <input type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                        </td>
                        <td>
                          <input type="number" step="0.01" value={editData.price} onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })} />
                        </td>
                        <td>
                          <input type="checkbox" checked={editData.inStock} onChange={(e) => setEditData({ ...editData, inStock: e.target.checked })} />
                        </td>
                        <td>
                          <button onClick={() => saveProduct(product.id)} className="save-btn">
                            Save
                          </button>
                          <button onClick={cancelEdit} className="cancel-btn">
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>{product.inStock ? "Yes" : "No"}</td>
                        <td>
                          <button onClick={() => startEdit(product)} className="edit-btn">
                            Edit
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="delete-btn">
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPortal;

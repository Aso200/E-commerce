import { useState, useEffect } from 'react';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminAddProduct from './AdminAddProduct';
import './AdminDashboard.css';

function AdminDashboard() {
  const [displayProducts, setDisplayProducts] = useState(false);
  const [displayAddProduct, setDisplayAddProduct] = useState(false);
  const [displayOrders, setDisplayOrders] = useState(false);

  const showProducts = () => {
    setDisplayProducts(true);
    setDisplayAddProduct(false);
    setDisplayOrders(false);
  };

  const showOrders = () => {
    setDisplayProducts(false);
    setDisplayAddProduct(false);
    setDisplayOrders(true);
  };

  const showAddProduct = () => {
    setDisplayProducts(false);
    setDisplayAddProduct(true);
    setDisplayOrders(false);
  };

  useEffect(() => {
    if (displayProducts) {
    }
    if (displayOrders) {
    }
  }, [displayProducts, displayOrders]);

  return (
    <div className="admin-dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
      <div className="admin-buttons">
        <button className={displayProducts ? 'active' : ''} onClick={showProducts}>
          Show Admin Products
        </button>
        <button className={displayOrders ? 'active' : ''} onClick={showOrders}>
          Show Admin Orders
        </button>
        <button className={displayAddProduct ? 'active' : ''} onClick={showAddProduct}>
          Show Add Product
        </button>
      </div>
      {displayProducts ? <AdminProducts /> : null}
      {displayAddProduct ? <AdminAddProduct /> : null}
      {displayOrders ? <AdminOrders /> : null}
    </div>
  );
}

export default AdminDashboard;

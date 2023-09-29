import React, { useState } from 'react';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminAddProduct from './AdminAddProduct';

function AdminDashboard() {
  const [displayProducts, setDisplayProducts] = useState(true);
  const [displayAddProduct, setDisplayAddProduct] = useState(false);

  const showProducts = () => {
    setDisplayProducts(true);
    setDisplayAddProduct(false);
  };

  const showOrders = () => {
    setDisplayProducts(false);
    setDisplayAddProduct(false);
  };

  const showAddProduct = () => {
    setDisplayProducts(false);
    setDisplayAddProduct(true);
  };

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <div>
        <button onClick={showProducts}>Show Admin Products</button>
        <button onClick={showOrders}>Show Admin Orders</button>
        <button onClick={showAddProduct}>Show Add Product</button>
      </div>
      {displayProducts ? <AdminProducts /> : null}
      {displayAddProduct ? <AdminAddProduct /> : null}
      {!(displayProducts || displayAddProduct) ? <AdminOrders /> : null}
    </div>
  );
}

export default AdminDashboard;

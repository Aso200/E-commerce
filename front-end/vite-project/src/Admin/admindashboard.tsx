import React, { useState, useEffect } from 'react';
import { Order } from './order';

function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = () => {
    setLoading(true);
    fetch('http://localhost:3000/getOrders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading orders:', error);
        setLoading(false);
      });
  };

  const updateOrderStatus = (orderId) => {
    const newStatus = 'Sent';

    fetch(`http://localhost:3000/getOrders/${orderId}/updateStatus`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newStatus }),
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
        loadOrders();
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  };

  useEffect(() => {

  }, []);

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>

      <button onClick={loadOrders} disabled={loading}>
        {loading ? 'Loading...' : 'Load Orders'}
      </button>

      <div>
        <h2>Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order._id} style={{ marginBottom: '20px' }}>
              Order ID: {order._id}, <br /> Total Amount: {order.total}
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    Product: {item.name}, Size: {item.selectedSize}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              {order.status && <div>Order Status: {order.status}</div>}
              <button onClick={() => updateOrderStatus(order._id)}>Mark as Sent</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;

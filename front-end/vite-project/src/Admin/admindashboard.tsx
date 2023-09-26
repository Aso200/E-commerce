import React, { useState, useEffect } from 'react';
import { Order } from './order'; // Assuming 'order.tsx' is in the same 'Admin' folder

function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to load orders
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
    const newStatus = 'Sent'; // Change this as needed

    fetch(`http://localhost:3000/getOrders/${orderId}/updateStatus`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newStatus }),
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        // Update the order status in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
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

      {/* Button to load orders */}
      <button onClick={loadOrders} disabled={loading}>
        {loading ? 'Loading...' : 'Load Orders'}
      </button>

      {/* Display the orders */}
      <div>
        <h2>Orders</h2>
        <ul>
  {orders.map((order) => (
    <li key={order._id} style={{ marginBottom: '20px' }}> {/* Add margin to create space */}
      Order ID: {order._id}, <br /> Total Amount: {order.total}
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            Product: {item.name}, Size: {item.selectedSize}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      {/* Conditionally display the order status */}
      {order.status && <div>Order Status: {order.status}</div>}
      {/* Button to mark the order as "Sent" */}
      <button onClick={() => updateOrderStatus(order._id)}>Mark as Sent</button>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
}

export default AdminDashboard;

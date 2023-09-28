import React, { useState, useEffect } from 'react';

interface Order {
  _id: string;
  total: number;
  items: {
    name: string;
    selectedSize: string;
    quantity: number;
  }[];
  status: string | null;
}

function AdminOrders(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadOrders = () => {
    setLoading(true);
    fetch('http://localhost:3000/getOrders')
      .then((response) => response.json())
      .then((data: Order[]) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading orders:', error);
        setLoading(false);
      });
  };

  const updateOrderStatus = (orderId: string) => {
    const newStatus = 'Sent';

    fetch(`http://localhost:3000/getOrders/${orderId}/updateStatus`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newStatus }),
    })
      .then((response) => response.json())
      .then((updatedOrder: Order) => {
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
    loadOrders();
  }, []);

  return (
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
  );
}

export default AdminOrders;

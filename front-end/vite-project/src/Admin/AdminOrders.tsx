import { useState, useEffect } from 'react';
import './AdminOrders.css';

interface Order {
  _id: string;
  total: number;
  items: {
    name: string;
    selectedSize: string;
    quantity: number;
    price: number;
  }[];
  status: string | null;
  shippingMethod: string;
  shippingFee: number;
  shippingData: {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
  };
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
      <ul className="orders-container">
        {orders.map((order) => (
          <li
            key={order._id}
            className={`order ${order.status === 'Sent' ? 'sent' : 'not-sent'}`}
          >
            <div
              className={`order-id ${
                order.status === 'Sent' ? 'green-text' : 'red-text'
              }`}
            >
              Order ID: {order._id}
            </div>
            <div className="total-amount">Total Amount: {order.total} kr</div>
            <div className="shipping-info">
              Shipping Method: {order.shippingData.shippingMethod} (Fee: {order.shippingFee} kr)
            </div>
            <div className="shipping-data">
              <p>Name: {order.shippingData.name}</p>
              <p>Email: {order.shippingData.email}</p>
              <p>Phone Number: {order.shippingData.phoneNumber}</p>
              <p>Address: {order.shippingData.address}</p>
            </div>
            <ul className="item-list">
              {order.items.map((item, index) => (
                <li key={index} className="item">
                  <div className="product-name">Product: {item.name}</div>
                  <div className="item-details">
                    Size: {item.selectedSize}, Quantity: {item.quantity}, Price: {item.price} kr
                  </div>
                </li>
              ))}
            </ul>
            {order.status && (
              <div className="order-status">Order Status: {order.status}</div>
            )}
            {order.status !== 'Sent' && (
              <button
                className="mark-sent-button"
                onClick={() => updateOrderStatus(order._id)}
              >
                Mark as Sent
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminOrders;

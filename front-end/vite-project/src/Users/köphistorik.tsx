import React, { useEffect, useState } from 'react';
import './köphistorik.css';

interface OrderItem {
  _id: string;
  items: {
    name: string;
    quantity: number;
    price: string;
    selectedSize: string;
  }[];
  total: number;
  shippingData: {
    shippingMethod: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
  };
  shippingFee: number;
}

function OrderDetails({
    order,
    expanded,
    toggleExpanded,
  }: {
    order: OrderItem;
    expanded: boolean;
    toggleExpanded: () => void;
  }) {
    return (
      <div className={`order ${expanded ? 'sent' : 'not-sent'}`}>
        <button
          onClick={toggleExpanded}
          className={`order-id ${order.status === 'Sent' ? 'green-text' : 'red-text'}`}
        >
          Order ID: {order._id}
        </button>
        {expanded && (
          <div>
            <p className="total-amount">Total: {order.total} kr</p>
            <p>
              Shipping Method: {order.shippingData.shippingMethod} (Fee: {order.shippingFee} kr)
            </p>
            <p>Order Status: {order.status}</p> 
            <div className="shipping-data">
              <p>Name: {order.shippingData.name}</p>
              <p>Email: {order.shippingData.email}</p>
              <p>Phone Number: {order.shippingData.phoneNumber}</p>
              <p>Address: {order.shippingData.address}</p>
            </div>
            <ul className="item-list">
              {order.items.map((item, idx) => (
                <li key={idx} className="item">
                  <p className="product-name">Product: {item.name}</p>
                  <p>
                    Size: {item.selectedSize}, Quantity: {item.quantity}, Price: {item.price} kr
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

interface PurchaseHistoryProps {
  purchases: string[];
}

function PurchaseHistory({ purchases }: PurchaseHistoryProps): JSX.Element {
  const [orderData, setOrderData] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const userInformation = JSON.parse(localStorage.getItem("userInformation") || '{}');
  const userID = userInformation._id || null;

  useEffect(() => {
    if (!userID) {
      setError("User information is missing or incomplete.");
      setIsLoading(false);
      return;
    }

    fetch(`http://localhost:3000/order/orders/${userID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch orders for user with ID ${userID}`);
        }
        return response.json();
      })
      .then(userOrders => {
        setOrderData(userOrders);
      })
      .catch(err => {
        console.error('Error fetching user order data:', err);
        setError('Failed to fetch user orders. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userID]);

  return (
    <div className="orders-container">
      <h2>Order History</h2>
      {isLoading && <p>Loading order details...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {orderData.map(order => (
          <OrderDetails
            key={order._id}
            order={order}
            expanded={expandedOrder === order._id}
            toggleExpanded={() =>
              setExpandedOrder(prevOrder => (prevOrder === order._id ? null : order._id))
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default PurchaseHistory;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderComplete.css';

function OrderComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, orderData } = location.state;

  const goToProducts = () => {
    navigate('/products');
  };

  return (
    <div id='orderCompleteWrapper'>
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'rgba(231, 231, 231, 0.548)',
          marginTop: '20px',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h2>Order Complete</h2>
        <p>Thank you for the order!</p>

        {orderId && (
          <div>
            <p>Order ID: {orderId}</p>
          </div>
        )}

        {orderData && (
          <div>
            <h3>Order Details</h3>
            <ul>
              {orderData.items.map(
                (item: {
                  name: string;
                  selectedSize: string;
                  quantity: number;
                  price: number;
                },
                index: number
                ) => (
                  <li key={index}>
                    <p>Name: {item.name}</p>
                    <p>Size: {item.selectedSize}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price} kr</p>
                  </li>
                )
              )}
            </ul>
            <p>Total price including VAT: {orderData.total} kr</p>
            <h3>Shipping Information</h3>
            <p>Name: {orderData.shippingData.name}</p>
            <p>Email: {orderData.shippingData.email}</p>
            <p>Phone Number: {orderData.shippingData.phoneNumber}</p>
            <p>Address: {orderData.shippingData.address}</p>
            <p>Shipping Method: {orderData.shippingData.shippingMethod}</p>
            <p>Shipping Fee: {orderData.shippingFee} kr</p>

            <button className='homeBtn' onClick={goToProducts}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderComplete;

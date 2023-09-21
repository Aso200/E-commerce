import React, { useState } from 'react';
import { CartItems } from '../Cart/MiniCart';
import { useEffect } from 'react';

function payPage(props: any) {
  const { cart } = props;
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = () => {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
    }

    return total;
  };

  const orderInformationSend = () => {
    const orderDetailsCopy = [...orderDetails];
    const total = calculateTotalPrice();

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      orderDetailsCopy.push({
        name: item.name,
        selectedSize: item.selectedSize,
        id: item.id,
        quantity: item.quantity,
      });
    }

    orderDetailsCopy.push({ total: total });

    fetch("http://localhost:3000/order/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetailsCopy),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('POST request successful:', data);

      localStorage.removeItem('cart');

      props.updateCart([]);

      setOrderDetails([]);
    })
    .catch((error) => {
      console.error('Error sending order:', error);
    });
  }

  useEffect(() => {
    const total = calculateTotalPrice();
    setTotalPrice(total);
  }, [cart]);

  return (
    <div>
      <div>
      {cart.map((item: CartItems, index: number) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
      </div>
      <p>Total {totalPrice}</p>
      <button onClick={orderInformationSend}>Send order</button>
    </div>
  );
}

export default payPage;

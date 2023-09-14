import React from 'react';
import { CartItems } from '../Cart/MiniCart'; // Use the correct relative path

function CartPaymentPage({ cart }: { cart: CartItems[] }) {
  return (
    <div>
      {cart.map((cartItem, index) => (
        <div key={index}>
          <p>Name: {cartItem.name}</p>
          <p>Price: {cartItem.price} kr</p>
          <p>Size: {cartItem.size}</p>
          <p>Quantity: {cartItem.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default CartPaymentPage;

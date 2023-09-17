import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Cart.css';
import { Link } from 'react-router-dom';
import Product from '../Products/Product';

export interface CartItems extends Product {
  quantity: number;
}

interface CartProps {
  cart: CartItems[];
}

function MiniCart(props: CartProps) {
  const [isActive, setIsActive] = useState(false);
  const { cart } = props;

  const toggleClassName = () => {
    setIsActive(!isActive);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const cartItem of cart) {
      totalPrice += cartItem.price * cartItem.quantity;
    }
    return totalPrice;
  };

  const calculateCartItemPrice = (cartItem: CartItems) => {
    return cartItem.price * cartItem.quantity;
  };

  return (
    <div>
      <div id="miniCart">
        <button id="shoppingCartIcon" style={{ textAlign: 'center' }} onClick={toggleClassName}>
          <ShoppingCartIcon />
        </button>
        <div className={`CartWrap ${isActive ? 'CartWrapShow' : ''}`}>
          {cart.map((cartItem, index) => (
            <div key={index} className={`CartInformation ${isActive ? 'CartInformationShow' : ''}`}>
              <p>{cartItem.name}</p>
              <p>Size: {cartItem.selectedSize}</p>
              <p>
                Quantity {cartItem.quantity}st / {calculateCartItemPrice(cartItem)} kr
              </p>
            </div>
          ))}
          <p>Total price: {calculateTotalPrice()} kr</p>
          <Link to="/CartPaymentPage">
            <button id="checkOutButton">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MiniCart;

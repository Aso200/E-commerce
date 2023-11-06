import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Cart.css';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItems'; 

export interface CartItems extends CartItem {
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
      const price = parseInt(cartItem.price.$numberInt, 10);
      totalPrice += price * cartItem.quantity;
    }
    return totalPrice;
  };
  const calculateCartItemPrice = (cartItem: CartItems) => {
    const price = parseInt(cartItem.price.$numberInt, 10);
    return price * cartItem.quantity;
  };
const toggleOverlay = () => {
  setIsActive(!isActive);
}

  return (
    <div>
      <div className={` ${isActive ? 'overlay' : ''}`} onClick={toggleOverlay}></div>
      <div id="miniCart">
        <button id="shoppingCartIcon" style={{ textAlign: 'center' }} onClick={toggleClassName}>
        <p>{cart.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0)}</p>
          <ShoppingCartIcon />
        </button>
        <div className={`CartWrap ${isActive ? 'CartWrapShow' : ''}`}>
          {cart.map((cartItem, index) => (
            <div key={index} className={`CartInformation ${isActive ? 'CartInformationShow' : ''}`}>
              <p>{cartItem.name}</p>
              <p>Size: {cartItem.selectedSize}</p>
              <p>
  Quantity {cartItem.quantity}st / {calculateCartItemPrice(cartItem)} SEK
</p>
            </div>
          ))}
          <p>Total price: {calculateTotalPrice()} kr</p>
          <Link to="/CartPaymentPage">
            <button id="checkOutButton" onClick={toggleOverlay}>Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MiniCart;

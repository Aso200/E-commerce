import React, { useState, useEffect } from 'react';
import { CartItems } from '../Cart/MiniCart';
import './CartPaymentPage.css';
import { Link } from 'react-router-dom';

function CartPaymentPage({ cart, updateCart }: { cart: CartItems[], updateCart: (updatedCart: CartItems[]) => void }) {
  const [cartItems, setCartItems] = useState(cart);
  const userInformationExists = localStorage.getItem('userInformation');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart(cartItems);
  }, [cartItems, updateCart]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const cartItem of cartItems) {
      totalPrice += cartItem.price * cartItem.quantity;
    }
    return totalPrice;
  };

  const minusQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
    } else {
      updatedCart.splice(index, 1);
    }
    setCartItems(updatedCart);
  };

  const plusQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity++;
    setCartItems(updatedCart);
  };

  return (
    <div>
      <div id='cartPaymentWrapper' style={{ borderTop: '1px solid black' }}>
        <h1 id='h1' style={{ textAlign: 'center' }}>
          Cart
        </h1>
        <div id='cartPageWrap'>
          <div id='cartItemsWrapper'>
            {cartItems.map((cartItem, index) => (
              <div
                className='cartItem'
                key={index}
                style={{
                  width: '100%',
                  marginRight: '20px',
                }}
              >
                <div id='cartItemDetails'>
                <img src={cartItem.image} className='productImg' />
                <div id="smallStyling" style={{marginLeft: "1%", width: "40%"}}>
                  <p>Name: {cartItem.name}</p>
                  <p>Price: {cartItem.price} kr</p>
                  <p>Size: {cartItem.selectedSize}</p>
                  </div>
                  <div style={{marginLeft:"1%", width: "20%"}}>
                  <p>Quantity: {cartItem.quantity}</p>
                  <button onClick={() => minusQuantity(index)}>-</button>
                  <button onClick={() => plusQuantity(index)}>+</button>
                </div>
                </div>
              </div>
            ))}
          </div>
          <div id='orderDetailsWrapper'>
            <div>
              <h1>Order information</h1>
              <h4>Total order {calculateTotalPrice()} kr </h4>
            </div>
            {userInformationExists ? (
        <Link to="/PayPage">
          <button id="payBtn" className='btnStyling'>Proceed</button>
        </Link>
      ) : (
        <div>
          <p id='p'>Please login before continuing!</p>
        <Link to="/login">
          <button id="loginBtn" className='btnStyling'>Login</button>
        </Link>
        </div>
      )}
          </div>
    
    </div>
    </div>
    </div>
  );
}

export default CartPaymentPage;

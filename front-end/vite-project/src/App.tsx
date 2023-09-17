import React, { useState, useEffect } from 'react';
import './App.css';
import Mainpage from './Mainpage/Mainpage';
import Products from './Products/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './Products/Product';
import Header from './Header';
import CartPaymentPage from './CartPayment/CartPaymentPage';

function App() {
  const updateCart = (updatedCart: Product[]) => {
    setCart(updatedCart);
  };
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [products, setProducts] = useState<Product[]>([]);

const addToCart = (productToAdd: Product) => {
  const existingProductIndex = cart.findIndex(
    (product) => product.id === productToAdd.id
  );

  if (existingProductIndex !== -1) {
    const updatedCart = [...cart];
    updatedCart[existingProductIndex] = {
      ...updatedCart[existingProductIndex],
      quantity: updatedCart[existingProductIndex].quantity + 1,
    };
    setCart(updatedCart);
  } else {
    setCart([...cart, { ...productToAdd, quantity: 1 }]);
  }
};


useEffect(() => {
  // Load cart data from localStorage on component mount
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    setCart(JSON.parse(storedCart));
  }

  fetch('http://localhost:3000/products/products')
    .then((response) => response.json())
    .then((data) => {
      console.log(data.clothing);
      setProducts(data.clothing);
    });
}, []);

useEffect(() => {
  // Save cart data to localStorage whenever it changes
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

  return (
    <Router>
      <Routes>
        <Route
          path="/products"
          element={
            <div>
                  <Header cart={cart} />
              <Products products={products} addToCart={addToCart} />
            </div>
          }
        />
        <Route path="/" element={<Mainpage />} />
        <Route
        path='/CartPaymentPage'
        element={
          <div>
            <Header cart={cart}/>
        <CartPaymentPage cart={cart} updateCart={updateCart}/>
        </div>
        }/>
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import Mainpage from './Mainpage/Mainpage';
import Products from './Products/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import CartPaymentPage from './CartPayment/CartPaymentPage';
import PayPage from './CartPayment/PayPage';
import { Product } from './Products/Product'; 
import Login from './Users/Login';
import Dashboard from './Pages/dashboard';
import Registration from './Users/register';
import Footer from './Footer';
import AdminDashboard from './Admin/admindashboard';
import OrderComplete from './CartPayment/OrderComplete';

function App() {
  const updateCart = (updatedCart: Product[]) => {
    setCart(updatedCart);
  };

  const [cart, setCart] = useState<Product[]>(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Fel vid inläsning av varukorg från localStorage:', error);
      return [];
    }
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/products/')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log('Fetched products:', data);
          setProducts(data);
        } else {
          console.error('Dataformatet är inte som förväntat.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addToCart = (productToAdd: Product) => {
    const existingProductIndex = cart.findIndex(
      (product) =>
        product._id === productToAdd._id && product.selectedSize === productToAdd.selectedSize
    );
  
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: updatedCart[existingProductIndex].quantity + 1,
      };
      setCart(updatedCart);
    } else {
      const updatedCart = [
        ...cart,
        { ...productToAdd, quantity: 1, selectedSize: productToAdd.selectedSize },
      ];
  
      try {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
      } catch (error) {
        console.error('Fel vid spara av varukorg i localStorage:', error);
      }
    }
  };

  return (
    <Router>
    <Routes>
      <Route path="/" element={<><Header cart={cart} /><Mainpage /><Footer /></>} />
      <Route path="/products" element={<><Header cart={cart} /><Products products={products} addToCart={addToCart} /><Footer /></>} />
      <Route path="/admin-dashboard" element={<><Header cart={cart} /><AdminDashboard /><Footer /></>} />
      <Route path="/Login" element={<><Header cart={cart} /><Login /><Footer /></>} />
      <Route path="/register" element={<><Header cart={cart} /><Registration /><Footer /></>} />
      <Route path="/CartPaymentPage" element={<><Header cart={cart} /><CartPaymentPage cart={cart} updateCart={updateCart} /><Footer /></>} />
      <Route path="/PayPage" element={<><Header cart={cart} /><PayPage cart={cart} updateCart={updateCart} /><Footer /></>} />
      <Route path="/dashboard" element={<><Header cart={cart} /><Dashboard /><Footer /></>} />
      <Route path="/nyheter" element={<><Header cart={cart} /><Footer /></>} />
      <Route path="/kategorier" element={<><Header cart={cart} /><Footer /></>} />
      <Route path="/rea" element={<><Header cart={cart} /><Footer /></>} />
      <Route path="/OrderComplete" element={<div><Header cart={cart} /><OrderComplete /><Footer /></div>} />
    </Routes>
  </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import Mainpage from './Mainpage/Mainpage';
import Products from './Products/Products';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import CartPaymentPage from './CartPayment/CartPaymentPage';
import PayPage from './CartPayment/PayPage';
import { Category, Product } from './Products/Product';
import Login from './Users/Login';
import Dashboard from './Pages/dashboard';
import Registration from './Users/register';
import AdminDashboard from './Admin/admindashboard';

function App() {
  // State och funktioner för att hantera varukorg och produkter.
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

  // State för att hantera produktkategorier.
  const [categories, setCategories] = useState<Category[]>([]);

  // Effekt som hämtar produkter och deras kategorier från en API-tjänst.
  useEffect(() => {
    fetch('http://localhost:3000/products/')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const categoriesData = data[0].categories;
          console.log('Mottagna kategorier:', categoriesData);
          setCategories(categoriesData);
        } else {
          console.error('Dataformatet är inte som förväntat.');
        }
      })
      .catch((error) => {
        console.error('Fel vid hämtning av data:', error);
      });
  }, []); // [] anger att effekten körs en gång vid komponentens montering.

  const addToCart = (productToAdd: Product) => {
    const existingProductIndex = cart.findIndex(
      (product) => product.id === productToAdd.id && product.selectedSize === productToAdd.selectedSize
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: updatedCart[existingProductIndex].quantity + 1,
      };
      setCart(updatedCart);
      console.log(updatedCart);
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
        <Route path="/" element={<Mainpage />} />
        <Route path="/products" element={<div><Header cart={cart} /><Products categories={categories} addToCart={addToCart} /></div>} />
        <Route path="/admin-dashboard" element={<div><Header cart={cart} /><AdminDashboard /></div>} />
        <Route path="/Login" element={<div><Header cart={cart} /><Login /></div>} />
        <Route path="/register" element={<div><Header cart={cart} /><Registration /></div>} />
        <Route path="/CartPaymentPage" element={<div><Header cart={cart} /><CartPaymentPage cart={cart} updateCart={updateCart} /></div>} />
        <Route path="/PayPage" element={<div><Header cart={cart} /><PayPage cart={cart} updateCart={updateCart} /></div>} />
        <Route path="/dashboard" element={<div><Header cart={cart} /><Dashboard /></div>} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import Mainpage from './Mainpage/Mainpage';
import Products from './Products/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import CartPaymentPage from './CartPayment/CartPaymentPage';
import PayPage from './CartPayment/PayPage';
import { Category, Product } from './Products/Product';
import Login from './Users/Login';
import Dashboard from './Pages/dashboard';
import Registration from './Users/register';


function App() {
  const updateCart = (updatedCart: Product[]) => {
    setCart(updatedCart);
  };
  const [cart, setCart] = useState<Product[]>(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/products/')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const categoriesData = data[0].categories;
          console.log('Categories received:', categoriesData);
          setCategories(categoriesData);
        } else {
          console.error('Data format is not as expected.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  

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
      console.log(updatedCart)
    } else {
      const updatedCart = [
        ...cart,
        { ...productToAdd, quantity: 1, selectedSize: productToAdd.selectedSize },
      ];

      try {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/products"
          element={
            <div>
              <Header cart={cart} />
              <Products categories={categories} addToCart={addToCart} />
            </div>
          }
        />
        <Route
          path="/Login" // New route for Login
          element={
            <div>
              <Header cart={cart} />
              <Login /> {/* Use your Login component here */}
            </div>
          }
        />
        <Route
          path="/dashboard" // New route for Dashboard
          element={
            <div>
              <Header cart={cart} />
              <Dashboard /> {/* Use your Dashboard component here */}
            </div>
          }
        />
        <Route
          path="/register" // New route for Registration
          element={
            <div>
              <Header cart={cart} />
              <Registration /> {/* Use your Registration component here */}
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
                <Route
        path='/PayPage'
        element={
          <div>
            <Header cart={cart}/>
        <PayPage cart={cart} updateCart={updateCart}/>
        </div>
        }/>
      </Routes>
    </Router>
  );
}

export default App;

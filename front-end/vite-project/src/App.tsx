import React, { useState, useEffect } from 'react';
import './App.css';
import Mainpage from './Mainpage/Mainpage';
import Products from './Products/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './Cart/Cart';


function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);


  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  // funktionen förväntar sig något som är av typen 'product', setcart uppdaterar state-värdet, den tar tidigare carten (prevCart) och slår ihop den med en ny cart (product)
  

  useEffect(() => {
    fetch('http://localhost:3000/products/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.clothing);
        setProducts(data.clothing);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/products" element={
          <div>
            <Products products={products} addToCart={addToCart} />
            <Cart cart={cart} />
          </div>
        } />
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </Router>
  );
}

export default App;

// Två huvudsidor än så länge, products och mainpage, det finns 2 states vilket är cart för att hantera varukorgen och products för att spara produktdatan som hämtas från backend.
// med useeffect hämtar vi produktdata
// path / betyder att det är huvudsidan och den printar bara mainpage så länge.
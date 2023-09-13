import React, { useEffect, useState } from 'react';

// Define an interface for a product
interface Product {
  id: number;
  name: string;
  size: string;
  price: number;
}

function Cart() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/products/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.clothing);
        setProducts(data.clothing);
      });
  }, []);
  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div id='cartWrapper'>
      <h2>Cart</h2>

        {products.map((product) => (
          <section key={product.id}>
            <h3>{product.name}</h3>
            <p>Size: {product.size}</p>
            <p>Price: {product.price} kr</p>
          </section>
        ))}

      <p>Total Price: {calculateTotalPrice()} kr</p>
    </div>
  );
}

export default Cart;

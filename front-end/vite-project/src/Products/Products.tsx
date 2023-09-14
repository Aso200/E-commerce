import React, { useEffect, useState } from 'react';
import Product from './Product';



interface ProductsProps {
  products: Product[]; 
  addToCart: (product: Product) => void;
}

function Products({ products, addToCart }: ProductsProps) {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <section key={product.id}>
            <h3>{product.name}</h3>
            <p>Size: {product.size}</p>
            <p>Price: {product.price} kr</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </section>
        ))}
      </ul>
    </div>
  );
}

export default Products;

// Tar emot en lista på alla produkter och funktionen addToCart som en prop. Den mappar igenom varje produkt och renderar dem med addToCart funktionen på varje.
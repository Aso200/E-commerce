import React from 'react';

interface CartProps {
  cart: Product[];
}

function Cart({ cart }: CartProps) {
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div id="cartWrapper">
      <h2>Cart</h2>

      {cart.map((product) => (
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

// Tar emot en lista på produkter i cart, räknar ut hela beloppet. Mappar ut alla produkter med sina detaljer.
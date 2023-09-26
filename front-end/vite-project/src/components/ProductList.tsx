import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Hämta produkter från servern när komponenten mountar
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av produkter:", error);
      });
  }, []);

  return (
    <div>
      <h1>Produktlista</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <strong>{product.name}</strong> - {product.description}, Pris:{" "}
            {product.price} kr
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

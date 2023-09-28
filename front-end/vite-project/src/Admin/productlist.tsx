import React, { useEffect, useState } from "react";

interface Product {
  // Define the product interface here
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the product list from your backend and update the state
    fetch("http://localhost:3000/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Assuming your API returns an array of products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{/* Display product information here */}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

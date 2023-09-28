import React, { useEffect, useState } from 'react';
import './AdminProducts.css';
import AdminProductEditor from './AdminProductEditor';

interface Product {
  _id: string; // Adjust the type based on your MongoDB schema
  name: string;
  price: $numberInt;
  image: string;
  // Add other properties here
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]); // Define the type
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Define the type

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((product :Product) => ({
          ...product,
          price: parseInt(product.price.$numberInt),
        })) as Product[];
        setProducts(processedData);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (productId: string) => {
    fetch(`http://localhost:3000/products/delete/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      });
  };

  const handleCloseEditor = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <div id="productsPageWrapper">
        {products.map((product, index) => (
          <div className="productWrapper" key={index}>
            <img className="productImg" src={product.image} alt={product.name} />
            <p>Product Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
      {selectedProduct && <AdminProductEditor product={selectedProduct} onClose={handleCloseEditor} />}
    </div>
  );
}

export default AdminProducts;

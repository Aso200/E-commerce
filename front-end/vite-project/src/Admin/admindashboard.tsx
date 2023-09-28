import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  sizes: string[];
}

interface Category {
  id: number;
  name: string;
  products: Product[];
}

interface ProductState {
  products: Category[];
  loading: boolean;
  error: string | null;
}

const AdminDashboard: React.FC = () => {
  const [state, setState] = useState<ProductState>({
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetch('http://localhost:3000/products/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setState({
          products: data[0].categories,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        setState({
          products: [],
          loading: false,
          error: error.message,
        });
      });
  }, []);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {state.products.map((category) => (
          <li key={category.id}>
            <h1>CATEGORY: {category.name}</h1>

            <div style={{ marginTop: "8px", marginBottom: "20px" }}>
              {category.products.map((product) => (
                <div key={product.id}>
                  <span>{product.id}</span>
                  <img src={product.image} alt="product image" style={{ height: 200, width: 100 }} />
                  <span>{product.name}</span>
                  <span>{product.description}</span>
                  <span>{product.price}</span>
                  {product.sizes.map((size) => (
                    <div key={size}>
                      size: {size}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

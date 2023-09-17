import React, { useState } from 'react';
import { Product, Category } from './Product';
import './products.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

interface ProductsProps {
  categories: Category[];
  addToCart: (product: Product) => void;
}

function Products({ categories, addToCart }: ProductsProps) {
  const totalProductsCount = categories.reduce(
    (total, category) => total + category.products.length,
    0
  );

  const [selectedSizes, setSelectedSizes] = useState<{ [productId: number]: string }>({});

  const handleSizeChange = (productId: number, event: React.ChangeEvent<{ value: string }>) => {
    const newSize = event.target.value;
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: newSize,
    }));
  };

  return (
    <div className="products-container">
      <div className="categories">
        <div className="categories-header">
          <h2>Categories</h2>
        </div>
        <ul>
          <li>
            <h3>ALL PRODUCTS ({totalProductsCount})</h3>
          </li>
          {categories.map((category) => (
            <li key={category.name}>
              <h3>
                {category.name} ({category.products.length})
              </h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-list">
        <h2>Products</h2>
        <ul>
          {categories.map((category) =>
            category.products.map((product) => (
              <li key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <FormControl required>
                  <InputLabel htmlFor={`size-select-${product.id}`}>Select your size</InputLabel>
                  <Select
                    value={selectedSizes[product.id] || ''}
                    onChange={(e) => handleSizeChange(product.id, e)}
                    label={`Available Sizes`}
                    inputProps={{
                      id: `size-select-${product.id}`,
                    }}
                  >
                    <MenuItem value="">Select Size</MenuItem>
                    {product.sizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="success"
                  disabled={!selectedSizes[product.id]}
                  onClick={() => {
                    if (selectedSizes[product.id]) {
                      const productToAdd = { ...product };
                      productToAdd.selectedSize = selectedSizes[product.id];
                      addToCart(productToAdd);
                    }
                  }}
                >
                  Add to cart!
                </Button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Products;

import React, { useState, useMemo } from 'react';
import './Products.css';
import FormControl from '@mui/material/FormControl';
import InputLabelSelect from './InputLabelSelect'; 
import CustomButton from './CustomButton'; 
import ProductDetail from './ProductDetail'; 
import Product from './Product';

interface ProductsProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

function Products({ products, addToCart }: ProductsProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(new Array(products.length).fill(''));
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((product) => product.category));
    return Array.from(uniqueCategories);
  }, [products]);


  const getCategoryProductCount = (categoryName: string) => {
    return products.filter((product) => product.category === categoryName).length;
  };

  const handleSizeChange = (index: number, event: React.ChangeEvent<{ value: string }>) => {
    setSelectedSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] = event.target.value;
      return newSizes;
    });
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product, index: number) => {
    if (selectedSizes[index]) {
      addToCart({ ...product, selectedSize: selectedSizes[index] });
      setSelectedSizes((prevSizes) => {
        const newSizes = [...prevSizes];
        newSizes[index] = '';
        return newSizes;
      });
    }
  };

  const filterProductsByCategory = (category: string | null) => {
    setSelectedCategory(category);
  };


  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="products-container">
      <div className="categories">
        <div className="categories-header">
          <h2>Categories</h2>
        </div>
        <ul>
          <li>
            <a href="#" onClick={() => filterProductsByCategory(null)}>
              <h3>All ({products.length})</h3>
            </a>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <a href="#" onClick={() => filterProductsByCategory(category)}>
                <h3>
                  {category} ({getCategoryProductCount(category)})
                </h3>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-list">
       
        <ul>
          {filteredProducts.map((product, index) => (
            <li key={product._id.$numberInt}>
                <img src={product.image} alt={product.name} onClick={() => openProductDetail(product)} />
                <h3>{product.name}</h3>
                <p>Price: {product.price.$numberInt} SEK</p>
                <FormControl required>
                  <InputLabelSelect
                    id={`size-select-${product._id}`}
                    label="Select your size"
                    value={selectedSizes[index] || ''}
                    onChange={(e) => handleSizeChange(index, e)}
                    options={product.sizes}
                    
                  />
                </FormControl>
                <CustomButton
                  variant="contained"
                  color="success"
                  disabled={!selectedSizes[index]}
                  onClick={() => handleAddToCart(product, index)}
                >
                  Add to cart!
                </CustomButton>
            </li>
          ))}
        </ul>
      </div>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={closeProductDetail}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}

export default Products;

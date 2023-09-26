import React, { useState } from 'react';
import './Products.css';
import FormControl from '@mui/material/FormControl';
import InputLabelSelect from './InputLabelSelect'; 
import CustomButton from './CustomButton'; 
import ProductDetail from './ProductDetail'; 
import Product from './Product';

interface ProductsProps {
  categories: Category[];
  addToCart: (product: Product) => void;
}

function Products({ categories, addToCart }: ProductsProps) {
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: number]: string }>({}); // Skapar en state-variabel för att lagra valda storlekar.
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Skapar en state-variabel för att lagra den valda kategorin.
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Skapar en state-variabel för att lagra den valda produkten.

  const handleSizeChange = (productId: number, event: React.ChangeEvent<{ value: string }>) => {
    setSelectedSizes((prevSizes) => ({ ...prevSizes, [productId]: event.target.value })); // Hanterar ändringar av storlek och uppdaterar state för valda storlekar.
  };

  const totalProductsCount = categories.reduce((count, category) => count + category.products.length, 0); // Räknar ut det totala antalet produkter.
  const filteredProducts = selectedCategory
    ? categories.find((category) => category.name === selectedCategory)?.products || [] // Filtrerar produkter baserat på vald kategori.
    : categories.flatMap((category) => category.products); // Om ingen kategori är vald, visas alla produkter.

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product); // Öppnar detaljvyn för en produkt.
  };

  const closeProductDetail = () => {
    setSelectedProduct(null); // Stänger detaljvyn för produkten.
  };

  const handleAddToCart = (product: Product) => {
    if (selectedSizes[product.id]) {
      addToCart({ ...product, selectedSize: selectedSizes[product.id] }); // Lägger till en produkt i varukorgen med den valda storleken.
      setSelectedSizes((prevSizes) => ({ ...prevSizes, [product.id]: '' })); // Återställer den valda storleken efter att produkten har lagts till i varukorgen.
    }
  };

  return (
    <div className="products-container">
      <div className="categories">
        <div className="categories-header">
          <h2>Categories</h2>
        </div>
        <ul>
          <li>
            <a href="#" onClick={() => setSelectedCategory(null)}>
              <h3>ALL PRODUCTS ({totalProductsCount})</h3>
            </a>
          </li>
          {categories.map((category) => (
            <li key={category.name}>
              <a
                href="#"
                onClick={() => setSelectedCategory(category.name)}
                className={selectedCategory === category.name ? 'selected' : ''}
              >
                <h3>
                  {category.name} ({category.products.length})
                </h3>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-list">
        <h2>Products</h2>
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.name} onClick={() => openProductDetail(product)} />
              <h3>{product.name}</h3>
              <p>Price: {product.price} SEK</p>
              <FormControl required>
                <InputLabelSelect
                  id={`size-select-${product.id}`}
                  label="Select your size"
                  value={selectedSizes[product.id] || ''}
                  onChange={(e) => handleSizeChange(product.id, e)}
                  options={product.sizes}
                />
              </FormControl>
              <CustomButton
                variant="contained"
                color="success"
                disabled={!selectedSizes[product.id]}
                onClick={() => handleAddToCart(product)}
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

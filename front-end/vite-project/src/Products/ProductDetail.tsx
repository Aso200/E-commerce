import React, { useState } from 'react';
import './ProductDetail.css';
import CustomButton from './CustomButton';
import InputLabelSelect from './InputLabelSelect';
import FormControl from '@mui/material/FormControl';
import Product from './Product';

interface ProductDetailProps {
  product: Product; // En egenskap som förväntas vara av typen Product.
  onClose: () => void; // En funktion som anropas när detaljvyn stängs.
  onAddToCart: (product: Product) => void; // En funktion som anropas när produkten läggs till i varukorgen.
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>(''); // Skapar en state-variabel för den valda storleken.

  const handleSizeChange = (event: React.ChangeEvent<{ value: string }>) => {
    setSelectedSize(event.target.value); // Hanterar ändringar av storlek och uppdaterar state för vald storlek.
  };

  const addToCartDisabled = selectedSize === ''; // Kontrollerar om "ADD TO CART"-knappen ska vara inaktiverad baserat på vald storlek.

  const handleAddToCart = () => {
    if (!addToCartDisabled) {
      // Om "ADD TO CART"-knappen inte är inaktiverad:
      onAddToCart({ ...product, selectedSize }); // Lägger till produkten i varukorgen med den valda storleken.
      onClose(); // Stänger detaljvyn.
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Price: {product.price} SEK</p>
        <p>Description: {product.description}</p>

        <FormControl required>
          <InputLabelSelect
            id="size-select"
            label="Select your size"
            value={selectedSize}
            onChange={handleSizeChange}
            options={product.sizes}
          />
        </FormControl>

        <CustomButton
          variant="contained"
          color="success"
          disabled={addToCartDisabled}
          onClick={handleAddToCart}
        >
          ADD TO CART!
        </CustomButton>

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

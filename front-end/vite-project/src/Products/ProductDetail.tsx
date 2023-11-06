import React, { useState } from 'react';
import './ProductDetail.css';
import CustomButton from './CustomButton';
import InputLabelSelect from './InputLabelSelect';
import FormControl from '@mui/material/FormControl';
import { Product } from '../Products/Product';

interface ProductDetailProps {
  product: Product; 
  onClose: () => void; 
  onAddToCart: (product: Product) => void; 
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>(''); 

  const handleSizeChange = (event: React.ChangeEvent<{ value: string }>) => {
    setSelectedSize(event.target.value); 
  };

  const addToCartDisabled = selectedSize === ''; 

  const handleAddToCart = () => {
    if (!addToCartDisabled) {
      onAddToCart({ ...product, selectedSize }); 
      onClose(); 
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Price: {product.price.$numberInt} SEK</p>
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

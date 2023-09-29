import React, { useState, ChangeEvent, FormEvent } from 'react';
import './AdminAddProduct.css'; // Import your CSS file

function AdminAddProduct() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const [image, setImageSrc] = useState<string>('');

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price: { $numberInt: price },
      category,
      sizes,
      image,
    };

    try {
      const response = await fetch(`http://localhost:3000/products/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product inserted successfully');
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImageSrc('');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error inserting product:', error);
    }
  };

  return (
    <div className="admin-add-product">
      <h2>Add a New Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageSrc">Image Source:</label>
          <input
            type="text"
            id="imageSrc"
            value={image}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setImageSrc(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminAddProduct;

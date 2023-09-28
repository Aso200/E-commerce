import React, { useState, ChangeEvent, FormEvent } from 'react';

function AdminAddProduct() {
  // Define state variables to store the product details
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const sizes = ['XS', 'S', 'M', 'L', 'XL']; // Permanent array with sizes
  const [image, setImageSrc] = useState<string>('');

  // Function to handle form submission and send data to the backend
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a product object with the form data
    const productData = {
      name,
      description,
      price: { $numberInt: price }, // Send price as a BSON NumberInt
      category,
      sizes, // All products have the same standard sizes
      image,
    };
console.log(image)
    // Send a POST request to your backend route for inserting a product
    try {
      const response = await fetch(`http://localhost:3000/products/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        // Product was successfully inserted
        alert('Product inserted successfully');
        // Clear the form fields
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImageSrc('');
      } else {
        // Handle error cases here
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error inserting product:', error);
    }
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
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

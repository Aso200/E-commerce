import React, { useState, useEffect } from 'react';
import "./AdminProductEditor.css"

function AdminProductEditor({ product, onClose }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  useEffect(() => {
    setEditedProduct({ ...product });
  }, [product]);

  const handleInputChange = (e :any) => {
    const { name, value } = e.target;
    const parsedValue = name === 'price' ? parseFloat(value) : value;

    setEditedProduct({
      ...editedProduct,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e :any) => {
    e.preventDefault();

    const formattedProduct = {
      ...editedProduct,
      price: {
        $numberInt: editedProduct.price.toString(),
      },
    };
    fetch(`http://localhost:3000/products/edit/${editedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Product updated successfully');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        alert('Error updating product');
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <div id='overlay' onClick={handleClose}></div>
      <div id='AdminProductEditorWrapper'>
        <h2 style={{width: "100%", textAlign:"center"}}>Admin Product Editor</h2>
        <form id='formStyling' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <br/>
            <textarea
              id="description"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductEditor;

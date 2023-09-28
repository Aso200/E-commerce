// DeleteProduct.js

import React from "react";

interface DeleteProductProps {
  productId: number; // Pass the product ID as a prop
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3000/productCrud/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle success, e.g., show a success message or navigate to a different page
      })
      .catch((error) => {
        // Handle error, e.g., display an error message to the user
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteProduct;

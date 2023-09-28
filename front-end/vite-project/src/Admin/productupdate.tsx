import { useState } from "react";

const UpdateProduct = () => {
  const [updatedProduct, setUpdatedProduct] = useState({
    id: 0, // Set the ID of the product to update
    name: "",
    description: "",
    price: 0,
    image: "",
    sizes: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = () => {
    fetch(`http://localhost:3000/productCrud/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle success, e.g., show a success message or navigate to a different page
      })
      .catch((error) => {
        // Handle error, e.g., display an error message to the user
      });
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for updating product details */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;

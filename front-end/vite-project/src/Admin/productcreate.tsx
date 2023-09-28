import { useState } from "react";

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    sizes: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:3000/productCrud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
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
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for product details */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;

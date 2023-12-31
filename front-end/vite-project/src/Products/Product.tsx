export interface Product {
  _id: string;
  category: string;
  name: string;
  description: string;
  price: {
    $numberInt: string;
  };
  sizes: string[];
  id: {
    $numberInt: string;
  };
  image: string;
  selectedSize?: string; // Add selectedSize as an optional property
}

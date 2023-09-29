interface Product {
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
}

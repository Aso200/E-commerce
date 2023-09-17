export interface Product {
  id: number;
  name: string;
  sizes: string[];
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
}

export interface Category {
  name: string;
  products: Product[];
}

export default Product;

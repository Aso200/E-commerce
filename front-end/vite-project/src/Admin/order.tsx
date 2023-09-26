// types.d.ts (or any TypeScript file)
export interface Order {
    _id: string;
    items: {
      productId: string;
      quantity: number;
    }[];
    userID: string;
    total: number;
    // Add other properties of your order here
  }
  
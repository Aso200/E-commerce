export interface Order {
    _id: string;
    items: {
      productId: string;
      quantity: number;
    }[];
    userID: string;
    total: number;
  }
  
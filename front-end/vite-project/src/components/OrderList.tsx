import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  customerName: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  shipped: boolean;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Hämta ordrar från servern när komponenten mountar
    axios
      .get("/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av ordrar:", error);
      });
  }, []);

  const markAsShipped = (orderId: string) => {
    // Markera en order som skickad
    axios
      .put(`/api/orders/${orderId}`, { shipped: true })
      .then((response) => {
        // Uppdatera state för att visa att order är skickad
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, shipped: true } : order
          )
        );
      })
      .catch((error) => {
        console.error("Fel vid uppdatering av orderstatus:", error);
      });
  };

  return (
    <div>
      <h1>Orderlista</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <strong>Kund:</strong> {order.customerName},{" "}
            <strong>Skickad:</strong> {order.shipped ? "Ja" : "Nej"}
            <button onClick={() => markAsShipped(order._id)}>
              Markera som skickad
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;

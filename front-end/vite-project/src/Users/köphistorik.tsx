import React, { useEffect, useState } from 'react';
import './köphistorik.css';

interface PurchaseHistoryProps {
    purchases: string[];
}

function PurchaseHistory({ purchases }: PurchaseHistoryProps) {
    const [orderData, setOrderData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const userInformation = JSON.parse(localStorage.getItem("userInformation") || '{}');
    const userID = userInformation._id || null;
    

    useEffect(() => {
        if (!userID) {
            setError("User information is missing or incomplete.");
            setIsLoading(false);
            return;
        }
        fetch(`http://localhost:3000/order/orders/${userID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch orders for user with ID ${userID}`);
                }
                return response.json();
            })
            .then(userOrders => {
                setOrderData(userOrders);
            })
            .catch(err => {
                console.error('Error fetching user order data:', err);
                setError('Failed to fetch user orders. Please try again later.');
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [userID]);

    return (
        <div>
            <h2>Orderhistorik</h2>
            {isLoading && <p>Loading order details...</p>}
            {error && <p className="error">{error}</p>}
            <ul>
                {orderData.map((order) => (
                    <li key={order._id}>
                        <button onClick={() => setExpandedOrder(prevOrder => prevOrder === order._id ? null : order._id)}>
                            Order ID: {order._id}
                        </button>
                        <p className="order-total">Totalt: {order.total}</p>

                        {expandedOrder === order._id && (
                            <ul>
                                {order.items.map((item: any, idx: number) => (
                                    <li key={idx}>
                                        <p>Produkt: {item.name}</p>
                                        <p>Antal: {item.quantity}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PurchaseHistory;

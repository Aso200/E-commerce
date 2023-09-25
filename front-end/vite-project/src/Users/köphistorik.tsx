import { useEffect, useState } from 'react';

interface PurchaseHistoryProps {
    purchases: string[];
}

function PurchaseHistory({ purchases }: PurchaseHistoryProps) {
    const [orderData, setOrderData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        Promise.all(purchases.map(purchaseId =>
            fetch(`http://localhost:3000/orders/${purchaseId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch order with ID ${purchaseId}`);
                    }
                    return response.json();
                })
        ))
            .then(orderDetailsArray => {
                setOrderData(orderDetailsArray);
            })
            .catch(err => {
                console.error('Error fetching order data:', err);
                setError('Failed to fetch order details. Please try again later.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [purchases]);

    return (
        <div>
            <h2>Mina köp</h2>
            <ul>
                {purchases.map((purchase) => (
                    <li key={purchase}>{purchase}</li>
                ))}
            </ul>

            <h2>Orderhistorik</h2>
            {isLoading && <p>Loading order details...</p>}
            {error && <p className="error">{error}</p>}
            <ul>
                {orderData.map((order) => (
                    <li key={order._id}>
                        <p>ID: {order._id}</p>
                        <p>Produkt: {order.product}</p>
                        <p>Antal: {order.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PurchaseHistory;

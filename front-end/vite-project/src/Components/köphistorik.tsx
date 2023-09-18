

interface PurchaseHistoryProps {
    purchases: string []
}

function PurchaseHistory({ purchases}: PurchaseHistoryProps){
    return(
        <div>
            <h2>Mina köp</h2>
            <ul>
                {purchases.map((purchase, index) => (
                    <li key={index}>{purchase}</li>
                ))}
            </ul>
        </div>
    )
}

export default PurchaseHistory
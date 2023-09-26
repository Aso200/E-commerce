import { useState } from 'react';
import LogOutButton from '../Users/logoutbtn';
import { useNavigate } from 'react-router-dom';
import PurchaseHistory from '../Users/köphistorik';
import Settings from '../Users/inställningar';
import "./dashboard.css"
function Dashboard() {

    const navigate = useNavigate()
    const [showPurchaseHistory, setShowPurchaseHistory] = useState<boolean>(false)
    const [showSettings, setShowSettings] = useState<boolean>(false)

    const togglePurchaseHistory = () => {
        setShowPurchaseHistory(!showPurchaseHistory)
    }

    const toggleSettings = () => {
        setShowSettings(!showSettings)
    }

    const handleLogout = () => {
        navigate('/')
    };

    const customerInfo = {
        name: 'John Doe',
        email: 'john@example.com'
    }

    return (
        <div>
            <h1>Välkommen</h1>
            <button onClick={togglePurchaseHistory}>Mina köp</button>
            <button onClick={toggleSettings}>Inställningar</button>
            <LogOutButton onLogout={handleLogout} />
            {showPurchaseHistory && <PurchaseHistory purchases={[]} />}
            {showSettings && <Settings customerInfo={customerInfo} />}
        </div>
    );
}

export default Dashboard;


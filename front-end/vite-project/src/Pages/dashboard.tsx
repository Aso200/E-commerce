import { useState } from 'react';
import LogOutButton from '../Users/logoutbtn';
import { useNavigate } from 'react-router-dom';
import PurchaseHistory from '../Users/köphistorik';
import Settings from '../Users/inställningar';

function Dashboard() {
    const navigate = useNavigate();
    const [showPurchaseHistory, setShowPurchaseHistory] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);

    const togglePurchaseHistory = () => {
        setShowPurchaseHistory(prevState => !prevState);
    };

    const toggleSettings = () => {
        setShowSettings(prevState => !prevState);
    };

    const handleLogout = () => {
        // Clear user data if stored in local storage or cookies
        // localStorage.removeItem('user');
        navigate('/');
    };

    const customerInfo = {
        name: 'John Doe',
        email: 'john@example.com'
    };

    return (
        <div>
            <h1>Välkommen</h1>
            <button onClick={togglePurchaseHistory}>
                {showPurchaseHistory ? 'Dölj köp' : 'Mina köp'}
            </button>
            <button onClick={toggleSettings}>
                {showSettings ? 'Dölj inställningar' : 'Inställningar'}
            </button>
            <LogOutButton onLogout={handleLogout} />
            {showPurchaseHistory && <PurchaseHistory purchases={[]} />}
            {showSettings && <Settings customerInfo={customerInfo} />}
        </div>
    );
}

export default Dashboard;

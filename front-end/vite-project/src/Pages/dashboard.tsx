import { useState } from 'react';
import LogOutButton from '../Users/logoutbtn';
import { useNavigate } from 'react-router-dom';
import PurchaseHistory from '../Users/köphistorik';
import Settings from '../Users/inställningar';
import './dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<'mina-kop' | 'inställningar' | 'none'>('none');

    const handleLogout = () => {
        navigate('/');
    };

    const togglePurchaseHistory = () => {
        setActiveSection((prev) => (prev === 'mina-kop' ? 'none' : 'mina-kop'));
    };

    const toggleSettings = () => {
        setActiveSection((prev) => (prev === 'inställningar' ? 'none' : 'inställningar'));
    };

    const customerInfo = {
        name: 'John Doe',
        email: 'john@example.com',
    };

    return (
        <div>
            <h1>Välkommen</h1>
            <button className='ButtonStyling' onClick={togglePurchaseHistory}>
                Mina köp
            </button>
            <button className='ButtonStyling' onClick={toggleSettings}>
                Inställningar
            </button>
            <LogOutButton onLogout={handleLogout} />
            {activeSection === 'mina-kop' && <PurchaseHistory purchases={[]} />}
            {activeSection === 'inställningar' && <Settings customerInfo={customerInfo} />}
        </div>
    );
}

export default Dashboard;

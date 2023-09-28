import React, { useEffect, useState } from 'react';
import './inställningar.css';

interface CustomerInfo {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
}

interface SettingProps {
    customerInfo: CustomerInfo;
}

function Settings({ customerInfo }: SettingProps) {
    const userData = JSON.parse(localStorage.getItem('userInformation') || '{}');
    const [formData, setFormData] = useState<CustomerInfo>({
        email: userData.email,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
    });
    const [notificationVisible, setNotificationVisible] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setNotificationVisible(true);

                // Set a timer to hide the notification after 3 seconds
                setTimeout(() => {
                    setNotificationVisible(false);
                }, 3000);

            } else {
                console.error('Failed to save user data:', data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error while sending data to the server:', error);
        }
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label className='labelName'>Name:</label>
                    <input
                        className='inputName'
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div>
                    <label className='labelName'>Email:</label>
                    <input
                        className='inputName'
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>
                <div>
                    <label className='labelName'>Adress:</label>
                    <input
                        className='inputName'
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                </div>
                <div>
                    <label className='labelName'>Phone Number:</label>
                    <input
                        className='inputName'
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
            {notificationVisible && (
                <div className="settings-notification">Your changes have been saved!</div>
            )}
        </div>
    );
}

export default Settings;

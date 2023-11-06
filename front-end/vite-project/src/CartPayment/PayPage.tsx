import React, { useState, useEffect } from 'react';
import PaymentForm from './PaymentForm';
import SwishPayPage from './SwishPayPage';
import { useNavigate } from 'react-router-dom';
import './PayPage.css';

interface userInfo {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

function PayPage(props: any) {
  const navigate = useNavigate()
  const [validSwish, setValidSwish] = useState<boolean>(false);
  const [validCard, setValidCard] = useState<boolean>(false);
  const { cart } = props;
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const userInformation = JSON.parse(localStorage.getItem('userInformation') || '{}');
  const userID = userInformation._id;
  const [emailInput, setEmailInput] = useState<string>(userInformation.email);
  const [addressInput, setAddressInput] = useState<string>(userInformation.address);
  const [selectedPayment, setPayment] = useState<string>('');
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('instabox');
  
  const shippingMethodNames: { [key: string]: string } = {
    instabox: 'Instabox',
    budbee: 'Budbee',
    postnord: 'PostNord',
  };

  const handleShippingMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedShippingMethod(event.target.value);
  };

  const userData: userInfo = {
    email: emailInput,
    name: userInformation.name,
    phoneNumber: userInformation.phoneNumber,
    address: addressInput,
  };

  
  const calculateShippingFee = (method: string) => {
    if (method === 'instabox') {
      return 150;
    } else if (method === 'budbee') {
      return 200;
    } else if (method === 'postnord') {
      return 1000;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    let total = 0;
  
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const itemTotal = item.price.$numberInt * item.quantity;
      total += itemTotal;
    }
  
    let shippingFee = 0;
    if (selectedShippingMethod === 'instabox') {
      shippingFee = calculateShippingFee('instabox');
    } else if (selectedShippingMethod === 'budbee') {
      shippingFee = calculateShippingFee('budbee');
    } else if (selectedShippingMethod === 'postnord') {
      shippingFee = calculateShippingFee('postnord'); 
    }
    total += shippingFee;
  
    console.log('Total:', total); 
    console.log('Shipping Fee:', shippingFee);
  
    return total;
  };

  const orderInformationSend = () => {
    if (validSwish || validCard) {
      const cartData = localStorage.getItem("cart");
      if (!cartData || cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
  
      const userInformation = JSON.parse(localStorage.getItem("userInformation") || '{}');
      const userID = userInformation._id;
      const total = calculateTotalPrice();
      const shippingFee = calculateShippingFee(selectedShippingMethod); 
  
      const orderData = {
        items: cart.map((item: any) => ({
          name: item.name,
          selectedSize: item.selectedSize,
          id: item.id,
          quantity: item.quantity,
          price: item.price.$numberInt, 
        })),
        shippingData: {
          name: userInformation.name,
          email: emailInput,
          phoneNumber: userInformation.phoneNumber,
          address: addressInput,
          shippingMethod: shippingMethodNames[selectedShippingMethod], 
        },
        userID: userID,
        total: total, 
        shippingFee: shippingFee, 
      };
  
      fetch("http://localhost:3000/order/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send order');
          }
          setValidSwish(false);
          setValidCard(false);
          return response.json();
        })
        .then((data) => {
          console.log('Order ID:', data.orderId);
          navigate('/OrderComplete', { state: { orderId: data.orderId, orderData: orderData } });
  
          localStorage.removeItem('cart');
          props.updateCart([]);
          setOrderDetails([]);
        })
        .catch((error) => {
          console.error('Error sending order:', error.message);
 
        });
    } else {
 
    }
  };
  
  useEffect(() => {
    const total = calculateTotalPrice();
    setTotalPrice(total);
  }, [cart, selectedShippingMethod]);

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEmailInput(newValue);
    const isValidEmail = newValue.includes("@");
    setValidSwish(isValidEmail);
  };

  const addressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(event.target.value);
  };

  const selectedCardPay = () => {
    if (selectedPayment === 'masterCard') {
      setShowPaymentForm(false);
      setPayment('');
    } else {
      setPayment('masterCard');
      setShowPaymentForm(true);
    }
  };

  const selectedSwishPay = () => {
    if (selectedPayment === 'swish') {
      setShowPaymentForm(false);
      setPayment('');
    } else {
      setPayment('swish');
      setShowPaymentForm(true);
    }
  };

  return (
    <div id="contentWrapper">
      <div id="paypageWrapper">
        <div id="userInformationWrapper" className="stylingWrapper">
          <h2>Shipping Details</h2>
          <p>Name: {userData["name"]}</p>
          <p>Email: <input type="text" value={emailInput} onChange={emailChange} /></p>
          <p>Address: <input type="text" value={addressInput} onChange={addressChange} /></p>
          <p>Number: {userData["phoneNumber"]}</p>
          <div>
            <div>
              <p>Please select your preferred shipping method:</p>
              <input
                type="radio"
                id="instabox"
                name="shipping_method"
                value="instabox"
                checked={selectedShippingMethod === 'instabox'}
                onChange={handleShippingMethodChange}
              />
              <label htmlFor="instabox">Instabox / 1-3 days shipping / 150kr</label><br />

              <input
                type="radio"
                id="budbee"
                name="shipping_method"
                value="budbee"
                checked={selectedShippingMethod === 'budbee'}
                onChange={handleShippingMethodChange}
              />
              <label htmlFor="budbee">Budbee / 1-5 days shipping / 200kr</label><br />

              <input
                type="radio"
                id="postnord"
                name="shipping_method"
                value="postnord"
                checked={selectedShippingMethod === 'postnord'}
                onChange={handleShippingMethodChange}
              />
              <label htmlFor="postnord">PostNord / 5-30 days shipping / 1000kr</label>
            </div>
          </div>
        </div>
        <div id="paymentInfo" className="stylingForDiv">
          <button id="masterCardBtn" className="paymentBtn" onClick={selectedCardPay}>
            <img src="https://cvasino.se/image/cache/data/payments/svg/mastercard-1200x630sh.svg" alt="MasterCard" />
          </button>
          <button id="swishBtn" className="paymentBtn" onClick={selectedSwishPay}>
            <img src="https://www.vectorlogo.zone/logos/getswishse/getswishse-ar21.png" alt="Swish" />
          </button>
          {!selectedPayment && (
  <p style={{ width: "100%", textAlign: "center" }}>Please select a payment method</p>
)}
          {selectedPayment === 'masterCard' && showPaymentForm && (
            <PaymentForm onValidChange={(isValid) => setValidCard(isValid)} />
          )}
          {selectedPayment === 'swish' && showPaymentForm && (
            <SwishPayPage
              number={userData.phoneNumber}
              onValidSwishChange={(isValid) => setValidSwish(isValid)}
            />
          )}
          <div id='payDiv' style={{ display: "flex", width: "100%", flexFlow: "row wrap", justifyContent: "center" }}>
            <p style={{ width: "100%", textAlign: "center" }}>Total price including VAT: {totalPrice} kr</p> <button id='sendOrderBtn' onClick={orderInformationSend}>Send order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayPage;

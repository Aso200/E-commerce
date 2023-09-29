import React, { useState, ChangeEvent, useEffect } from 'react';
import './PaymentForm.css';

interface PaymentFormProps {
  onValidChange: (isValid: boolean) => void;
}

function PaymentForm({ onValidChange }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [isCardNumberValid, setIsCardNumberValid] = useState<boolean>(false);

  const [cvv, setCvv] = useState<string>('');
  const [isCvvValid, setIsCvvValid] = useState<boolean>(false);

  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = Array.from({ length: 27 }, (_, i) => String(2023 + i));

  useEffect(() => {
    onValidChange(isCardNumberValid && isCvvValid && selectedMonth !== '' && selectedYear !== '');
  }, [isCardNumberValid, isCvvValid, selectedMonth, selectedYear, onValidChange]);

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputCardNumber = event.target.value;
    const onlyNumbers = inputCardNumber.replace(/\D/g, '');
    setCardNumber(onlyNumbers);
    setIsCardNumberValid(onlyNumbers.length === 12);
  };

  const handleCvvChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputCvv = event.target.value;
    const onlyNumbers = inputCvv.replace(/\D/g, '');
    setCvv(onlyNumbers);
    setIsCvvValid(onlyNumbers.length === 3);
  };

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div id='paymentpageWrapper'>
      <input type="text" placeholder="Card Name" />
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={handleCardNumberChange}
        maxLength={12}
        className={isCardNumberValid ? '' : 'invalid'}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={handleCvvChange}
        maxLength={3}
        className={isCvvValid ? '' : 'invalid'}
      />
      <div style={{ width: '50%' }}>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PaymentForm;

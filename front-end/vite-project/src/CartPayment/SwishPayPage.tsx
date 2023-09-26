import React, { useState, useEffect } from 'react';

interface SwishPayPageProps {
  number: string;
  onValidSwishChange: (isValid: boolean) => void;
}

function SwishPayPage({ number, onValidSwishChange }: SwishPayPageProps) {
  const [editedNumber, setEditedNumber] = useState<string>(number);
  const [validSwish, setValidSwish] = useState<boolean>(false); 

  const validateSwish = (inputNumber: string) => {
    return inputNumber.length === 10;
  };

  useEffect(() => {
    const isValid = validateSwish(editedNumber);
    setValidSwish(isValid);
    onValidSwishChange(isValid);
  }, [editedNumber, onValidSwishChange]);

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 10);
    setEditedNumber(newValue);
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <input
        id='numberInput'
        type='text'
        value={editedNumber}
        onChange={handleNumberChange}
        maxLength={10}
      />
    </div>
  );
}

export default SwishPayPage;

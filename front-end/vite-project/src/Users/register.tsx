import { useState, ChangeEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Registration() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Validate the email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailPattern.test(enteredEmail);

    if (!isValidEmail) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const enteredPhoneNumber = e.target.value;
    setPhoneNumber(enteredPhoneNumber);

    // Validate phone number (you can adjust this validation as needed)
    const phonePattern = /^[0-9]{10}$/;
    const isValidPhone = phonePattern.test(enteredPhoneNumber);

    if (!isValidPhone) {
      setPhoneError('Please enter a valid phone number (10 digits).');
    } else {
      setPhoneError('');
    }
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailError && !phoneError) {
      try {
        const response = await fetch('http://localhost:3000/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phoneNumber,
            address,
          }),
        });

        if (response.ok) {
          
          console.log('Registration successful');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error while registering', error);
      }

      // Reset the form fields
      setName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setAddress('');
    } else {
      console.error('Invalid email or phone number');
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Box
        component="div"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <div>
          <TextField
            required
            id="outlined-required-name"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            required
            id="outlined-required-email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
          />
          <TextField
            required
            id="outlined-required-phone"
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            error={Boolean(phoneError)}
            helperText={phoneError}
          />
          <TextField
            required
            id="outlined-required-address"
            label="Address"
            value={address}
            onChange={handleAddressChange}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
}

export default Registration;
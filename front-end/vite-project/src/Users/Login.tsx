import { useState, ChangeEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

interface LoginProps { }

function Login(props: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('savedEmail', email);
  }, [email]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Login successful:', responseData);
  
        // Save the response data to localStorage with the key "userInformation"
        localStorage.setItem('userInformation', JSON.stringify(responseData));
        console.log(responseData);
  
        if (responseData.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Handle login failure, e.g., show an error message to the user
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the error here, e.g., show an error message to the user
      alert('An error occurred during login. Please try again later.');
    }
  };
      
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="E-postadress"
          size="small"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          id="outlined-password-input"
          label="Lösenord"
          type="password"
          size="small"
          value={password}
          onChange={handlePasswordChange}
        />
      </Box>

      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;

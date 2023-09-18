import React, { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import BasicButtons from './Buttons';

interface LoginProps {}

function Login(props: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'user@gmail.com' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Login failed. Please try again.');
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

      <BasicButtons onClick={handleLogin} />
    </>
  );
}

export default Login;

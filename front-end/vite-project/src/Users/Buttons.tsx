import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

 
interface BasicButtonsProps {
  onClick: () => void;
}

function BasicButtons({onClick }: BasicButtonsProps) {
  const navigate = useNavigate()

  const handleMember = () => {
    navigate('/register')
  }

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={onClick}>Logga in</Button>
      <Button variant="outlined" onClick={handleMember}>Bli Medlem</Button>
    </Stack>
  );
}

export default BasicButtons;
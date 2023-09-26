import { Button } from "@mui/material";

interface LogoutButtonProps {
  onLogout: () => void;
}

function LogOutButton({ onLogout }: LogoutButtonProps) {
  const handleLogout = () => {
    localStorage.removeItem("userInformation");
    onLogout();
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logga ut
    </Button>
  );
}

export default LogOutButton;
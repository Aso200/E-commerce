import { Button } from "@mui/material";


interface LogoutButtonProps {
    onLogout: () => void
}

function LogOutButton({ onLogout }: LogoutButtonProps) {
    return (
    <Button variant="contained" onClick={onLogout}>
        Logga ut 

    </Button>
    )
}


export default LogOutButton;
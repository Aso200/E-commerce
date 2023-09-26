import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/admin/login", {
        username,
        password,
      });

      const token = response.data.token; // Assuming your backend sends a token upon successful login

      // Store the token in a secure way (e.g., in localStorage or sessionStorage)
      localStorage.setItem("token", token);

      // Redirect to the desired page (e.g., admin panel)
      navigate("/admin");
    } catch (error) {
      // Handle login failure (display error message, clear form fields, etc.)
      console.error("Login failed", error);
      setError("Fel användarnamn eller lösenord. Försök igen.");
    }
  };

  return (
    <div>
      <h1>Inloggning</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <div>
          <label>Användarnamn:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Lösenord:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Logga in
        </button>
      </form>
    </div>
  );
};

export default Login;

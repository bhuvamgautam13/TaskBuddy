import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await API.post("/users/login", { email, password });

    console.log("LOGIN RESPONSE:", res.data); // 👈 ADD THIS

    localStorage.setItem("token", res.data.token);
    window.location.href = "/home";

  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data); // 👈 ADD THIS
    alert("Login failed");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
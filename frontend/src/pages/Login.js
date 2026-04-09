import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // 👈 NEW
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/users/login", {
        email,
        password,
        role, // 👈 send role
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role); // 👈 store role

      alert("Login successful ✅");
      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Welcome Back 👋</h2>
        <p className="login-subtitle">Login to TaskDash</p>

        {/* 🔥 ROLE TOGGLE */}
        <div className="role-toggle">
          <button
            className={role === "client" ? "active" : ""}
            onClick={() => setRole("client")}
          >
            Client
          </button>
          <button
            className={role === "worker" ? "active" : ""}
            onClick={() => setRole("worker")}
          >
            Worker
          </button>
        </div>

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

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="login-footer">
          Don’t have an account?{" "}
          <Link to="/signup">Signup</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
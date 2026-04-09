import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // 👈 NEW

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await API.post("/users/signup", {
        name,
        email,
        password,
        role, // 👈 send role
      });

      alert("User created successfully ✅");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Create Account 🚀</h2>

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
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleSignup}>Signup</button>

        <p className="login-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
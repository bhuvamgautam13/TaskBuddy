import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>TaskBuddy 🚀</h2>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
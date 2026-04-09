function Navbar() {
  return (
    <div className="navbar">
      <h2>TaskBuddy 🚀</h2>

      <div className="nav-links">
        <a href="/home">Home</a>

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
import { useEffect, useState } from "react";
import API from "../services/api";
import AddItem from "../components/AddItem";

function Home() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemAdded = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      {/* 🔥 LOGOUT BUTTON HERE */}
      <button
  onClick={handleLogout}
  style={{
    padding: "8px 16px",
    background: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px"
  }}
>
  Logout
</button>

      <h2>Items List</h2>

      <AddItem onItemAdded={handleItemAdded} />

      {items.map((item) => (
        <div key={item._id}>
          {item.name} - ₹{item.price}
        </div>
      ))}
    </div>
  );
}

export default Home;
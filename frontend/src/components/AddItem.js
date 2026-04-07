import { useState } from "react";
import API from "../services/api";

function AddItem({ onItemAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    // ❌ Validation
    if (!name || !price) {
      setMessage("⚠️ All fields are required");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await API.post("/items", {
        name,
        price,
      });

      // ✅ Success
      setMessage("✅ Item added successfully");

      onItemAdded(res.data);

      // reset form
      setName("");
      setPrice("");

      // ⏳ Auto-hide message
      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {
      console.log(err);
      setMessage("❌ Error adding item");

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <form onSubmit={handleAdd}>
        <input
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>

      {/* ✅ Message UI */}
      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.includes("❌") ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default AddItem;
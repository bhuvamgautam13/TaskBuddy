import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="board">
        
        {/* TODO COLUMN */}
        <div className="column">
          <h3>To Do</h3>
          {items.map((item) => (
            <div className="card" key={item._id}>
              {item.title}
            </div>
          ))}
        </div>

        {/* IN PROGRESS */}
        <div className="column">
          <h3>In Progress</h3>
        </div>

        {/* DONE */}
        <div className="column">
          <h3>Done</h3>
        </div>

      </div>
    </div>
  );
}

export default Home;
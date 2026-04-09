import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [location, setLocation] = useState(null);

  // 🔹 Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 ACCEPT TASK
  const acceptTask = async (id) => {
    try {
      await API.put(`/tasks/${id}/accept`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 COMPLETE TASK
  const completeTask = async (id) => {
    try {
      await API.put(`/tasks/${id}/complete`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 RECEIVE LOCATION (CLIENT)
  useEffect(() => {
    socket.on("receive-location", (data) => {
      setLocation(data);
    });

    return () => {
      socket.off("receive-location");
    };
  }, []);

  // 🔹 SEND LOCATION (WORKER)
  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      const data = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      socket.emit("send-location", data);
    });
  }, []);

  // 🔹 FILTER TASKS BY STATUS
  const todoTasks = tasks.filter((t) => t.status === "open");
  const progressTasks = tasks.filter((t) => t.status === "accepted");
  const doneTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="dashboard-title">Dashboard</h1>

      {/* 🔥 LIVE LOCATION */}
      <p>
        Worker Location: {location?.lat}, {location?.lng}
      </p>

      <div className="board">

        {/* TODO */}
        <div className="column">
          <h3>To Do</h3>
          {todoTasks.map((task) => (
            <div className="card" key={task._id}>
              <p>{task.title}</p>
              <button onClick={() => acceptTask(task._id)}>
                Accept
              </button>
            </div>
          ))}
        </div>

        {/* IN PROGRESS */}
        <div className="column">
          <h3>In Progress</h3>
          {progressTasks.map((task) => (
            <div className="card" key={task._id}>
              <p>{task.title}</p>
              <button onClick={() => completeTask(task._id)}>
                Complete
              </button>
            </div>
          ))}
        </div>

        {/* DONE */}
        <div className="column">
          <h3>Done</h3>
          {doneTasks.map((task) => (
            <div className="card" key={task._id}>
              <p>{task.title}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;
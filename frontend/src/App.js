import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import MainLayout from "./layouts/Mainlayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Pages */}
        <Route path="/login" element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } />

        <Route path="/signup" element={
          <AuthLayout>
            <Signup />
          </AuthLayout>
        } />

        {/* Main App */}
        <Route path="/home" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />

      </Routes>
    </Router>
  );
}

export default App;
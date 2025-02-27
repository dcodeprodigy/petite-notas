import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import NotFound from "./pages/NotFound.js";

function App() {
  const isAuth = localStorage.getItem('token') ? true : false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> }></Route>
        <Route path="/login" element={isAuth ? <Navigate to="/dashboard" /> : <Login /> }></Route>
        <Route path="/register" element={isAuth ? <Navigate to="/dashboard" /> : <Register /> }></Route>
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" /> }></Route>
        <Route path="/NotFound" element={<NotFound />}></Route>
        <Route path="*" element={ <Navigate to="/NotFound"/> }></Route>
      </Routes>
    </Router>
  );
}

export default App;
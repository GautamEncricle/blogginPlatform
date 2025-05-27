// App.jsx
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./routes/AuthLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Signup from './pages/SignUp';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

// ✅ Wrap Login to inject setUser from context
function LoginWithAuth(props) {
  const { setUser } = useAuth();
  console.log(setUser);
  return <Login setUser={setUser} {...props} />;
}

export default App;
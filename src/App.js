import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import LoginPage from './Components/Login/Login';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulated login logic (replace with your actual authentication logic)
    // For this example, let's say the user is considered logged in if isLoggedIn state is set to true
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <LoginPage onLogin={handleLogin} />}
        />
        {/* Add a route for the login page */}
        {/* The LoginPage component receives a prop onLogin, which is a function to handle successful login */}
      </Routes>
    </Router>
  );
}

export default App;

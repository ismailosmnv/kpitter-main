import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import UserPage from './pages/UserPage';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    const username = localStorage.getItem('kpitter_username');
    const password = localStorage.getItem('kpitter_password');
    setIsLoggedIn(!!(username && password));
  }

  function handleLogin() {
    checkAuth();
    navigate('/'); // Переходимо на головну
  }

  function handleLogout() {
    localStorage.removeItem('kpitter_username');
    localStorage.removeItem('kpitter_password');
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <div style={{ margin: '20px' }}>
      <header>
        <nav style={{ marginBottom: '10px' }}>
          <Link to="/">Home</Link> |{" "}
          <Link to="/register">Register</Link> |{" "}
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/user/:username" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
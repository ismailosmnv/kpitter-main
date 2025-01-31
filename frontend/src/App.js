import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import UserPage from './pages/UserPage';
import './styles/App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Проверяем авторизацию, исключая страницы /login и /register
  useEffect(() => {
    const publicRoutes = ['/login', '/register'];
    const username = localStorage.getItem('kpitter_username');
    const password = localStorage.getItem('kpitter_password');

    if (!username || !password) {
      if (!publicRoutes.includes(location.pathname)) {
        // Перенаправляем только с защищенных страниц
        navigate('/login');
      }
    } else {
      setIsLoggedIn(true);
    }
  }, [location.pathname, navigate]);

  // Обрабатываем выход
  function handleLogout() {
    localStorage.removeItem('kpitter_username');
    localStorage.removeItem('kpitter_password');
    setIsLoggedIn(false);
    navigate('/login');
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
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/user/:username" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App; 
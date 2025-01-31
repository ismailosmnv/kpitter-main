
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import UserPage from './components/UserPage';
import './styles/App.css'; // Убедитесь, что стили подключены корректно

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Проверяем авторизацию пользователя
  useEffect(() => {
    const publicRoutes = ['/login/', '/register/'];
    const username = localStorage.getItem('kpitter_username');
    const password = localStorage.getItem('kpitter_password');

    if (!username || !password) {
      if (!publicRoutes.includes(location.pathname)) {
        navigate('/login/');
      }
    } else {
      setIsLoggedIn(true);
    }
  }, [location.pathname, navigate]);

  // Обработка выхода из аккаунта
  function handleLogout() {
    logoutUser();
    setIsLoggedIn(false);
    navigate('/login/');
  }

  return (
    <div className="app-container">
      <header>
        <nav className="nav-bar">
          <Link to="/">Головна</Link> |{" "}
          {isLoggedIn ? (
            <>
              <Link to={`/user/${localStorage.getItem('kpitter_username')}`}>Мій профіль</Link> |{" "}
              <button onClick={handleLogout} className="logout-button">Вийти</button>
            </>
          ) : (
            <>
              <Link to="/login/">Вхід</Link> |{" "}
              <Link to="/register/">Реєстрація</Link>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login/" element={<LoginForm />} />
        <Route path="/register/" element={<RegisterForm />} />
        <Route path="/post/:id/" element={<PostDetail />} /> {/* Изменён маршрут */}
        <Route path="/user/:username/" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
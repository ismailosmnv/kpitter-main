import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setError(null); // Сброс ошибки
      await loginUser(username, password); // Отправка запроса на сервер
      localStorage.setItem('kpitter_username', username);
      navigate('/'); // Перенаправление на главную страницу
    } catch (error) {
      console.error('[ERROR] Ошибка входа:', error.message);
      setError('Неверное имя пользователя или пароль');
    }
  }

  return (
    <div className="centered">
      <div className="container">
        <h2>Вход</h2>
        {error && <p className="error-message">{error}</p>}
        <form>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>Войти</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
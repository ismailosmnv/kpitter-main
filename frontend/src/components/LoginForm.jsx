import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Авторизация через API
      const token = await loginUser(username, password);
      localStorage.setItem('kpitter_token', token); // Сохраняем токен
      localStorage.setItem('kpitter_username', username); // Сохраняем имя пользователя
      navigate('/'); // Перенаправляем на главную страницу
    } catch (err) {
      console.error('[ERROR] Ошибка входа:', err.message);
      setError('Неверное имя пользователя или пароль'); // Отображаем сообщение об ошибке
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="centered">
      <h2>Вход</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Выполняется вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
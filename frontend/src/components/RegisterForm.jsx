import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (!username || !password) {
      setError('Введите имя пользователя и пароль');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      await registerUser(username, password);

      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000); // Перенаправление через 2 секунды
    } catch (error) {
      console.error('[ERROR] Ошибка регистрации:', error);
      setError('Имя пользователя уже занято или ошибка сервера.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="centered">
      <div className="container">
        <h2>Регистрация</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Аккаунт успешно создан! Перенаправление...</p>}
        
        <form onSubmit={handleRegister}>
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
            {isLoading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
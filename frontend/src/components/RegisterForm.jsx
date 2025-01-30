import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      setError(null);
      setSuccess(false);
      await registerUser(username, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000); // Перенаправление через 2 секунды
    } catch (error) {
      console.error('[ERROR] Ошибка регистрации:', error.message);
      setError('Не удалось зарегистрироваться. Попробуйте снова.');
    }
  }

  return (
    <div className="centered">
      <div className="container">
        <h2>Регистрация</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Аккаунт успешно создан! Перенаправление...</p>}
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
          <button type="button" onClick={handleRegister}>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
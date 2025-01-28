import React, { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Зберігаємо облікові дані у localStorage
    localStorage.setItem('kpitter_username', username);
    localStorage.setItem('kpitter_password', password);
    onLogin(); // викликаємо колбек із App.js
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login (Basic Auth)</h3>
      <div>
        <label>Username:</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
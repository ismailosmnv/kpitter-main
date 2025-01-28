import React, { useState } from 'react';
import { registerUser } from '../api';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(username, password);
      setMessage('User registered successfully! You can now login.');
    } catch (err) {
      setMessage('Registration error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
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
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}
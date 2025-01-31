import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Импортируем BrowserRouter
import App from './App';
import './styles/App.css'; // Убедитесь, что путь к стилям корректен

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
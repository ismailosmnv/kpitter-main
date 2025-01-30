const BASE_URL = 'http://localhost:8000/api';

function getAuthHeader() {
  const username = localStorage.getItem('kpitter_username') || '';
  const password = localStorage.getItem('kpitter_password') || '';
  if (!username || !password) {
      console.error('Нет данных для авторизации');
      return {};
  }
  const token = btoa(`${username}:${password}`); // Преобразование в base64
  return { 'Authorization': `Basic ${token}` };
}

// Регистрация пользователя
export async function registerUser(username, password) {
  const body = JSON.stringify({ username, password });

  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });

  if (resp.status === 201) {
    console.log('[DEBUG] Успешная регистрация');
    return true;
  } else if (resp.status === 409) {
    console.log('[DEBUG] Имя пользователя уже занято');
    throw new Error('Имя пользователя уже занято');
  } else {
    console.error('[ERROR] Ошибка регистрации:', resp.status, await resp.text());
    throw new Error('Ошибка регистрации');
  }
}

// Авторизация (просто проверяет правильность логина/пароля)
export async function loginUser(username, password) {
  const body = JSON.stringify({ username, password }); // Формируем тело запроса

  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body, // Передаем данные в теле запроса
  });

  if (resp.status === 204) {
    console.log('[DEBUG] Успешный вход');
    return true;
  } else if (resp.status === 401) {
    console.log('[DEBUG] Неверное имя пользователя или пароль');
    throw new Error('Неверное имя пользователя или пароль');
  } else {
    console.error('[ERROR] Ошибка входа:', resp.status, await resp.text());
    throw new Error('Ошибка входа');
  }
}

// Получение постов всех пользователей (необходим аутентифицированный пользователь)
export async function getPosts() {
  const resp = await fetch(`${BASE_URL}/users/user_1/posts`, { // заглушка, нужен динамический username
    headers: { ...getAuthHeader() }
  });
  if (!resp.ok) throw new Error('Ошибка загрузки постов');
  return resp.json();
}

// Получение постов конкретного пользователя
export async function getUserPosts(username) {
  const resp = await fetch(`${BASE_URL}/users/${username}/posts`, {
    headers: { ...getAuthHeader() }
  });
  if (!resp.ok) throw new Error('Ошибка загрузки постов пользователя');
  return resp.json();
}

// Создание поста
export async function createPost(username, text) {
  const body = { content: text };
  const resp = await fetch(`${BASE_URL}/users/${username}/posts`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
      },
      body: JSON.stringify(body),
  });
  if (!resp.ok) throw new Error('Ошибка создания поста');
  return resp.json();
}

// Получение конкретного поста
export async function getPostDetail(username, postId) {
  const resp = await fetch(`${BASE_URL}/users/${username}/posts/${postId}`, {
    headers: { ...getAuthHeader() }
  });
  if (!resp.ok) throw new Error('Ошибка загрузки поста');
  return resp.json();
}

// Лайк поста
export async function likePost(username, postId) {
  const resp = await fetch(`${BASE_URL}/users/${username}/posts/${postId}/like`, {
    method: 'PUT',
    headers: { ...getAuthHeader() }
  });
  if (!resp.ok) throw new Error('Ошибка при лайке');
}

// Удаление лайка
export async function unlikePost(username, postId) {
  const resp = await fetch(`${BASE_URL}/users/${username}/posts/${postId}/like`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  });
  if (!resp.ok) throw new Error('Ошибка при удалении лайка');
}
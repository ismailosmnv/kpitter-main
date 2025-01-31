const BASE_URL = 'http://localhost:8000/api';

/** Получение заголовка авторизации */
function getAuthHeader() {
  const username = localStorage.getItem('kpitter_username');
  const password = localStorage.getItem('kpitter_password');

  if (!username || !password) {
    console.error('[ERROR] Нет данных для авторизации');
    return {};
  }

  const token = btoa(`${username}:${password}`);
  return { 'Authorization': `Basic ${token}` };
}

/** Универсальная функция API-запроса */
async function apiRequest(endpoint, method = "GET", body = null, requireAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
    ...(requireAuth ? getAuthHeader() : {}),
  };

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[ERROR] API ошибка: ${response.status}`, errorText);
    throw new Error(`Ошибка API: ${response.status}`);
  }

  return response.status === 204 ? null : await response.json();
}

/** Регистрация пользователя */
export async function registerUser(username, password) {
  return apiRequest('/register', 'POST', { username, password }, false);
}

/** Авторизация пользователя */
export async function loginUser(username, password) {
  const body = { username, password };
  const response = await apiRequest('/login', 'POST', body, false);

  // Сохраняем авторизационные данные
  localStorage.setItem('kpitter_username', username);
  localStorage.setItem('kpitter_password', password);

  return response;
}

/** Выход пользователя */
export function logoutUser() {
  localStorage.removeItem('kpitter_username');
  localStorage.removeItem('kpitter_password');
}

/** Получение всех постов */
export async function getPosts() {
  const username = localStorage.getItem('kpitter_username');
  if (!username) throw new Error("Пользователь не авторизован");
  return apiRequest(`/users/${username}/posts`);
}

/** Получение постов конкретного пользователя */
export async function getUserPosts(username) {
  return apiRequest(`/users/${username}/posts`);
}

/** Создание поста */
export async function createPost(content) {
  const username = localStorage.getItem('kpitter_username');
  if (!username) throw new Error("Пользователь не авторизован");
  return apiRequest(`/users/${username}/posts`, 'POST', { content });
}

/** Получение конкретного поста */
export async function getPostDetail(postId) {
  const username = localStorage.getItem('kpitter_username');
  if (!username) throw new Error("Пользователь не авторизован");
  return apiRequest(`/users/${username}/posts/${postId}`);
}

/** Лайк поста */
export async function likePost(postId) {
  const username = localStorage.getItem('kpitter_username');
  if (!username) throw new Error("Пользователь не авторизован");
  return apiRequest(`/users/${username}/posts/${postId}/like`, 'PUT');
}

/** Удаление лайка */
export async function unlikePost(postId) {
  const username = localStorage.getItem('kpitter_username');
  if (!username) throw new Error("Пользователь не авторизован");
  return apiRequest(`/users/${username}/posts/${postId}/like`, 'DELETE');
}
/** Отримання заголовків авторизації */
function getAuthHeader() {
  const username = localStorage.getItem('kpitter_username');
  const password = localStorage.getItem('kpitter_password');

  if (!username || !password) {
    console.error('[ERROR] Немає даних для авторизації');
    return {};
  }

  const token = btoa(`${username}:${password}`);
  return { 'Authorization': `Basic ${token}` };
}

/** Загальна функція для API-запитів */
async function apiRequest(endpoint, method = "GET", body = null, requireAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
    ...(requireAuth ? getAuthHeader() : {}),
  };

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[ERROR] API помилка: ${response.status}`, errorText);
    throw new Error(`Помилка API: ${response.status}`);
  }

  return response.status === 204 ? null : await response.json();
}

/** Отримання профілю користувача */
export async function getUserProfile(username) {
  return apiRequest(`/users/${username}`);
}

/** Отримання постів конкретного користувача */
export async function getUserPosts(username) {
  return apiRequest(`/users/${username}/posts`);
}

/** Отримання окремого поста */
export async function getPostDetail(username, postId) {
  return apiRequest(`/users/${username}/posts/${postId}`);
}
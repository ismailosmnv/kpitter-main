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

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ERROR] API ошибка: ${response.status}`, errorText);
      throw new Error(`Ошибка API: ${response.status}`);
    }

    return response.status === 204 ? null : await response.json();
  } catch (error) {
    console.error(`[ERROR] Ошибка запроса к API: ${error.message}`);
    throw error;
  }
}

/** Регистрация пользователя */
export async function registerUser(username, password) {
  return apiRequest('/register/', 'POST', { username, password }, false);
}

/** Авторизация пользователя */
export async function loginUser(username, password) {
  const body = { username, password };
  const response = await apiRequest('/login/', 'POST', body, false);

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
  return apiRequest('/posts/');
}

/** Получение профиля пользователя */
export async function getUserProfile(username) {
  return apiRequest(`/users/${username}/`);
}

/** Получение постов конкретного пользователя */
export async function getUserPosts(username) {
  return apiRequest(`/users/${username}/posts/`);
}

/** Создание поста */
export async function createPost(content) {
  return apiRequest('/posts/', 'POST', { content });
}

/** Получение конкретного поста */
export async function getPostDetail(postId) {
  return apiRequest(`/posts/${postId}/`);
}

/** Лайк поста */
export async function likePost(postId) {
  return apiRequest(`/posts/${postId}/like/`, 'PUT');
}

/** Удаление лайка */
export async function unlikePost(postId) {
  return apiRequest(`/posts/${postId}/like/`, 'DELETE');
}
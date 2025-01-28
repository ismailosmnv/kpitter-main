// Змініть, якщо бекенд працює не на 8000 порту або іншим URL
const BASE_URL = 'http://localhost:8000';

function getAuthHeader() {
  const username = localStorage.getItem('kpitter_username');
  const password = localStorage.getItem('kpitter_password');
  if (!username || !password) return {};
  const token = btoa(`${username}:${password}`);
  return { 'Authorization': 'Basic ' + token };
}

export async function registerUser(username, password) {
  const body = { username, password };
  const resp = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!resp.ok) {
    throw new Error('Register failed: ' + resp.status);
  }
  return resp.json();
}

// GET /posts
export async function getPosts() {
  const resp = await fetch(`${BASE_URL}/posts`, {
    headers: { ...getAuthHeader() }
  });
  if (!resp.ok) {
    throw new Error('Cannot fetch posts: ' + resp.status);
  }
  return resp.json();
}

// POST /posts
export async function createPost(text) {
  const body = { text };
  const resp = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(body)
  });
  if (!resp.ok) {
    throw new Error('Cannot create post: ' + resp.status);
  }
  return resp.json();
}

// POST /posts/{postId}/like
export async function likePost(postId) {
  const resp = await fetch(`${BASE_URL}/posts/${postId}/like`, {
    method: 'POST',
    headers: { ...getAuthHeader() }
  });
  if (!resp.ok) {
    throw new Error('Cannot like post: ' + resp.status);
  }
  return resp.json();
}

// GET /posts/{postId}
export async function getPostDetail(postId) {
  const resp = await fetch(`${BASE_URL}/posts/${postId}`, {
    headers: { ...getAuthHeader() }
  });
  if (!resp.ok) {
    throw new Error('Cannot get post detail: ' + resp.status);
  }
  return resp.json();
}

// GET /users/{username}/posts
export async function getUserPosts(username) {
  const resp = await fetch(`${BASE_URL}/users/${username}/posts`, {
    headers: { ...getAuthHeader() }
  });
  if (!resp.ok) {
    throw new Error('Cannot get user posts: ' + resp.status);
  }
  return resp.json();
}
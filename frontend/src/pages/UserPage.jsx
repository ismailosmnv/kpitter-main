// src/components/UserPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserProfile, getUserPosts } from '../api';
import './UserPage.css'; // Убедитесь, что этот файл содержит нужные стили

export default function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserProfile(username);
        setUser(userData);
        const userPosts = await getUserPosts(username);
        setPosts(userPosts);
      } catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
        setError('Не удалось загрузить данные пользователя.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [username]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!user) return <p>Пользователь не найден.</p>;

  return (
    <div className="user-page container">
      <h2>
        Профиль пользователя:{" "}
        <Link to={`/user/${user.username}/`} className="user-link">
          {user.username}
        </Link>
      </h2>
      <p>Полное имя: {user.full_name}</p>

      <h3>Публикации:</h3>
      {posts.length === 0 ? (
        <p>Публикаций нет.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <Link to={`/post/${post.id}/`} className="post-link">
              <p>{post.content}</p>
            </Link>
            <small>Лайков: {post.likes}</small>
          </div>
        ))
      )}
    </div>
  );
}
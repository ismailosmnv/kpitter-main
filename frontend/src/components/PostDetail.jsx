// src/components/PostDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostDetail, likePost, unlikePost } from '../api';
import './PostDetail.css'; // Убедитесь, что этот файл содержит нужные стили

function PostDetail() {
  const { id } = useParams(); // Получаем только id поста
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostDetail(id);
        setPost(data);
      } catch (err) {
        console.error('[ERROR] Ошибка загрузки поста:', err.message);
        setError('Не удалось загрузить пост');
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  async function handleLike() {
    if (!post) return;
    try {
      if (post.is_liked) {
        await unlikePost(id);
      } else {
        await likePost(id);
      }
      const updatedPost = await getPostDetail(id);
      setPost(updatedPost);
    } catch (err) {
      console.error('[ERROR] Ошибка при лайке:', err.message);
    }
  }

  if (isLoading) return <p>Загрузка поста...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <div className="post-detail container">
      <h2>
        Пост от{" "}
        <Link to={`/user/${post.author.username}/`} className="user-link">
          {post.author.username}
        </Link>
      </h2>
      <p>{post.content}</p>
      <button 
        onClick={handleLike} 
        className={`like-btn ${post.is_liked ? 'liked' : ''}`}
      >
        {post.is_liked ? '❤️ Убрать лайк' : '🤍 Лайк'} ({post.likes})
      </button>
    </div>
  );
}

export default PostDetail;
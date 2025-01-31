// src/components/PostList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, likePost, unlikePost, createPost } from '../api';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error('[ERROR] Ошибка загрузки постов:', err);
      setError('Не удалось загрузить посты.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (post) => {
    try {
      if (post.is_liked) {
        await unlikePost(post.id);
      } else {
        await likePost(post.id);
      }
      fetchPosts();
    } catch (err) {
      console.error('[ERROR] Ошибка при лайке:', err);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    try {
      await createPost(newPostContent);
      setNewPostContent('');
      fetchPosts();
    } catch (err) {
      console.error('[ERROR] Ошибка при создании поста:', err);
      setError('Не удалось создать пост.');
    }
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="post-list container">
      <h1>Лента постов</h1>
      
      <div className="create-post">
        <input
          type="text"
          placeholder="Напишите новый пост..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
        />
        <button onClick={handleCreatePost}>Создать пост</button>
      </div>

      {posts.length === 0 ? (
        <p className="no-posts">Постов пока нет.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <span className="post-author">
                <Link to={`/user/${post.author.username}/`} className="author-link">
                  @{post.author.username}
                </Link>
              </span>
            </div>

            <div className="post-content">
              <Link to={`/post/${post.id}/`} className="post-link">
                {post.content}
              </Link>
            </div>

            <div className="post-actions">
              <span className="likes-count">
                {post.likes} {post.likes === 1 ? 'лайк' : 'лайков'}
              </span>
              <button 
                className={`like-btn ${post.is_liked ? 'liked' : ''}`}
                onClick={() => handleLike(post)}
              >
                {post.is_liked ? '❤️ Убрать лайк' : '🤍 Поставить лайк'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
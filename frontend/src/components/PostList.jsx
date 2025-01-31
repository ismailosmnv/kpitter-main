import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, likePost, unlikePost, createPost } from '../api';
import { getUserProfile, getUserPosts } from "../api";

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
      fetchPosts(); // Обновляем посты после лайка
    } catch (err) {
      console.error('[ERROR] Ошибка при лайке:', err);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    try {
      await createPost(newPostContent);
      setNewPostContent('');
      fetchPosts(); // Обновляем посты после добавления
    } catch (err) {
      console.error('[ERROR] Ошибка при создании поста:', err);
    }
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-list">
      <h1>Лента постов</h1>
      
      <div className="create-post">
        <input
          type="text"
          placeholder="Напишите новый пост..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handleCreatePost}>Создать пост</button>
      </div>

      {posts.length === 0 ? (
        <p>Постов пока нет.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <p>
              <strong>Автор: </strong>
              <Link to={`/user/${post.author.username}`} className="post-author">
                {post.author.username}
              </Link>
            </p>
            <h2>
              <Link to={`/post/${post.id}`} className="post-link">
                {post.content}
              </Link>
            </h2>
            <p>Лайки: {post.likes}</p>
            <button onClick={() => handleLike(post)}>
              {post.is_liked ? '❤️ Убрать лайк' : '🤍 Лайк'}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
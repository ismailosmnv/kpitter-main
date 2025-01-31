import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserPosts, likePost } from '../api';

export default function UserPage() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [username]);

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserPosts(username);
      setPosts(data);
    } catch (err) {
      console.error('[ERROR] Ошибка загрузки постов:', err);
      setError('Ошибка загрузки постов');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLike(postId) {
    try {
      await likePost(username, postId);
      fetchPosts();
    } catch (err) {
      console.error('[ERROR] Ошибка при лайке:', err);
    }
  }

  if (isLoading) return <p>Загрузка постов...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (posts.length === 0) return <p>У пользователя нет постов.</p>;

  return (
    <div>
      <h2>Посты пользователя {username}</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', margin: '5px', padding: '5px' }}>
          <p>
            <Link to={`/post/${post.id}`}>
              {post.content}
            </Link>
          </p>
          <p>Лайков: {post.likes}</p>
          <button onClick={() => handleLike(post.id)}>Лайк</button>
        </div>
      ))}
    </div>
  );
}
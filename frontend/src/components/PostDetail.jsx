import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail, likePost, unlikePost } from '../api';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostDetail(postId);
        setPost(data);
      } catch (err) {
        console.error('[ERROR] Ошибка загрузки поста:', err.message);
        setError('Не удалось загрузить пост');
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  async function handleLike() {
    if (!post) return;
    try {
      if (post.is_liked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
      const updatedPost = await getPostDetail(postId);
      setPost(updatedPost);
    } catch (err) {
      console.error('[ERROR] Ошибка при лайке:', err.message);
    }
  }

  if (isLoading) return <p>Загрузка поста...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <div>
      <h2>Пост от {post.author.username}</h2>
      <p>{post.content}</p>
      <button onClick={handleLike}>
        {post.is_liked ? '❤️ Убрать лайк' : '🤍 Лайк'} ({post.likes})
      </button>
    </div>
  );
}

export default PostDetail;
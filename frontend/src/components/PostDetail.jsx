import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
        console.error('Ошибка загрузки поста:', err);
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
      console.error('Ошибка при лайке:', err);
    }
  }

  if (isLoading) return <p>Загрузка поста...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <div>
      <h2>Пост от{" "}
        <Link to={`/user/${post.author.username}`}>
          {post.author.username}
        </Link>
      </h2>
      <p>{post.content}</p>
      <button onClick={handleLike}>
        {post.is_liked ? '❤️ Убрать лайк' : '🤍 Лайк'} ({post.likes})
      </button>
    </div>
  );
}

export default PostDetail;
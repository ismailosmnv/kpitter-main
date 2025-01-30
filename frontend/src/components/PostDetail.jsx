import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail, likePost, unlikePost } from '../api';

function PostDetail() {
  const { username, postId } = useParams();
  const [post, setPost] = useState(null);
  const currentUser = localStorage.getItem('kpitter_username');

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostDetail(username, postId);
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPost();
  }, [username, postId]);

  async function handleLike() {
    if (!post) return;
    try {
      if (post.is_liked) {
        await unlikePost(username, postId);
      } else {
        await likePost(username, postId);
      }
      const updatedPost = await getPostDetail(username, postId);
      setPost(updatedPost);
    } catch (error) {
      console.error(error);
    }
  }

  if (!post) return <p>Загрузка...</p>;

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
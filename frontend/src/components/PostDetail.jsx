import React, { useState, useEffect } from 'react';
import { getPostDetail, likePost } from '../api';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line
  }, [postId]);

  async function fetchDetail() {
    try {
      const data = await getPostDetail(postId);
      setPost(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLike() {
    try {
      await likePost(postId);
      fetchDetail();
    } catch (err) {
      console.error(err);
    }
  }

  if (!post) return <div>Loading post detail...</div>;

  return (
    <div>
      <h3>Post #{post.id}</h3>
      <p><b>{post.author.username}</b>: {post.text}</p>
      <p>Likes: {post.likesCount}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}
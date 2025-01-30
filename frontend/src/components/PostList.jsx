import React, { useState, useEffect } from 'react';
import { getPosts, createPost } from '../api';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const username = localStorage.getItem('kpitter_username');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, []);

  async function handleCreatePost() {
    if (!newPost.trim()) return;
    try {
      await createPost(username, newPost);
      setNewPost('');
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Лента постов</h2>
      {username && (
        <div>
          <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} />
          <button onClick={handleCreatePost}>Создать пост</button>
        </div>
      )}
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <small>Автор: {post.author.username}</small>
        </div>
      ))}
    </div>
  );
}

export default PostList;
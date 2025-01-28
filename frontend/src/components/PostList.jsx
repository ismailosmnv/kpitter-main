import React, { useEffect, useState } from 'react';
import { getPosts, createPost, likePost } from '../api';
import { Link } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreate() {
    if (!text.trim()) return;
    try {
      await createPost(text);
      setText('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLike(id) {
    try {
      await likePost(id);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Global Feed</h2>
      <div>
        <input
          placeholder="What's new?"
          value={text}
          onChange={e=>setText(e.target.value)}
        />
        <button onClick={handleCreate}>Post</button>
      </div>
      <div style={{ marginTop: '15px' }}>
        {posts.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', margin: '5px', padding: '5px' }}>
            <p>
              <b>
                <Link to={`/user/${p.author.username}`}>
                  {p.author.username}
                </Link>
              </b>:
              <Link to={`/post/${p.id}`} style={{ marginLeft: '5px' }}>
                {p.text}
              </Link>
            </p>
            <p>Likes: {p.likesCount}</p>
            <button onClick={() => handleLike(p.id)}>Like</button>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserPosts, likePost } from '../api';

export default function UserPage() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [username]);

  async function fetchPosts() {
    try {
      const data = await getUserPosts(username);
      setPosts(data);
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
      <h2>Posts by {username}</h2>
      {posts.map(p => (
        <div key={p.id} style={{ border:'1px solid #ccc', margin:'5px', padding:'5px' }}>
          <p>
            <Link to={`/post/${p.id}`}>
              {p.text}
            </Link>
          </p>
          <p>Likes: {p.likesCount}</p>
          <button onClick={() => handleLike(p.id)}>Like</button>
        </div>
      ))}
    </div>
  );
}
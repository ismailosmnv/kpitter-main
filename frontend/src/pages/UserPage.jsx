import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserProfile, getUserPosts } from "../api";

function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserProfile(username);
        setUser(userData);
        const userPosts = await getUserPosts(username);
        setPosts(userPosts);
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя:", error);
      }
    }
    fetchUserData();
  }, [username]);

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="user-page">
      <h2>Профиль пользователя: {user.username}</h2>
      <p>Полное имя: {user.full_name}</p>

      <h3>Публикации:</h3>
      {posts.length === 0 ? (
        <p>Публикаций нет.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <h2>
              <Link to={`/post/${post.id}`} className="post-link">
                {post.content}
              </Link>
            </h2>
            <small>Лайков: {post.likes}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPage;
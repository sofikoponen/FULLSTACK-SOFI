import { useState } from "react";

const Blog = ({ user, blog, setBlogs, addLike, getAll, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false);
  const username = blog.user?.username;

  const pStyle = {
    margin: "4px",
    gap: "4px",
  };

  const handleLike = async (blog) => {
    await addLike(blog);
    getAll().then((blogs) => setBlogs(blogs));
  };

  const handleRemove = async (blog) => {
    window.confirm(`Remove blog: ${blog.title} by ${blog.author}`);
    await removeBlog(blog);
    getAll().then((blogs) => setBlogs(blogs));
  };

  return (
    <div style={{ border: "solid", borderColor: "black", padding: "8px" }}>
      {blog.title}, {blog.author}
      {showInfo ? (
        <button onClick={() => setShowInfo(false)}>hide</button>
      ) : (
        <button onClick={() => setShowInfo(true)}>view</button>
      )}
      {showInfo && (
        <div>
          <p style={pStyle}>URL: {blog.url}</p>
          <p style={pStyle}>
            {"Likes:"} {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </p>

          <p style={pStyle}>user: {username ? username : ""}</p>
          <p>
            {user?.username === blog.user?.username && (
              <button onClick={() => handleRemove(blog)}>remove</button>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;

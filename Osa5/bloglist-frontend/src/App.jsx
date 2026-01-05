import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const sorted = blogs.sort((a, b) => b.likes - a.likes);

  const NotificationElement = ({ text, color }) => {
    return (
      <div style={{ padding: "20px" }}>
        <label
          style={{
            color: color,
            backgroundColor: "lightgray",
            fontSize: "24px",
            borderRadius: "8px",
            padding: "20px",
            borderColor: color,
          }}
        >
          {text}
        </label>
      </div>
    );
  };

  const showNotification = (text, color) => {
    setNotification({ text, color });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await login.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      showNotification("login successful", "green");
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch {
      showNotification("login failed", "red");
      setTimeout(() => {}, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    console.log("logging out of", username, password);
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginElement = () => {
    return (
      <div>
        {notification && (
          <NotificationElement
            text={notification.text}
            color={notification.color}
          />
        )}
        <h2>Login to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const blogsElement = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {notification && (
          <NotificationElement
            text={notification.text}
            color={notification.color}
          />
        )}
        <h2>blogs</h2>
        <div>
          <button onClick={handleLogout}>logout</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {sorted.map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              addLike={blogService.addLike}
              getAll={blogService.getAll}
              removeBlog={blogService.removeBlog}
              setBlogs={setBlogs}
            />
          ))}
        </div>
        <button onClick={() => setShowBlogForm(true)}>create new blog</button>
        <NewBlogForm
          show={showBlogForm}
          setShow={setShowBlogForm}
          user={user}
          createNew={blogService.createNew}
          getAll={blogService.getAll}
          setBlogs={() => setBlogs}
          showNotification={showNotification}
        />
      </div>
    );
  };

  return !user ? loginElement() : blogsElement();
};

export default App;

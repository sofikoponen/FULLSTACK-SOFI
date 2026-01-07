import { useState } from "react";

const NewBlogForm = ({
  createNew,
  getAll,
  show,
  setShow,
  showNotification,
  setBlogs,
  user,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    console.log("adding blog");
    try {
      await createNew({ title, author, url });
      getAll().then((blogs) => setBlogs(blogs));
      const text = `new blog: ${title} ${author}, added by: ${user.username}`;
      showNotification(text, "green");
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch {
      const text = ` blog: ${title} ${author} could not be added`;
      showNotification(text, "red");
      setTimeout(() => {}, 5000);
    }
  };

  return (
    <div style={{ display: show ? "" : "none" }}>
      <h2> Create new </h2>
      <form onSubmit={(event) => handleCreateBlog(event)}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="write title here"
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="write author here"
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder="write url here"
            />
          </label>
        </div>
        <button type="submit" onClick={() => setShow(false)}>
          create
        </button>
      </form>
      <button onClick={() => setShow(false)}>cancel</button>
    </div>
  );
};

export default NewBlogForm;

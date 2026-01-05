import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const createNew = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addLike = async (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };

  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

export default { createNew, setToken, getAll, addLike, removeBlog };

import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { describe, expect, test } from "vitest";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Render Blog element correctly", () => {
  const mockUser = {
    id: 1,
    username: "nofipofi",
    name: "Sofi",
    blogs: {},
  };
  const mockBlog = {
    id: 1,
    title: "Good title",
    author: "Agatha Christie",
    url: "Goodmoob.com",
    likes: 3,
  };

  const mockBlogs = [];

  test("Render only title and author on initial open", () => {
    render(
      <Blog
        user={mockUser}
        blog={mockBlog}
        getAll={vi.fn()}
        addLike={vi.fn()}
        setBlogs={vi.fn()}
        removeBlog={vi.fn()}
      />
    );

    const title = screen.queryByText(mockBlog.title, { exact: false });
    const author = screen.queryByText(mockBlog.author, { exact: false });
    const url = screen.queryByText(mockBlog.url, { exact: false });
    const likes = screen.queryByText(mockBlog.likes, { exact: false });

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).not.toBeInTheDocument();
    expect(likes).not.toBeInTheDocument();
  });
  test("Render title, author, url and likes when view is clicked", async () => {
    render(
      <Blog
        user={mockUser}
        blog={mockBlog}
        getAll={vi.fn()}
        addLike={vi.fn()}
        setBlogs={vi.fn()}
        removeBlog={vi.fn()}
      />
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");

    await user.click(viewButton);

    const title = screen.getByText(mockBlog.title, { exact: false });
    const author = screen.getByText(mockBlog.author, { exact: false });
    const url = screen.getByText(mockBlog.url, { exact: false });
    const likes = screen.getByText(mockBlog.likes, { exact: false });

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });
  test("Call addLike event twice when button is clicked twice", async () => {
    const mockHandler = vi.fn();

    render(
      <Blog
        user={mockUser}
        blog={mockBlog}
        getAll={vi.fn().mockResolvedValue(mockBlogs)}
        addLike={mockHandler}
        setBlogs={vi.fn()}
        removeBlog={vi.fn()}
      />
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");

    await user.click(viewButton);

    const likeButton = screen.getByText("like");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

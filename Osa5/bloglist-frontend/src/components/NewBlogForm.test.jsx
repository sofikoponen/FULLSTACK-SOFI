import { render, screen } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";
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

  test("Call createNew hook with correct props", async () => {
    const mockCreateNew = vi.fn();

    const mockBlog = {
      title: "Good title",
      author: "Agatha Christie",
      url: "Goodmoob.com",
    };

    render(
      <NewBlogForm
        user={mockUser}
        createNew={mockCreateNew}
        getAll={vi.fn()}
        setBlogs={vi.fn()}
        setShow={vi.fn()}
        show={true}
        showNotification={vi.fn()}
      />
    );

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("write title here"),
      mockBlog.title
    );
    await user.type(
      screen.getByPlaceholderText("write author here"),
      mockBlog.author
    );
    await user.type(
      screen.getByPlaceholderText("write url here"),
      mockBlog.url
    );

    const button = screen.getByText("create");

    await user.click(button);

    expect(mockCreateNew.mock.calls).toHaveLength(1);
    expect(mockCreateNew).toHaveBeenCalledWith({
      title: mockBlog.title,
      author: mockBlog.author,
      url: mockBlog.url,
    });
  });
});

const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await page.goto("http://localhost:5173");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const loginText = page.getByText("Login to application");
    const userNameText = page.getByText("username");
    const passwordText = page.getByText("password");

    await expect(loginText).toBeVisible();
    await expect(userNameText).toBeVisible();
    await expect(passwordText).toBeVisible();
  });

  test("succeeds with correct credentials", async ({ page }) => {
    await page.getByLabel("username").fill("mluukkai");
    await page.getByLabel("password").fill("salainen");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("login successful")).toBeVisible();
  });

  test("fails with wrong credentials", async ({ page }) => {
    await page.getByLabel("username").fill("mluukkai");
    await page.getByLabel("password").fill("salainetn");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("login failed")).toBeVisible();
  });

  test("a new blog can be created", async ({ page }) => {
    await page.getByLabel("username").fill("mluukkai");
    await page.getByLabel("password").fill("salainen");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("login successful")).toBeVisible();

    await page.getByRole("button", { name: "create new blog" }).click();

    await expect(page.getByText("title")).toBeVisible();

    await page.getByLabel("title").fill("Sofin kirja");
    await page.getByLabel("author").fill("Sofi K");
    await page.getByLabel("url").fill("sofin.kirja");

    await page.getByRole("button", { name: "create" }).click();

    await expect(
      page.getByText("new blog: Sofinkirja Sofi K, added by: mluukkai")
    );
  });
});

import { test, expect } from "@playwright/test";

test("Has correct title", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Fake Personal Data Generator/);
});

[1, 2, 50, 99, 100].forEach((amount) => {
  test(`Generate ${amount} of people`, async ({ page }) => {
    await page.goto("http://localhost:8080/");
    await page.getByTestId("people-amount").fill(amount.toString());

    await page.getByTestId("generate").click();

    await page.waitForResponse((response) =>
      response.url().includes("/person"),
    );

    const articles = await page.getByTestId("person").all();

    expect(articles.length).toBe(amount);

    for (const article of articles) {
      await expect(article).toBeVisible();
    }
  });
});

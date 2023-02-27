import { test, expect, Page } from "@playwright/test";
import { BASE_URL } from "./config";

test.describe("when user open lineman.line.me", () => {
  let popup: Promise<Page>;
  let termAndConditionPage: Page;

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole("link", { name: "Terms & Conditions" }).click();

    popup = page.waitForEvent("popup");
    termAndConditionPage = await popup;
  });

  test.describe("then user click `term and condition` link", async () => {
    test("it should have the url as expected", async ({ page }) => {
      await expect(termAndConditionPage).toHaveURL(
        "https://terms2.line.me/lineman_terms_4/sp?lang=en"
      );
    });

    test("it should have title", async ({ page }) => {
      await expect(termAndConditionPage).toHaveTitle("Terms of Service");
    });
  });
});

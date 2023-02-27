import { test, expect, Page } from "@playwright/test";
import { BASE_URL } from "./config";

test.describe("when user open lineman.line.me", () => {
  let popup: Promise<Page>;
  let privacyPolicyPage: Page;

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole("link", { name: "PRIVACY POLICY" }).click();

    popup = page.waitForEvent("popup");
    privacyPolicyPage = await popup;
  });

  test.describe("then user click `privacy and policy` link", async () => {
    test("it should have the url as expected", async ({ page }) => {
      await expect(privacyPolicyPage).toHaveURL(
        "https://terms2.line.me/lineman_privacy_4/sp?lang=en"
      );
    });

    test("it should have title", async ({ page }) => {
      await expect(privacyPolicyPage).toHaveTitle("Privacy Policy");
    });
  });
});

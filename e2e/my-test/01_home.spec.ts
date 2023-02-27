import { test, expect } from "@playwright/test";
import { BASE_URL } from "./config";

test.describe("when user open lineman.line.me", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  })

  test.afterAll(async ({ page }) => {
    page.close();
  })

  test("it should has title as expected", async ({ page }) => {
    await expect(page).toHaveTitle(
      "LINE MAN | สั่งอาหาร แท็กซี่ ส่งพัสดุ แมสเซนเจอร์ ซื้อของ"
    );
  });

  test("it should contains `5` main sub-menus", async ({ page }) => {
    // await page.goto(baseURL);
    const mainMenusSelector = page.locator("#menu-main-menu > li");

    await expect(mainMenusSelector).toHaveCount(5);
  });

  test.describe("when hover `บริการ` menu", () => {
    test("should contains 4 sub-menus", async ({ page }) => {
      await expect(page.locator("#menu-item-3589 > div > ul > li")).toHaveCount(4);
      await expect(page.locator("#menu-item-3589 > div > ul")).toHaveText("สั่งอาหาร สั่งของ เรียกแท็กซี่ เมสเซนเจอร์")
    });
  });

  test.describe("when hover `พาร์ทเนอร์` menu", () => {
    test("should contains 3 sub-menus", async ({ page }) => {
      await expect(page.locator("#menu-item-3590 > div > ul > li")).toHaveCount(3);
      await expect(page.locator("#menu-item-3590 > div > ul")).toHaveText("เปิดร้านอาหาร สมัครขับไลน์แมน ร่วมเป็นพันธมิตรทางธุรกิจ")
    });
  });
});

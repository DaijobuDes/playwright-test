import { test, expect } from '@playwright/test';

const URL = "https://www.daijobudes.net"

test('main page', async ({ page }) => {
  await page.goto(URL);

  // Expect a title "to contain" a substring.
  await expect(page.locator('h3')).toContainText('Kate\'s Site');
  await expect(page.locator('h1')).toContainText('Welcome to my userpage.');
});

test('can go to profile page', async ({ page }) => {
  await page.goto(URL);

  await page.getByRole('main').getByRole('link', { name: 'Profile' }).click();

  await expect(page.locator('h1')).toContainText('About me');
});

test('can go to contact page', async ({ page }) => {
  await page.goto(URL);

  await page.getByRole('main').getByRole('link', { name: 'Contact' }).click();

  await expect(page.locator('h1')).toContainText('Contact Page');
  await expect(page.getByRole('paragraph')).toContainText('Want to email me instead? Send Mail');
});

test('can change pages', async ({ page }) => {
  await page.goto(URL);

  await page.getByRole('navigation').getByRole('link', { name: 'Profile' }).click();
  await expect(page.locator('h1')).toContainText('About me');
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page.locator('h1')).toContainText('Contact Page');
});

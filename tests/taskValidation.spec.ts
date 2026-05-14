import { test, expect } from '@playwright/test';
import testData from '../data/testData.json';

const credentialsToLogin = { 
	username: 'admin',
	password: 'password123',
};

test.describe('Asana Demo App - Data Driven Tests', () => {
	test.beforeEach(async ({ page }) => { //Login Hook
		await page.goto('/');
		await page.fill('#username', credentialsToLogin.username);
		await page.fill('#password', credentialsToLogin.password);
		await page.click('button[type="submit"]');
	
		await expect(page.getByRole('heading', {name: 'Projects'})).toBeVisible();
	});
	
	for (const data of testData){
		test(`testCase ${data.id}: Verify "${data.task}" in ${data.navigation}`, async ({ page }) => {
		const navButton = page.locator(`button:has-text("${data.navigation}")`);
		await navButton.click();
		const column = page.locator(`.flex.flex-col`, {
			has: page.locator('h2', {hasText: data.column}),
		});
		const taskCard = column.locator('.bg-white',{
			has: page.locator('h3', { hasText: data.task}),
		});
		await expect(taskCard).toBeVisible();
		for (const tag of data.tags) {
			const taglocator = taskCard.locator('span', {hasText: tag});
			await expect(taglocator).toBeVisible();
		}
	    });
  }
  
});














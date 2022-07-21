import { test, expect } from '@playwright/test'

test('Export modal', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto('/')
  await expect(page.locator('h5')).toHaveText('My Invoices')

  // Click text=export
  await page.locator('text=export').click()
  const modal = page.locator('_react=Export')
  await expect(modal.count()).toBeTruthy()
  const heading = modal.locator('h2')
  await expect(heading).toHaveText('Export')

  // Click text=Start dateStart date >> [aria-label="Choose date"]
  await page
    .locator('text=Start dateStart date >> [aria-label="Choose date"]')
    .click()
  // Click [aria-label="Jul 1\, 2022"]
  await page.locator('[aria-label="Jul 1\\, 2022"]').click()
  // Click [aria-label="Choose date"]
  await page.locator('[aria-label="Choose date"]').click()
  // Click [aria-label="Jul 31\, 2022"]
  await page.locator('[aria-label="Jul 31\\, 2022"]').click()
  // Click text=PDF
  await page.locator('text=PDF').click()
  // Click text=DOCX
  await page.locator('text=DOCX').click()
  // Click div[role="dialog"] button:has-text("Export")
  await page.locator('div[role="dialog"] button:has-text("Export")').click()
})

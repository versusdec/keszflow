import { test, expect } from '@playwright/test'

test('Create modal', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto('/')
  await expect(page.locator('h5')).toHaveText('My Invoices')
  // Click text=create
  await page.locator('text=create').click()

  const modal = page.locator('_react=InvoiceCreate')
  const heading = modal.locator('h2')
  await expect(heading).toHaveText('Create Invoice')
  const form = modal.locator('_react=InvoiceForm')
  const items = form.locator('_react=itemJSX')
  await items.locator('input[name="items\\.0\\.name"]').click()
  await items.locator('input[name="items\\.0\\.name"]').fill('holy shit')

  // Click input[name="no"]
  await page.locator('input[name="no"]').click()
  // Fill input[name="no"]
  await page.locator('input[name="no"]').fill('100500test')
  // Click input[name="seller\.name"]
  await page.locator('input[name="seller\\.name"]').click()
  // Fill input[name="seller\.name"]
  await page.locator('input[name="seller\\.name"]').fill('me')
  // Press Tab
  await page.locator('input[name="seller\\.name"]').press('Tab')
  // Fill input[name="seller\.address_line_1"]
  await page.locator('input[name="seller\\.address_line_1"]').fill('home')
  // Click input[name="buyer\.name"]
  await page.locator('input[name="buyer\\.name"]').click()
  // Fill input[name="buyer\.name"]
  await page.locator('input[name="buyer\\.name"]').fill('them')
  // Click input[name="buyer\.address_line_1"]
  await page.locator('input[name="buyer\\.address_line_1"]').click()
  // Fill input[name="buyer\.address_line_1"]
  await page.locator('input[name="buyer\\.address_line_1"]').fill('work')
  // Click text=Issue dateIssue date >> [aria-label="Choose date"]
  await page
    .locator('text=Issue dateIssue date >> [aria-label="Choose date"]')
    .click()
  // Click text=16
  await page.locator('text=16').click()
  // Click input[name="items\.0\.name"]
  await page.locator('input[name="items\\.0\\.name"]').click()
  // Fill input[name="items\.0\.name"]
  await page.locator('input[name="items\\.0\\.name"]').fill('test')
  // Click text=Save

  await page.locator('text=Save').click()
})

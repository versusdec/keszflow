import { test, expect } from '@playwright/test'

test('Register', async ({ page }) => {
  // Go to http://localhost:3000/signin/
  await page.goto('/sign-up/')

  const submit = page.locator('[data-testid="submit"]')
  const email = page.locator('[data-testid="email"]')
  const password = page.locator('[data-testid="password"]')
  const confirmPassword = page.locator('[data-testid="confirmPassword"]')

  // Click [data-testid="submit"]
  await submit.click()

  // expect required errors
  let emailIsValid = (await email.getAttribute('aria-invalid')) === 'false'
  let passwordIsValid =
    (await password.getAttribute('aria-invalid')) === 'false'
  let confirmPasswordIsValid =
    (await password.getAttribute('aria-invalid')) === 'false'
  await expect(emailIsValid).toBeFalsy()
  await expect(passwordIsValid).toBeFalsy()
  await expect(confirmPasswordIsValid).toBeFalsy()

  // Click [data-testid="login"]
  await email.click()
  // Fill [data-testid="login"]
  await email.fill('zhopa')
  // Click [data-testid="submit"]
  await submit.click()

  // expect invalid email error
  emailIsValid = (await email.getAttribute('aria-invalid')) === 'false'
  await expect(emailIsValid).toBeFalsy()

  // Click [data-testid="login"]
  await email.click()
  // Fill [data-testid="login"]
  await email.fill('zhopa@dinozavra.com')
  // Click [data-testid="submit"]
  await submit.click()

  // expect login error falsy
  emailIsValid = (await email.getAttribute('aria-invalid')) === 'false'
  await expect(emailIsValid).toBeTruthy()

  // Click [data-testid="password"]
  await password.click()
  // Fill [data-testid="password"]
  await password.fill('100')
  // Click [data-testid="submit"]
  await submit.click()

  // expect password must be min 6 chars error
  passwordIsValid = (await password.getAttribute('aria-invalid')) === 'false'
  await expect(passwordIsValid).toBeFalsy()

  // Click [data-testid="password"]
  await page.locator('[data-testid="password"]').click()
  // Fill [data-testid="password"]
  await page.locator('[data-testid="password"]').fill('100500')
  // Click [data-testid="submit"]
  await page.locator('[data-testid="submit"]').click()

  // Click [data-testid="confirmPassword"]
  await confirmPassword.click()
  // Fill [data-testid="password"]
  await confirmPassword.fill('100')
  // Click [data-testid="submit"]
  await submit.click()

  // expect password not match
  confirmPasswordIsValid =
    (await confirmPassword.getAttribute('aria-invalid')) === 'false'
  await expect(confirmPasswordIsValid).toBeFalsy()

  // Click [data-testid="password"]
  await confirmPassword.click()
  // Fill [data-testid="password"]
  await confirmPassword.fill('100500')
  // Click [data-testid="submit"]
  await submit.click()

  // expect no errors
  confirmPasswordIsValid =
    (await confirmPassword.getAttribute('aria-invalid')) === 'false'
  await expect(confirmPasswordIsValid).toBeTruthy()
})

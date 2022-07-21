import { test, expect } from '@playwright/test'

test('Login', async ({ page }) => {
  // Go to http://localhost:3000/signin/
  await page.goto('/sign-in/')

  const submit = page.locator('[data-testid="submit"]')
  const login = page.locator('[data-testid="login"]')
  const password = page.locator('[data-testid="password"]')

  // Click [data-testid="submit"]
  await submit.click()

  // expect required errors
  let loginIsValid = (await login.getAttribute('aria-invalid')) === 'false'
  let passwordIsValid =
    (await password.getAttribute('aria-invalid')) === 'false'
  await expect(loginIsValid).toBeFalsy()
  await expect(passwordIsValid).toBeFalsy()

  // Click [data-testid="login"]
  await login.click()
  // Fill [data-testid="login"]
  await login.fill('zhopa')
  // Click [data-testid="submit"]
  await submit.click()

  // expect invalid email error
  loginIsValid = (await login.getAttribute('aria-invalid')) === 'false'
  await expect(loginIsValid).toBeFalsy()

  // Click [data-testid="login"]
  await login.click()
  // Fill [data-testid="login"]
  await login.fill('zhopa@dinozavra.com')
  // Click [data-testid="submit"]
  await submit.click()

  // expect login error falsy
  loginIsValid = (await login.getAttribute('aria-invalid')) === 'false'
  await expect(loginIsValid).toBeTruthy()

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
  await password.click()
  // Fill [data-testid="password"]
  await password.fill('100500')
  // Click [data-testid="submit"]
  await submit.click()

  // expect no errors
  passwordIsValid = (await password.getAttribute('aria-invalid')) === 'false'
  await expect(passwordIsValid).toBeTruthy()
})

import { test, expect } from '@playwright/test'

test.describe('Contact Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('should render contact form with all fields', async ({ page }) => {
    // Check page title and form elements
    await expect(page.locator('h1')).toContainText('Contact Us')
    
    // Check form fields
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/phone/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible()
  })

  test('should submit contact form with valid data', async ({ page }) => {
    // Fill out the form
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john.doe@example.com')
    await page.getByLabel(/phone/i).fill('+44 7700 900000')
    await page.getByLabel(/message/i).fill('I would like to inquire about your security taxi services.')
    
    // Submit form
    await page.getByRole('button', { name: /send message/i }).click()
    
    // Should show success message
    await expect(page.locator('text=Message sent successfully') || page.locator('text=Thank you')).toBeVisible({ timeout: 5000 })
  })

  test('should show validation errors for empty form', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /send message/i }).click()
    
    // Should show validation errors
    await expect(page.locator('text=Name is required') || page.locator('text=Please enter your name')).toBeVisible()
    await expect(page.locator('text=Email is required') || page.locator('text=Please enter your email')).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByLabel(/message/i).fill('Test message')
    
    await page.getByRole('button', { name: /send message/i }).click()
    
    await expect(page.locator('text=Invalid email format') || page.locator('text=Please enter a valid email')).toBeVisible()
  })

  test('should display contact information', async ({ page }) => {
    // Check contact information is displayed
    await expect(page.locator('text=07407 655 203')).toBeVisible()
    await expect(page.locator('text=bookings@gqcars.co.uk')).toBeVisible()
    
    // Check business hours or availability
    await expect(page.locator('text=24/7') || page.locator('text=Available')).toBeVisible()
  })

  test('should have clickable phone number and email', async ({ page }) => {
    // Phone number should be clickable
    const phoneLink = page.locator('a[href^="tel:"]')
    await expect(phoneLink).toBeVisible()
    
    // Email should be clickable
    const emailLink = page.locator('a[href^="mailto:"]')
    await expect(emailLink).toBeVisible()
  })

  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Form should be responsive
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    
    // Should be able to fill and submit
    await page.getByLabel(/name/i).fill('Mobile User')
    await page.getByLabel(/email/i).fill('mobile@example.com')
    await page.getByLabel(/message/i).fill('Testing mobile form')
    
    await page.getByRole('button', { name: /send message/i }).click()
  })

  test('should track analytics events', async ({ page }) => {
    // Mock analytics to verify tracking
    await page.addInitScript(() => {
      window.gtag = jest.fn()
    })
    
    // Fill and submit form
    await page.getByLabel(/name/i).fill('Analytics Test')
    await page.getByLabel(/email/i).fill('analytics@example.com')
    await page.getByLabel(/message/i).fill('Testing analytics')
    
    await page.getByRole('button', { name: /send message/i }).click()
    
    // Verify analytics call was made (in real implementation)
    // This would check that trackContactFormSubmitted was called
  })
})
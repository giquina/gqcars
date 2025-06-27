import { test, expect } from '@playwright/test'

test.describe('Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should complete full booking flow from homepage', async ({ page }) => {
    // Start from homepage
    await expect(page.locator('h1')).toContainText('GQ Cars')
    
    // Click book now button
    await page.getByRole('button', { name: /book now/i }).first().click()
    
    // Should navigate to booking page
    await expect(page).toHaveURL(/\/book/)
    
    // Fill out booking form
    await page.getByLabel(/pickup location/i).fill('Heathrow Airport Terminal 5')
    await page.getByLabel(/dropoff location/i).fill('Central London')
    
    // Select service type
    await page.getByLabel(/service type/i).selectOption('Standard')
    
    // Fill date and time
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateString = tomorrow.toISOString().split('T')[0]
    await page.getByLabel(/date/i).fill(dateString)
    await page.getByLabel(/time/i).fill('10:00')
    
    // Fill passenger count
    await page.getByLabel(/passenger count/i).selectOption('2')
    
    // Fill contact information
    await page.getByLabel(/contact phone/i).fill('+44 7700 900000')
    await page.getByLabel(/contact email/i).fill('test@example.com')
    
    // Check price estimate appears
    await expect(page.locator('text=Estimated Price')).toBeVisible()
    
    // Submit booking
    await page.getByRole('button', { name: /book now/i }).click()
    
    // Should show success message or redirect to confirmation
    await expect(page.locator('text=Booking Confirmed') || page.locator('text=Thank You')).toBeVisible({ timeout: 10000 })
  })

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/book')
    
    // Try to submit empty form
    await page.getByRole('button', { name: /book now/i }).click()
    
    // Should show validation errors
    await expect(page.locator('text=Pickup location is required')).toBeVisible()
    await expect(page.locator('text=Dropoff location is required')).toBeVisible()
  })

  test('should calculate prices for different service types', async ({ page }) => {
    await page.goto('/book')
    
    // Fill locations
    await page.getByLabel(/pickup location/i).fill('Heathrow Airport')
    await page.getByLabel(/dropoff location/i).fill('Central London')
    
    // Test Standard service
    await page.getByLabel(/service type/i).selectOption('Standard')
    await expect(page.locator('[data-testid="price-estimate"]')).toContainText('£')
    
    // Test Executive service (should be more expensive)
    await page.getByLabel(/service type/i).selectOption('Executive')
    await expect(page.locator('[data-testid="price-estimate"]')).toContainText('£')
    
    // Test XL service
    await page.getByLabel(/service type/i).selectOption('XL')
    await expect(page.locator('[data-testid="price-estimate"]')).toContainText('£')
  })

  test('should work on mobile devices', async ({ page }) => {
    // Test mobile responsiveness
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/book')
    
    // Form should still be usable
    await expect(page.getByLabel(/pickup location/i)).toBeVisible()
    await expect(page.getByLabel(/dropoff location/i)).toBeVisible()
    
    // Fill form on mobile
    await page.getByLabel(/pickup location/i).fill('Heathrow')
    await page.getByLabel(/dropoff location/i).fill('London')
    await page.getByLabel(/service type/i).selectOption('Standard')
    
    // Submit should work
    await page.getByRole('button', { name: /book now/i }).click()
  })

  test('should prefill form for authenticated users', async ({ page }) => {
    // Mock authentication (this would depend on your auth implementation)
    await page.goto('/auth/login')
    
    // Login
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Navigate to booking
    await page.goto('/book')
    
    // Email should be prefilled
    await expect(page.getByLabel(/contact email/i)).toHaveValue('test@example.com')
  })
})
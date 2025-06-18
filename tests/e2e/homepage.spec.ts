import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has title and loads correctly', async ({ page }) => {
    // Expect a title "to contain" a substring
    await expect(page).toHaveTitle(/GQ Security Services/)
    
    // Check if hero section is visible
    await expect(page.locator('h1')).toContainText('Elite Close Protection & Private Hire')
  })

  test('navigation works correctly', async ({ page }) => {
    // Test navigation to services
    await page.click('a[href="/services"]')
    await expect(page).toHaveURL('/services')
    
    // Test back to homepage
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('service cards are displayed', async ({ page }) => {
    // Check if all service cards are visible
    const serviceCards = page.locator('[data-testid="service-card"]')
    await expect(serviceCards).toHaveCount(6)
    
    // Check specific services
    await expect(page.locator('text=Close Protection')).toBeVisible()
    await expect(page.locator('text=Private Hire')).toBeVisible()
    await expect(page.locator('text=Corporate Security')).toBeVisible()
    await expect(page.locator('text=Wedding Security')).toBeVisible()
    await expect(page.locator('text=VIP Services')).toBeVisible()
    await expect(page.locator('text=Event Security')).toBeVisible()
  })

  test('contact buttons work', async ({ page }) => {
    // Test phone link
    const phoneLink = page.locator('a[href^="tel:"]')
    await expect(phoneLink).toBeVisible()
    
    // Test contact form link
    await page.click('text=Request Quote')
    await expect(page).toHaveURL('/contact')
  })

  test('responsive design works', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('h1')).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('h1')).toBeVisible()
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('h1')).toBeVisible()
  })

  test('performance metrics are acceptable', async ({ page }) => {
    const navigationPromise = page.waitForLoadState('networkidle')
    await page.goto('/')
    await navigationPromise
    
    // Check if page loads within reasonable time
    const performanceEntries = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      }
    })
    
    // Assert performance metrics
    expect(performanceEntries.domContentLoaded).toBeLessThan(3000)
    expect(performanceEntries.loadComplete).toBeLessThan(5000)
  })
})
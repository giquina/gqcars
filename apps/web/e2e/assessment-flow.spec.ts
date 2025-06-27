import { test, expect } from '@playwright/test'

test.describe('Security Assessment Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should complete full assessment flow from homepage', async ({ page }) => {
    // Start from homepage
    await expect(page.locator('h1')).toContainText('GQ Cars')
    
    // Click assessment button
    await page.getByRole('button', { name: /take security assessment/i }).first().click()
    
    // Should start assessment
    await expect(page.locator('text=Security Assessment')).toBeVisible()
    await expect(page.locator('text=1 of 5')).toBeVisible()
    
    // Answer Question 1: Public figure status
    await page.getByRole('button', { name: /sometimes/i }).click()
    
    // Question 2: Travel frequency
    await expect(page.locator('text=2 of 5')).toBeVisible()
    await page.getByRole('button', { name: /weekly/i }).click()
    
    // Question 3: Security incidents
    await expect(page.locator('text=3 of 5')).toBeVisible()
    await page.getByRole('button', { name: /none/i }).click()
    
    // Question 4: Sensitive locations
    await expect(page.locator('text=4 of 5')).toBeVisible()
    await page.getByRole('button', { name: /never/i }).click()
    
    // Question 5: Security awareness
    await expect(page.locator('text=5 of 5')).toBeVisible()
    await page.getByRole('button', { name: /high/i }).click()
    
    // Should show results
    await expect(page.locator('text=Assessment Complete')).toBeVisible({ timeout: 5000 })
    await expect(page.locator('text=Threat Level')).toBeVisible()
    await expect(page.locator('text=Recommendations')).toBeVisible()
  })

  test('should show high threat level for high-risk answers', async ({ page }) => {
    // Navigate to assessment
    await page.goto('/assessment')
    
    // Answer with high-risk options
    await page.getByRole('button', { name: /often/i }).click() // High-profile
    await page.getByRole('button', { name: /daily/i }).click() // Frequent travel
    await page.getByRole('button', { name: /multiple/i }).click() // Multiple incidents
    await page.getByRole('button', { name: /often/i }).click() // Sensitive locations
    await page.getByRole('button', { name: /low/i }).click() // Low awareness
    
    // Should show high threat level
    await expect(page.locator('text=Substantial') || page.locator('text=Severe') || page.locator('text=Critical')).toBeVisible()
  })

  test('should allow going back and changing answers', async ({ page }) => {
    await page.goto('/assessment')
    
    // Answer first question
    await page.getByRole('button', { name: /sometimes/i }).click()
    
    // Check we're on question 2
    await expect(page.locator('text=2 of 5')).toBeVisible()
    
    // Go back
    await page.getByRole('button', { name: /back/i }).click()
    
    // Should be back to question 1
    await expect(page.locator('text=1 of 5')).toBeVisible()
    
    // Change answer
    await page.getByRole('button', { name: /often/i }).click()
    
    // Should progress to question 2 with new answer
    await expect(page.locator('text=2 of 5')).toBeVisible()
  })

  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/assessment')
    
    // Assessment should be responsive
    await expect(page.locator('text=Security Assessment')).toBeVisible()
    await expect(page.getByRole('button', { name: /never/i })).toBeVisible()
    
    // Buttons should be touch-friendly
    await page.getByRole('button', { name: /sometimes/i }).click()
    await expect(page.locator('text=2 of 5')).toBeVisible()
  })

  test('should save assessment for authenticated users', async ({ page }) => {
    // Login first
    await page.goto('/auth/login')
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Complete assessment
    await page.goto('/assessment')
    
    // Quick assessment completion
    const answers = ['sometimes', 'weekly', 'none', 'never', 'high']
    for (const answer of answers) {
      await page.getByRole('button', { name: new RegExp(answer, 'i') }).click()
    }
    
    // Should save and redirect to results
    await expect(page.locator('text=Assessment Complete')).toBeVisible()
    
    // Check dashboard has assessment
    await page.goto('/dashboard')
    await expect(page.locator('text=Recent Assessments')).toBeVisible()
  })
})
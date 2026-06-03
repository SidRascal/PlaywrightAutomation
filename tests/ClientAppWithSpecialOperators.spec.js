const { test, expect } = require('@playwright/test');

test.only('@Website client App Login', async ({ page }) => {
    const products = page.locator(".card-body")
    const productName = "iphone 13 pro"
    const email = "test1.user1@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill("Test@1234")

    await page.getByRole("button", {name:'Login'}).click()

    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor()


    await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'})
    .getByRole("button", {name:'Add to Cart'}).click()

    await page.getByRole("listitem").getByRole("button", {name:'Cart'}).click()


    await page.locator("div li").first().waitFor()

    await expect(page.getByText('ZARA COAT 3')).toBeVisible()

    await page.getByRole("button", {name: 'Checkout'}).click()


    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:150})

    await page.getByRole("button", {name: 'India'}).nth(1).click()

    
    await page.getByText("PLACE ORDER").click()

    await expect(page.getByText('THANKYOU FOR THE ORDER.')).toBeVisible()


    ī
}   
);


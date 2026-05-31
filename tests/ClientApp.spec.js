const { test, expect } = require('@playwright/test');

test.only('Browser Context First PlayWright Test', async ({ page }) => {
    const products = page.locator(".card-body")
    const productName = "iphone 13 pro"
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("test1.user1@gmail.com")
    await page.locator("#userPassword").fill("Test@1234")
    await page.locator("[value='Login']").click()
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor()
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles)

    const count = await  products.count()
    for (let i=0; i<count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() == productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
        
    }
    await page.locator("[routerlink*='cart']").click()
    await page.locator("div li").first().waitFor()
    const productIsPresent = await page.locator("h3:has-text(productName)").isVisible()
    expect(productIsPresent).toBeTruthy()
    await page.locator("text=Checkout").click()
    await page.locator("[placeholder*='Country']").pressSequentially("ind")
    const dropDown = page.locator("section.ta-results")
    await dropDown.waitFor()
    optionCount = await dropDown.locator("button").count()
    for(let i=0; i<optionCount; i++)
    {
        buttonText = dropDown.locator("button").nth(i).textContent()
        if (buttonText.includes("India"))
            {
                await dropDown.locator("button").nth(i).click()
                breakl̥
            }
    }

}
);


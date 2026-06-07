const { test, expect } = require('@playwright/test');

test('Browser Context First PlayWright Test', async ({ page }) => {
    const products = page.locator(".card-body")
    const productName = "iphone 13 pro"
    const email = "test1.user1@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill(email)
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
    const productIsPresent = await page.locator("h3:has-text(' iphone 13 pro')").isVisible()
    expect(productIsPresent).toBeTruthy()
    await page.locator("text=Checkout").click()
    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:150})
    const dropDown = page.locator(".ta-results")
    await dropDown.waitFor()
    const optionCount = await dropDown.locator("button").count()
    for(let i=0; i<optionCount; i++)
    {
        const buttonText = await dropDown.locator("button").nth(i).textContent()
        if (buttonText === " India")
            {
                await dropDown.locator("button").nth(i).click()
                break
            }
    }
    expect(page.locator(".user__name [type=text]").first()).toHaveText(email)
    await page.locator(".action__submit ").click()
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const productId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(productId)

    await page.locator("button[routerlink*='myorders']").click()

    await page.locator("tbody").waitFor()
  

    const rows = await page.locator("tbody tr")
    for (let i=0; i< await rows.count; i++)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent()
        if(productId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click()
            break
        }
    }
    const detailsPageOrderId = await page.locator(".col-md-6 .col-text").textContent()
    await expect(productId.includes(detailsPageOrderId)).toBeTruthy() 

}   
);


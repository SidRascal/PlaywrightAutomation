const {test,expect} = require('@playwright/test');


test("Popup Validation", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    // await page.goto("https://www.google.com/")
    // await page.goBack()
    // await page.goForward()

    // await expect(page.locator("#displayed-text")).toBeVisible
    // await page.locator("#hide-textbox").click()
    // await expect(page.locator("#displayed-text")).toBeHidden()
    //page.on('dialog', dialog => dialog.accept())
    await page.pause()
    await page.locator("//input[@id='confirmbtn']").click()
    const framePage = page.frameLocator("#courses-iframe")
    await framePage.locator("li a[href*='lifetime-access']:visible").click() 

    const textOnPage = await framePage.locator("div.text h2").textContent()
    const textNumber = textOnPage.split(" ")[1]
    console.log(textNumber)
    
})
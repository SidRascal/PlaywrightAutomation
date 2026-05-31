const { test, expect } = require('@playwright/test');

test('Browser Context First PlayWright Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title())
    const username = page.locator('#username')
    const password = page.locator("[name='password']")
    const signInButton = page.locator('#signInBtn')
    const cards = page.locator(".card-body a")

    await username.fill("rahulshettyacademy")
    await password.fill("Learning@830$3mK2")
    await signInButton.click()
    // console.log(await page.locator("[style*='block']").textContent())
    // await expect(page.locator("[style*='block']")).toContainText("Incorrecta")
    console.log(await cards.first().textContent())
    console.log(await cards.nth(2).textContent())
    const allTitles = await cards.allTextContents()
    console.log(allTitles)
}
);

test('Page Context Second PlayWright Test', async ({ page }) => {
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
}
);

test('UI Element such as radio button and dropdown', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('#username')
    const password = page.locator("[name='password']")
    const signInButton = page.locator('#signInBtn')
    const documentLink = page.locator("[href*='documents-request']")

    await username.fill("rahulshettyacademy")
    await password.fill("Learning@830$3mK2")

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult")
    await page.locator(".radiotextsty").last().click()
    await page.locator("button[class='btn btn-success']").click();
    console.log(await page.locator(".radiotextsty").last().isChecked())
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText")
}
);

test('Child Window handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username')
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']")
    // await documentLink.click()
    // page.pause()

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const text = await newPage.locator(".im-para.red").textContent()
    console.log(text)

    const arrayText = text.split("@")
    const domainName = arrayText[1].split(" ")[0]
    console.log(domainName)

    await username.fill(domainName)
    //console.log(await page.locator("#username").inputValue());
    console.log(await page.locator("#username").inputValue())

    //await page.pause()


}
);
const {test,expect} = require("@playwright/test")

test("Calendar Functionality", async({page}) => {

    const month = "10"
    const date = "12"
    const year = "2026"
    const expectedList = [month,date,year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()

    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click()
    await page.locator("//abbr[text()='"+date+"']").click()

    const input = await page.locator(".react-date-picker__inputGroup input")

    for (let i=0; i< expectedList; i++)
    {
        const value = await input.nth(i).inputValue()
        expect(value).toEqual(expectedList[i])
    }



}
)
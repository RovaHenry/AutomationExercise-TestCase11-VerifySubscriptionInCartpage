const {Builder, By} = require('selenium-webdriver');
const DashboardPage = require ('./WebComponent/DashboardPage');

const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 11 [Verify Subscription in cart page]', function(){
    this.timeout(50000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
        break;
    }
    
    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify HomePage', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const isLogoDisplayed = await dashboardPage.verifyLogoHome();
        if (isLogoDisplayed) {
            console.log("Homepage is visible successfully.");
        } else {
            console.log("Homepage is not visible.");
        }  
    });
    it('Verify cart page and subscribe', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.clickButtonCart();
        const element = await driver.findElement(By.css('#susbscribe_email'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", element);
        console.log('Scrolled to the element.');
        await dashboardPage.fillEmailSubscribe();
        await dashboardPage.clickButtonSubscribe();
        const isAlertDisplayed = await dashboardPage.verifyAlertSubscribe();
        if (isAlertDisplayed) {
            console.log("'You have been successfully subscribed!' is visible");
        } else {
            console.log("Alert is not visible.");
        }
    });

    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});
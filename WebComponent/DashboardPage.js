const {By} = require('selenium-webdriver');
// Test Case ini tidak membutuhkjan lebih dari 2 file, karena hanya melakukan validasi pada halaman homepage

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.logoDisplay = By.xpath("//img[@alt='Website for automation practice']");
        this.subscribeHeader = By.css('h2');
        this.fillEmail =  By.css('#susbscribe_email');
        this.buttonCart = By.css(".navbar-nav [href='/view_cart']");
        this.allertMessage = By.css('.alert-success');
        this.subscribeButton = By.css('#subscribe');
    }
    async navigate(baseURL){
        await this.driver.get(baseURL);
    }

    async verifyLogoHome() {
        const logo = await this.driver.findElement(this.logoDisplay);
        return logo;
    }
    async fillEmailSubscribe(){
        await this.driver.findElement(this.fillEmail).sendKeys('Test@gmail.com');
    }
    async clickButtonCart(){
        await this.driver.findElement(this.buttonCart).click();
    }
    async verifySubscribeHeader(){
        const subscribeHeader = await this.driver.findElement(this.subscribeHeader);
        return subscribeHeader;
    }
    async clickButtonSubscribe(){
        await this.driver.findElement(this.subscribeButton).click();
    }
    async verifyAlertSubscribe(){
        const alert = await this.driver.findElement(this.allertMessage);
        return alert;
    }
}

module.exports = DashboardPage;
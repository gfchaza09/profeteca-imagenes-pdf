import puppeteer, { Browser } from "puppeteer";

class PuppeteerManager {
  browser: null | Browser;

  constructor() {
    this.browser = null;
  }

  async init() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }
  }

  async close() {
    if (this.browser) {
      this.browser.disconnect();
      this.browser = null;
    }
  }
}

export default new PuppeteerManager();

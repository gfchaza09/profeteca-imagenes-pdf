import puppeteer, { Browser } from "puppeteer";
import { Cluster } from "puppeteer-cluster";

class PuppeteerManager {
  browser: null | Browser;
  cluster: null | Cluster;

  constructor() {
    this.browser = null;
    this.cluster = null;
  }

  async init() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        userDataDir: "./cache",
      });
    }
  }

  async initCluster() {
    this.cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 4,
      timeout: 500000,
      puppeteerOptions: {
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        userDataDir: "./cache",
        defaultViewport: {
          width: 1080, // Por defecto width: 800
          height: 1080, // Por defecto height: 800
          deviceScaleFactor: 1,
        },
      },
    });
    await this.cluster.task(async ({ page, data: info }) => {
      await page.setContent(info.htmlContent, { waitUntil: "networkidle2" });
      return await page.screenshot({ type: "jpeg" });
    });
  }

  async close() {
    if (this.browser) {
      this.browser.disconnect();
      this.browser = null;
    }
  }
}

export default new PuppeteerManager();

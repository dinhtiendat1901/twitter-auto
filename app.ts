import puppeteer from "puppeteer";
import {checkAd, handleAd} from "./adHandle";


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--start-maximized'],
        defaultViewport: null,
        userDataDir: './section'
    });
    const page = await browser.newPage();
    await page.goto('https://twitter.com/larfy_rothwell/status/1701104434158457123', {waitUntil: "domcontentloaded"});
    await page.waitForSelector('[data-testid="cellInnerDiv"]');
    while (true) {
        const listComments = await page.$$('[data-testid="cellInnerDiv"]');
        let foundAd = false;
        for (const element of listComments) {
            if (await checkAd(element)) {
                await handleAd(element);
                foundAd = true;
                break;
            }
        }
        if (!foundAd) {
            await listComments[listComments.length - 1].scrollIntoView();
            await new Promise(r => setTimeout(r, 3000));
        }
    }
})();
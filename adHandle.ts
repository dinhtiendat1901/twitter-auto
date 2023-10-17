import {ElementHandle} from "puppeteer";

async function checkAd(elementHandle: ElementHandle): Promise<boolean> {
    const listElements = await elementHandle.$$('.css-901oao.r-14j79pv.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0');
    for (const element of listElements) {
        const className = await (await element.getProperty('className')).jsonValue();
        const classes = className.split(' ');
        if (classes.length === 8) {
            const likedIcon = await elementHandle.$('[data-testid="unlike"]');
            return !likedIcon;
        }
    }
    return false;
}

async function handleAd(elementHandle: ElementHandle) {
    await elementHandle.scrollIntoView();
    const likeIcon = (await elementHandle.$('[data-testid="like"]'))!;
    await likeIcon.click();
    await new Promise(r => setTimeout(r, 3000));
}


export {checkAd, handleAd}
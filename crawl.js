const puppeteer = require('puppeteer');

(async () => {
  const options = {
    headless: false,
    chromeExecutable: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://reserve.tokyodisneyresort.jp/');
  const xpath = '//*[@id="contents"]/h3';
  const elems = await page.$x(xpath);
  const jsHandle = await elems[0].getProperty('textContent');
  const text = await jsHandle.jsonValue();
  if (text == "Thank you for visiting Tokyo Disney Resort Online Reservations & Tickets."){
    await wait(1000);
    console.log("リロードします");
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  };

  await browser.close();
})();
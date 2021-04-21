const puppeteer = require('puppeteer');

async function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

(async () => {
  const options = {
    headless: false,
    chromeExecutable: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://reserve.tokyodisneyresort.jp/');
  for(i = 0 ; ;i++ ) {
    const xpath = '//*[@id="contents"]/h3';
    const elems = await page.$x(xpath);
    const jsHandle = await elems[0].getProperty('textContent');
    const text = await jsHandle.jsonValue();
    if (text != "Thank you for visiting Tokyo Disney Resort Online Reservations & Tickets."){
      console.log("抜ける！");
      break
    };
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    await sleep(1000);
    console.log(i + "回目のリロードします");
}

  // await browser.close();
})();

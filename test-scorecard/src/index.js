import puppeteer from 'puppeteer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    'https://bradfordcl.play-cricket.com/website/results/5413792'
  );

  const [acceptButton] = await page.$x('//button[text()="ACCEPT"]');
  await acceptButton.click();

  page.$eval('#pcScorecard-tab', (el) => el.click());

  setInterval(async () => {
    const content = await page.$eval('#pcScorecard', (el) => el.innerHTML);
    console.log(content);
    // const s3 = new S3Client({});
    // const command = new PutObjectCommand({
    //   Bucket: 'cleckheaton-cc-live-scores-test-1',
    //   Body: content,
    // });
    // s3.send(command);
  }, 300000);
})();

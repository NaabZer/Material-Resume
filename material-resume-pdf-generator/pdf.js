const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
const port = 3001

app.post('/pdf', (req, res) => {
  printPDF(req.body.components, req.body.entries).then(pdf => {
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
    res.send(pdf)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 
async function printPDF(components, entries) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(10000);
  await page.goto('http://localhost:3000/resumes/exportpdf', {waitUntil: 'networkidle0'});
  const ret = await page.evaluate((components, entries) => { 
    return window.setPdfData(components, entries); 
  }, components, entries);
  await page.emulateMediaType('screen')
  const content = await page.content();
  await page.evaluate(() => { window.scrollBy(0, window.innerHeight); })

  const pdf = await page.pdf({ format: 'A4', printBackground: true, omitBackground: true});

  await browser.close();
  return pdf
}

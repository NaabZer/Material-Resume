const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
const port = 3001

app.post('/pdf', (req, res) => {
  try {
    printPDF(req.body.components, req.body.entries, req.body.languages).then(pdf => {
      res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
      res.send(pdf)
    })
  } catch (error){
    next(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 
async function printPDF(components, entries, languages) {
  try {
    const browser = await puppeteer.launch(
    { 
      headless: true,
      args: [
        '--disable-dev-shm-usage',
      ],
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(10000);
    await page.goto('http://frontend:3000/resumes/exportpdf', {waitUntil: 'networkidle0'});
    const ret = await page.evaluate((components, entries, languages) => { 
      return window.setPdfData(components, entries, languages); 
    }, components, entries, languages);
    await page.emulateMediaType('screen')
    const content = await page.content();
    await page.evaluate(() => { window.scrollBy(0, window.innerHeight); })

    const pdf = await page.pdf({ format: 'A4', printBackground: true, omitBackground: true});

    await browser.close();
    return pdf;
  } catch (error){
    throw error;
  }
}

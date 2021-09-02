const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
const port = 3001

app.post('/pdf', (req, res) => {
  printPDF(req.body.csv).then(pdf => {
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
    res.send(pdf)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
 
async function printPDF(path) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(path, {waitUntil: 'networkidle2'});
  const pdf = await page.pdf({ format: 'A4', printBackground: true, omitBackground: true});


  await browser.close();
  return pdf
}

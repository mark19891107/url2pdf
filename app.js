const express = require('express')
const puppeteer = require('puppeteer');
const watermark = require('image-watermark');
const app = express()
const port = 3000

async function HTMLtoPDF(url, filepath){
    try {
        const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        });
        await page.goto(url);
        await page.pdf({path: '/out/'+ filepath, format: 'A4'});
        await browser.close();
        await watermarkPromise(filepath)
        return "Success"
    } catch (error) {
        return "Fail"
    }
}

function watermarkPromise(filepath){
    return new Promise((resolve, reject) => {
        watermark.embedWatermarkWithCb('/out/'+ filepath, {'text' : 'sample watermark', 'dstPath': '/out/'+ filepath},(err)=>{
            console.log('in call back')
            if(!err){
                resolve('/out/'+ filepath)
            }
            else{
                reject('embed watermark fail')
            }
        });    
    })
}

app.get('/', async (req, res) => {
  let parm = {
    url :req.query.url,
    path:req.query.path
  }
  let result = await HTMLtoPDF(parm.url,parm.path)
  parm.result = result
  res.send(parm)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
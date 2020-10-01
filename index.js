const { CronJob } = require("cron")
const Promise = require("bluebird")

const puppeteer = require("puppeteer")

const scrap = require("./services/scrap")

const urls = require("./data/urls.json")

const launch = async () => {
  console.log(`Launching Jobs for ${urls.length} propetires`)

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  })

  const launchScrapper = url => scrap.run(browser, url)
  const options = { concurrency: 2 }

  await Promise.map(urls["V0"], launchScrapper, options)

  await browser.close()
}

const run = async () => {
  await launch()
  new CronJob("*/15 * * * *", async () => {
    console.log(`Job running running 30 MINUTS : ${new Date()}`)
    await launch()
  }).start()
}

run()

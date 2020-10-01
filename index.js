const { CronJob } = require("cron")
const Promise = require("bluebird")

const puppeteer = require("puppeteer")

const scrap = require("./services/scrap")

const urls = require("./data/urls.json")

const launchScrapper = async () => {
  console.log(`Launching Jobs for ${urls.length} propetires`)

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  })

  await Promise.map(urls, url => scrap.run(browser, url), { concurrency: 2 })

  await browser.close()
}

const run = async () => {
  await launchScrapper()
  new CronJob("*/15 * * * *", async () => {
    console.log(`Job running running 30 MINUTS : ${new Date()}`)
    await launchScrapper()
  }).start()
}

run()

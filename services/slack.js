const axios = require("axios")

const API = "https://slack.com/api"
const url = `${API}/chat.postMessage`
const headers = {
  "User-Agent": "realt/listenner",
  "cache-control": "no-cache",
  "Content-Type": "application/json"
}

const SLACK_API_KEY = process.env.SLACK_API_KEY
const CHANNELS = process.env.CHANNELS
const CHANNEL = process.env.CHANNEL

const sendTo = async (channel, message) => {
  try {
    const params = {
      token: SLACK_API_KEY,
      channel,
      text: `REALT LISTENNER : ${message}`,
      username: "REALT BOT",
      icon_url:
        "https://realt-wp-media.s3.us-east-2.amazonaws.com/wp-content/uploads/2019/04/19233756/RealT_Logo.svg"
    }

    const response = await axios({
      method: "POST",
      url,
      headers,
      params,
      timeout: 3 * 1000
    })

    const { error, ok } = response.data

    if (!ok) throw error

    return
  } catch (error) {
    console.log(`[ERROR] slack : ${error.message}`)
    throw error
  }
}

const send = async message => {
  sendTo(CHANNEL, message)
}

// const send = async message => {
//   Promise.all(CHANNELS.map(channel => sendTo(channel, message)))
// }

module.exports = { send }

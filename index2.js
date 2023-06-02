import axios from 'axios'
import { config } from 'dotenv'
import express from 'express'

const Parse = require('parse/node')

Parse.initialize("eQfMPkjlWfRdnJEkn7HCDMhmTQdFqIfe7NQcy7RV", "3S4hocseNN143f9MzJ6PkRY3DX1OzYtrpckw9DUz")
Parse.serverURL("https://parseapi.back4app.com/")



config()
const app = express();
const JOKE_API = 'https://v2.jokeapi.dev/joke/Programming?type=single'
const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.post('/new-message', async (req, res) => {
  const { message } = req.body

  const messageText = message?.text?.toLowerCase()?.trim()
  const chatId = message?.chat?.id
  if (!messageText || !chatId) {
    return res.sendStatus(400)
  }

  let responseText = 'I have nothing to say.'

  if (messageText === 'joke') {
    try {
      const response = await axios(JOKE_API)
      responseText = response.data.joke
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  }
  try {
    await axios.post(TELEGRAM_URI, {
      chat_id: chatId,
      text: responseText
    })
    res.send('Done')
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

const Telegraf = require('Telegraf')
require('dotenv').config()

const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN)

bot.hears('hi', msg => msg.reply('Hi there'))
bot.launch()

const {Telegraf, Markup} = require('telegraf')
require('dotenv').config()

const imp = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Приветствую ${ctx.message.from.first_name ? ctx.message.from.first_name : 'странник'}!`))
bot.help((ctx) => ctx.reply(imp.commands))

bot.command('info', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Youtube', 'btn_1'), Markup.button.callback('CoH2', 'btn_2'), Markup.button.callback('JS info', 'btn_3')]
            ]
        ))
    } catch (e) {
        await ctx.reply('ERROR')
        await ctx.reply(e)
    }
})

function addActionBot(name, src, msg) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(msg, {
                disable_web_page_preview: true
            })
        } catch (e) {
            await ctx.reply('ERROR')
            await ctx.reply(e)
        }
    })
}

addActionBot('btn_1', false, imp.msg_btn_1)
addActionBot('btn_2', './img/CoH2.png', imp.msg_btn_2)
addActionBot('btn_3', false, imp.msg_btn_3)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
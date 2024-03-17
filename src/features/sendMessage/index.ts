import bot from "../../config"
const chatId = process.env.CHAT_ID

const sendMessage = (text:string) => {
  if(!chatId) return
  bot.api.sendMessage(chatId, text)

  return true
}

export default sendMessage
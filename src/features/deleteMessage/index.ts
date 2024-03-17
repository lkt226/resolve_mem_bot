import bot from "../../config"
const chatId = process.env.CHAT_ID

const deleteMessage = (messageId: number) => {
  if(!chatId) return
  bot.api.deleteMessage(chatId, messageId)

  return true
}

export default deleteMessage
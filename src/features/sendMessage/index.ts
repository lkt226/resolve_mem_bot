import bot from "../../config"

const sendMessage = async (chatId: string, text:string) => {
  const message = await bot.api.sendMessage(chatId, text)

  return message
}

export default sendMessage
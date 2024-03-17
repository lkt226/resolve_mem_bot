import bot from "../../config"

const deleteMessage = async (chatId: string|number, messageId: number) => {
  const message = await bot.api.deleteMessage(chatId, messageId)

  return message
}

export default deleteMessage
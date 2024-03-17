import { Message } from "grammy/types"
import bot from "../../config"

const getChatIdWithUser = (message: Message): string => {
  const chatId = `${message.chat.id}`
  return chatId
}

export default getChatIdWithUser
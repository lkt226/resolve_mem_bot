import prisma from "../../database"

const getChatIdWithUser = async (chatId: string|number) => {
  try {
    const chat = await prisma.chat.create({ data: { chat_id: `${chatId}`, message: '' }})
    return chat

  } catch (error) {
    console.log('Error in get chatId with user', error)
    return null
  }
}

export default getChatIdWithUser
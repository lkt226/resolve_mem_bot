import prisma from "../../database"

const saveMessageInDatabase = async (chatId: string|number, message: string) => {
  try {
    const newMessage = await prisma.chat.update({
      where: { chat_id: `${chatId}` },
      data: {message }
    })

    return newMessage

  } catch (error) {
    console.log('Error in save message in database', error)
    return null
  }
}

export default saveMessageInDatabase
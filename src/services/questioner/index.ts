import { PrismaClient } from "@prisma/client"
import bot from "../../config"

class Questioner {
  private messageBank: string[]
  private prisma: PrismaClient
  private chatId: number

  constructor (
    messageBank: string[], 
    prisma: PrismaClient, 
    chatId: number
  ) {
    this.messageBank = messageBank
    this.prisma = prisma
    this.chatId = chatId
  }

  selectRandomMessage () {
    return this.messageBank[Math.floor(Math.random() * this.messageBank.length)]
  }

  async setSelectedMessageInDatabase (message: string) {
    await this.prisma.chat.update({
      where: { chat_id: `${this.chatId}` },
      data: { message }
    })
  }

  async createVoiceMessageInDatabase (original_text: string) {
    await this.prisma.voiceMessage.create({
      data: {
        chat_id: `${this.chatId}`,
        original_text
      }
    })
  }

  async sendMessage (message: string) {
    return await bot.api.sendMessage(this.chatId, message)
  }

  async handleSendFirstMessage () {
    const message = this.selectRandomMessage()
    await this.setSelectedMessageInDatabase(message)
    await this.createVoiceMessageInDatabase(message)
    await this.sendMessage(`Sua mensagem de hoje é: ${message}`)
    return 'Primeira mensagem enviada com sucesso!'
  }

  async handleSendRecorrentMessage () {
    const user = await this.prisma.chat.findFirst({ where: { chat_id: `${this.chatId}` } })
    if (!user) { throw new Error("User not found")}
    await this.createVoiceMessageInDatabase(user.message)
    await this.sendMessage(`Pô eu não me lembro, qual era sua mensagem de hoje mesmo?`)
    return 'Mensagem enviada com sucesso!'
  }
} 

export default Questioner
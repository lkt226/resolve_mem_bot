// describe('Ciclo de vida do primeiro envio do dia', () => {
//   it.todo ('Escolher de forma aleatória uma mensagem do banco de frases')
//   it.todo ('Salvar a mensagem enviada no banco de dados')
//   it.todo ('Enviar a mensagem escolhida para o usuário')
//   it.todo ('Deletar a mensagem enviada após o usuário responder a primeira vez')
// })

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
      where: { chat_id: this.chatId },
      data: { message }
    })
  }

  async sendMessage (message: string) {
    return await bot.api.sendMessage(this.chatId, message)
  }

  async handleSendFirstMessage () {
    const message = this.selectRandomMessage()
    await this.setSelectedMessageInDatabase(message)
    await this.sendMessage(`Sua mensagem de hoje é: ${message}`)
    return 'Primeira mensagem enviada com sucesso!'
  }

  async handleSendRecorrentMessage () {
    await this.sendMessage(`Pô eu não me lembro, qual era sua mensagem de hoje mesmo?`)
    return 'Mensagem enviada com sucesso!'
  }
} 

export default Questioner
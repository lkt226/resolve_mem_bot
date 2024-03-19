import { PrismaClient } from "@prisma/client";
import { getChatId } from "../commands";
import { Context } from "grammy";

class Identifier {
  private prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async searchIdInDatabase (id:number) {
    return this.prisma.chat.findFirst({
      where: { chat_id: `${id}` }
    })
  }

  async createUserInDatabase (id:number) {
    return this.prisma.chat.create({ data: { chat_id: `${id}`, message: '' }})
  }

  async handleIncomingMessage (context: Context) {
    if (!context.message || !context.reply) {
      throw new Error('Contexto inválido')
    }

    const { chat } = context.message
    const command = context.message?.text?.toLocaleLowerCase() || ''

    if (command === getChatId)  {
      const userExist = await this.searchIdInDatabase(chat.id)
      
      if (userExist) {
        context.reply('Você já está cadastrado')
        return 'Usuário já está cadastrado'

      } else {
        const user = await this.createUserInDatabase(chat.id)

        if (user) {
          context.reply('Você foi cadastrado com sucesso')
          return 'Usuário cadastrado com sucesso'
        }
        throw new Error('Erro ao cadastrar usuário')
      }
    }
  }
}

export default Identifier
import { Context } from "grammy"
import Identifier from "./"
import prisma from "../../database"

const identifier = new Identifier(prisma)

const context: (id:number) => Partial<Context> = (id) => ({
  message: {
    date: 1631412740,
    from: {
      first_name: 'Teste',
      id: 123456789,
      is_bot: false,
      language_code: 'pt-br'
    },
    message_id: 123,
    chat: {
      first_name: 'Teste',
      type: 'private',
      id
    },
    text: '/hello'
  },
  reply: jest.fn()
})

describe ('Rotina para descobrir o id do chat do usuário', () => {
  it ('Novo usuário --> Usuário cadastrado com sucesso', async () => {
    const test = await identifier.handleIncomingMessage(context(123456789) as Context)
    expect(test).toBe('Usuário cadastrado com sucesso')

    await prisma.chat.deleteMany({ where: { chat_id: 123456789 }})
  })
  
  it ('Usuário já cadastrado --> Usuário já está cadastrado', async () => {
    await identifier.handleIncomingMessage(context(987654321) as Context)
    const test = await identifier.handleIncomingMessage(context(987654321) as Context)
    expect(test).toBe('Usuário já está cadastrado')

    await prisma.chat.deleteMany({ where: { chat_id: 987654321 }})
  })
})
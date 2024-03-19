import { Context } from "grammy"
import prisma from "../../database"
import Identifier from "../identifier"
import Questioner from "./"

const phraseBank = [
  "Olá, como você está?",
  "Como foi o seu dia?",
  "Você já fez algo hoje?"
]

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
const chatIdTest = parseInt(process.env.CHAT_ID_TEST || '0')

describe ('Rotinas para enviar a mensagem e fazer as perguntas', () => {
  it ('Call handleIncomingMessage --> Primeira mensagem enviada com sucesso!', async () => {
    await identifier.handleIncomingMessage(context(chatIdTest) as Context)
    const questioner = new Questioner(phraseBank, prisma, chatIdTest)
    const response = await questioner.handleSendFirstMessage()
    
    expect(response).toBe('Primeira mensagem enviada com sucesso!')

    await prisma.chat.deleteMany({ where: { chat_id: `${chatIdTest}` }})
  }, 30000)

  it ('Call handleSendRecorrentMessage --> Mensagem enviada com sucesso!', async () => {
    const questioner = new Questioner(phraseBank, prisma, chatIdTest)
    const response = await questioner.handleSendRecorrentMessage()
    
    expect(response).toBe('Mensagem enviada com sucesso!')
  })
})
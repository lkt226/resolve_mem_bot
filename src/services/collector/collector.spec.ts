import { Context } from "grammy"
import Collector from "./"
import Identifier from "../identifier"
import prisma from "../../database"
import { PrismaClient } from "@prisma/client"

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
    voice: {
      duration: 1,
      mime_type: 'audio/ogg',
      file_id: 'AwACAgEAAxkBAAIBamX5io2dLGJPdS9uhDHfZOjhu5SmAAIIBAACgO7IRzYblpPQlBEmNAQ',
      file_unique_id: 'AgADCAQAAoDuyEc',
      file_size: 25592
    }
  },
  reply: jest.fn()
})

const referenceUrl = 'https://api.telegram.org/file/bot7129906696:AAHTLWI9fSzmC3bqoRFlK85SB-BdaZkP3vw/voice/file_3.oga'

const collector = new Collector(prisma)
const identifier = new Identifier(prisma)

describe ('Rotina para baixar os audios do usuário', () => {
  it ('Call HandleAudioFromUser --> voiceMessage.chat_id == 123456789', async () => {
    await identifier.handleIncomingMessage(context(123456987) as Context)
    const voiceMessage = await collector.handleAudioFromUser(context(123456987) as Context)
    expect(voiceMessage.chat_id).toBe("123456987")
  })
})
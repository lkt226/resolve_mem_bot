import { Context } from "grammy"
import prisma from "../../database"
import Collector from "../collector"
import Receiver from "./"
import Identifier from "../identifier"

const identifier = new Identifier(prisma)
const collector = new Collector(prisma)
const receiver = new Receiver(prisma)

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

const transcriptionReferece = "deixe testei"

describe ('Rotina de transcrição do áudio para texto', () => {
  it ('Call handleAudioTranscription --> Áudio transcritos com sucesso!', async () => {
    await identifier.handleIncomingMessage(context(123456789) as Context)
    const voiceMessage = await collector.handleAudioFromUser(context(123456789) as Context)
    
    const response = await receiver.handleAudioTranscription(voiceMessage.id)
    expect(response).toBe(transcriptionReferece) 
  }, 30000)
})
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1'
import { IamAuthenticator } from 'ibm-watson/auth'

import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_WATSON_API_KEY || ''
  }),
  serviceUrl: process.env.IBM_WATSON_SERVICE_URL
})

const audioPath = "./src/services/collector/cache/"

class Receiver {
  private prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async transcribeAudio (audio: Buffer) {
    const response = await speechToText.recognize({
      audio,
      contentType: 'audio/ogg',
      model: 'pt-BR_Multimedia'
    })

    if (!response.result.results) {
      throw new Error('No results found.')
    }

    const transcription = response.result.results[0].alternatives[0].transcript
    return transcription
  }

  async getVoiceMessageInDatabase (voiceMessageId: number) {
    return await this.prisma.voiceMessage.findUnique({
      where: {
        id: voiceMessageId
      }
    })
  }
  
  async updateVoiceMessageTranscription (voiceMessageId: number, transcription: string) {
    return await this.prisma.voiceMessage.update({
      where: {
        id: voiceMessageId
      },
      data: {
        transcription
      }
    })
  }

  async handleAudioTranscription (voiceMessageId: number) {
    const voiceMessage = await this.getVoiceMessageInDatabase(voiceMessageId)

    if (!voiceMessage) {
      throw new Error('Voice message not found.')
    }

    const { chat_id: chatId } = voiceMessage
    const audio = fs.readFileSync(`${audioPath}${chatId}.ogg`)
    const transcription = await this.transcribeAudio(audio)
    const updated = await this.updateVoiceMessageTranscription(voiceMessageId, transcription)

    fs.unlinkSync(`${audioPath}${chatId}.ogg`)
    return updated.transcription
  }
}

export default Receiver

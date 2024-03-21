import OpenAI from "openai";

import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { FsReadStream } from "openai/_shims";

const openai = new OpenAI();

const audioPath = path.join(__dirname, '../collector/cache/')

class Receiver {
  private prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  async transcribeAudio (audio: FsReadStream) {
    const response = await openai.audio.transcriptions.create({
      file: audio,
      model: 'whisper-1'
    })

    if (!response.text) {
      throw new Error('No results found.')
    }

    const transcription = response.text
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

    const audio = fs.createReadStream(`${audioPath}${chatId}.ogg`)

    const transcription = await this.transcribeAudio(audio)

    await this.updateVoiceMessageTranscription(voiceMessageId, transcription)
    
    fs.rm(`${audioPath}${chatId}.ogg`, () => {})

    return voiceMessage.transcription
  }
}

export default Receiver

import OpenAI from "openai";

import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { FsReadStream } from "openai/_shims";
import axios from "axios";

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

    if (!voiceMessage || !voiceMessage.voice_url) {
      throw new Error('Voice message not found.')
    }

    const url = (await axios.get(voiceMessage.voice_url)).data
    const audio = fs.createReadStream(url)

    const transcription = await this.transcribeAudio(audio)

    await this.updateVoiceMessageTranscription(voiceMessageId, transcription)

    return voiceMessage.transcription
  }
}

export default Receiver

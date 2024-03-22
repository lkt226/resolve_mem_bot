import fs from "fs";
import path from "path";

import bot from "../../config";
import telegramRoutes from "../../utils/api";
import { Context } from "grammy";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const audioPath = path.join(__dirname, './cache/')

class Collector {
  private prisma: PrismaClient

  constructor (prisma:PrismaClient) {
    this.prisma = prisma
  }

  async getFileVoiceUrl (id: string) {
    const audio = await bot.api.getFile(id)

    if (!audio.file_path) {
      throw new Error("No file path found.")
    }

    return telegramRoutes.downloadVoiceFile(audio.file_path)
  }

  async downloadVoiceFile (url: string, chatId:number) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(audioPath + chatId + '.ogg', Buffer.from(response.data))
    return true
  }

  async searchIdInDatabase (id:number) {
    const user = this.prisma.chat.findFirst({
      where: { chat_id: `${id}` }
    })
    
    if (!user) throw new Error('Chat not found.')

    return user
  }

  async verifyIfVoiceMessageExists (chatId: number) {
    const voiceMessage = await this.prisma.voiceMessage.findFirst({
      where: {chat_id: `${chatId}`, voice_url: null},
      orderBy: {created_at: 'desc'}
    })

    if (!voiceMessage) {
      throw new Error('Voice not sended.')
    }

    return voiceMessage
  }

  async saveVoiceMessageInDatabase (voiceMessageId: number, voiceUrl: string) {
    return this.prisma.voiceMessage.update({
      where: { id: voiceMessageId },
      data: { voice_url: voiceUrl }
    })
  }

  async handleAudioFromUser (context: Context) {
    if (!context.message || !context.message.voice || !context.message.chat) {
      throw new Error('Contexto inválido')
    }
    
    const { voice, chat } = context.message
    const voiceMessage = await this.verifyIfVoiceMessageExists(chat.id)
    const downloadUrl = await this.getFileVoiceUrl(voice.file_id)
    // await this.downloadVoiceFile(downloadUrl, chat.id)
    const updatedVoiceMessage = await this.saveVoiceMessageInDatabase(voiceMessage.id, downloadUrl)

    return updatedVoiceMessage
  }
}

export default Collector
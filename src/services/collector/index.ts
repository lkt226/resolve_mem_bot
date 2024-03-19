import { Voice } from "grammy/types";
import https from "https";
import fs from "fs";

import bot from "../../config";
import telegramRoutes from "../../utils/api";
import { Context } from "grammy";
import { PrismaClient } from "@prisma/client";

const audioPath = "./src/services/collector/cache/"

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

  downloadVoiceFile (url: string, chatId:number) {
    const file = fs.createWriteStream(audioPath + chatId + '.ogg')

    https.get(url, function(response) {
      response.pipe(file)
      file.on('finish', () => file.close())
    })
    
    return file
  }

  async searchIdInDatabase (id:number) {
    const user = this.prisma.chat.findFirst({
      where: { chat_id: `${id}` }
    })
    
    if (!user) throw new Error('Chat not found.')

    return user
  }

  async saveVoiceMessageInDatabase (chatId: number, voiceUrl: string, message: string) {
    return await this.prisma.voiceMessage.create({
      data: {
        chat_id: `${chatId}`,
        original_text: message,
        voice_url: voiceUrl
      }
    })
  }

  async handleAudioFromUser (context: Context) {
    if (!context.message || !context.message.voice || !context.message.chat) {
      throw new Error('Contexto inválido')
    }
    
    const { voice, chat } = context.message
    const db = await this.searchIdInDatabase(chat.id)
    const downloadUrl = await this.getFileVoiceUrl(voice.file_id)
    this.downloadVoiceFile(downloadUrl, chat.id)
    const voiceMessage = await this.saveVoiceMessageInDatabase(chat.id, downloadUrl, db?.message||'')

    return voiceMessage
  }
}

export default Collector
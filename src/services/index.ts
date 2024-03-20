import prisma from "../database";
import bot from "../config";

import Identifier from "./identifier";
import Questioner from "./questioner";
import Collector from "./collector";
import Receiver from "./receiver";

const identifier = new Identifier(prisma)
const collector = new Collector(prisma)
const receiver = new Receiver(prisma)

const messageBank = [`Vivo assim,
entre tropeços e ganhos.
Vivo em um mundo só meu,
amo canções, versos e rimas.
Perco-me em meus devaneios.`]

export const routineForFirstMessageInDay = async () => {
  const users = await prisma.chat.findMany()
  users.forEach(async (user) => {
    const questioner = new Questioner(messageBank, prisma, parseInt(user.chat_id))
    await questioner.handleSendFirstMessage()
  })
}

export const routineForRecurrentMessage = async () => {
  const users = await prisma.chat.findMany()

  users.forEach(async (user) => {
    const questioner = new Questioner(messageBank, prisma, parseInt(user.chat_id))
    await questioner.handleSendRecorrentMessage()
  })
}

const execute = () => {
  bot.on("message", async (context) => {
    const voice = context.message?.voice
    const chatId = context.chat?.id

    if (voice && chatId) {
      const user = await prisma.chat.findFirst({ where: { chat_id: `${chatId}` } })
  
      if (!user) { throw new Error("User not found")}
      const voiceMessage = await collector.handleAudioFromUser(context)
      if (!voiceMessage) { throw new Error("Voice message not found")}
      await receiver.handleAudioTranscription(voiceMessage.id)
    }

    if (context.message?.text?.includes("/")){
      await identifier.handleIncomingMessage(context)
    }
  })
  
  setTimeout(routineForFirstMessageInDay, 1000)
  
  // setInterval(routineForRecurrentMessage, 1000 * 30) // 30 seconds
}

export default execute
import bot from "../config";
import prisma from "../database";
import getChatIdWithUser from "../features - (rascunho)/getChatIdWithUser";
import getFileVoice from "../features - (rascunho)/getFileVoice";
import Identifier from "./identifier";

const identifier = new Identifier(prisma)

const execute = (_: boolean) => {
  bot.on("message", async (ctx) => {
    if (ctx.message?.voice) {
      await getFileVoice(ctx.message.voice)

    } else if (ctx.message?.text?.includes("/")){
      const message =  ctx.message.text

      identifier.handleIncomingMessage(ctx)
    }
  });
}

export default execute;
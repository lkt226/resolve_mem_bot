import bot from "../config";
import prisma from "../database";
import Collector from "./collector";
import Identifier from "./identifier";

const identifier = new Identifier(prisma)
const collector = new Collector(prisma)

const execute = (_: boolean) => {
  bot.on("message", async (ctx) => {
    if (ctx.message?.voice) {
      await collector.handleAudioFromUser(ctx)

    } else if (ctx.message?.text?.includes("/")){
      await identifier.handleIncomingMessage(ctx)
    }
  });
}

export default execute;
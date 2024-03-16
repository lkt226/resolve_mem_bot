import bot from "../config";

import getFileVoice from "./getFileVoice";

const execute = (_: boolean) => {
  bot.on("message", async (ctx) => {
    if (ctx.message?.voice) {
      await getFileVoice(ctx.message.voice)

    } else if (ctx.message?.text?.includes("/")){
      const message =  ctx.message.text
      
      switch (message) {
        case "/hello":
          console.log("World")
          break;

        default:
          break;
      }
    }

  });
}

export default execute;
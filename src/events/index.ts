import bot from "../config";

import { Message, Voice } from "grammy/types";
import consumeApi from "../utils/api";

const getFileVoice = async (voice: Voice) => {
    const file = await bot.api.getFile(voice.file_id)
    if (!file.file_path) {
        console.error("No file path found.")
        return
    } 

    const link = consumeApi.getFile(file.file_path)
    return link
}

const execute =  (_:boolean) => {
    bot.on("message", async (ctx) => {
        if (ctx.message?.voice) {
            const link = await getFileVoice(ctx.message.voice)
            console.log(link)
        }
    });
}

export default execute;
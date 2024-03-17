import bot from "../../config";

import { Voice } from "grammy/types";
import consumeApi from "../../utils/api";

const getFileVoiceUrl = async (voice: Voice) => {
    const file = await bot.api.getFile(voice.file_id)
    if (!file.file_path) {
        console.error("No file path found.")
        return
    } 

    const url = consumeApi.getFile(file.file_path)
    return url
}

const getFileVoice = async (voice: Voice) => {
  const url = getFileVoiceUrl(voice)
  console.log(url)
}

export default getFileVoice;


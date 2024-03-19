const bot_token = process.env.BOT_TOKEN;
const baseURL = `https://api.telegram.org`

const telegramRoutes = {
    downloadVoiceFile: (file_path: string) => `${baseURL}/file/bot${bot_token}/${file_path}`
}

export default telegramRoutes;
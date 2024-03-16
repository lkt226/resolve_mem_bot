const bot_token = process.env.BOT_TOKEN;
const baseURL = `https://api.telegram.org`

const apiRoutes = {
    getFile: async (file_path: string) => {
        const url = `${baseURL}/file/bot${bot_token}/${file_path}`
        return url
    }
}

export default apiRoutes;
import dotenv from "dotenv";
dotenv.config();

import { Bot } from "grammy";

//Create a new bot
const bot = new Bot(process.env.BOT_TOKEN || '');

export default bot
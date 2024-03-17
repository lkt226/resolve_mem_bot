import dotenv from "dotenv";
dotenv.config();

import bot from "./config";
import createEvents from "./features";
import sendMessage from "./features/sendMessage";

let screaming = false;

bot.command("scream", () => {
   screaming = true;
 });

bot.command("whisper", () => {
   screaming = false;
 });

createEvents(screaming)

sendMessage(process.env.CHAT_ID_TEST||'', 'Bot is running!!')

//Start the Bot
bot.start();

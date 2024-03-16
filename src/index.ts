import bot from "./config";
import createEvents from "./features";

let screaming = false;

bot.command("scream", () => {
   screaming = true;
 });

bot.command("whisper", () => {
   screaming = false;
 });

createEvents(screaming)

//Start the Bot
bot.start();

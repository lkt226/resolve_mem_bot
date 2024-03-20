import dotenv from "dotenv";
dotenv.config();

import "./database";

import bot from "./config";

import Routines from "./services/index"


//Start the Bot
(async () => {
  console.log("Bot iniciado")
  bot.start()
  Routines()
})()
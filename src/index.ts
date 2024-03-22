import dotenv from "dotenv";
dotenv.config();

import "./database";

import bot from "./config";

import Routines from "./services/index"


//Start the Bot
(async () => {
  bot.start({ onStart: () => {
    Routines()
    console.log("Bot iniciado")
  }, drop_pending_updates: true })
})
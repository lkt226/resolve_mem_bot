import dotenv from "dotenv";
dotenv.config();
import express from 'express'

import "./database";

import bot from "./config";

import Routines from "./services/index"
import { webhookCallback } from "grammy";

if (process.env.NODE_ENV === "production") {
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    Routines()
    console.log(`Bot iniciado na porta ${PORT}`);
  });
} else {
  bot.start({ onStart: () => {
    Routines()
    console.log("Bot iniciado")
  }})
}
